<?php

namespace App\Http\Controllers;

use App\Models\Fan;
use App\Services\FanService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FanController extends Controller
{
    protected $fanService;
    public function __construct()
    {
        $this->fanService = new FanService();

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = collect(request()->all());

        if($data->get('pageSize')){
            $this->perPage = $data['pageSize'];
        }

        if(!empty($data['pageIndex'])){
            $this->page = $data['pageIndex']+1;
        }

        if(!empty($data['with'])){
            $with = explode(',', $data['with']);
            $fans = Fan::with($with);
        }else{
            $fans = Fan::query();
        }

        if(!empty($data['id'])){
            $fans->where('id', '=', $data['id']);
        }

        if(!empty($data['name'])){
            $fans->where('name','LIKE',"%{$data['name']}%");
        }

        if(!empty($data['active'])){
            $fans->where('active','=', $data['active']);
        }

        $fans->orderBy('id', 'desc');
        $fans = $fans->paginate($this->perPage, ['*'], 'page', $this->page);
        return response([
            'status' => 'success',
            'data' => $fans
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();
            $data = collect(request()->all());
            $fan = $this->fanService->save($data);
            DB::commit();
            return response()->json([
                'status' => 'success',
                'data' => $fan
            ]);
        }catch (\Exception $e){
            DB::rollBack();
            return response([
                'status' => 'error',
                'message' => $e->getMessage()], 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json([
            'status' => 'success',
            'data' => Fan::find($id)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Fan  $fan
     * @return \Illuminate\Http\Response
     */
    public function edit(Fan $fan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Fan  $fan
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Fan $fan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  $fan_id
     * @return \Illuminate\Http\Response
     */
    public function destroy($fan_id)
    {
        try {
            DB::beginTransaction();
            $fan = Fan::find($fan_id);
            if(!$fan)
                throw new \Exception("Não encontramos nenhum torcedor com essas especificações.");

            $fan->active = 0;
            $fan->save();
            DB::commit();
            return response()->json([
                'status' => 'success',
                'data' => $fan
            ]);
        }catch (\Exception $e){
            DB::rollBack();
            return response([
                'status' => 'error',
                'message' => $e->getMessage()], 400);
        }
    }

    public function saveByFile()
    {
        try{
            $data = collect(request()->all());
            if(!$data->get('file'))
                throw new \Exception("Favor enviar o arquivo!");

            $result = $this->fanService->saveByFile($data->get('file'));
            return response(['status' => count($result['errors']) ? 'error' : 'success', 'data' => $result]);
        }catch (\Exception $e){
            return response([
                'status' => 'error',
                'message' => $e->getMessage()], 400);
        }
    }

    public function export(){
        try {
            $fans = Fan::query()
                ->join('address as a', 'fans.address_id', '=', 'a.id')
                ->where('fans.active', 1)
                ->get(['name as Nome', 'email as Email', 'document as Documento', 'phone as Telefone',
                    'a.address as Logradouro', 'a.neighborhood as Bairro', 'a.zipcode as CEP', 'a.city as Cidade', 'state as UF']);

            if ($fans) {
                $fileName = uniqid() . '.' . 'csv';
                $csv = fopen(storage_path('app/public/') . '/' . $fileName, 'w');
                fputcsv($csv, ["Nome","Email","Documento","Telefone","Logradouro","Bairro","CEP", "Cidade", "UF"], ';');
                foreach ($fans->toArray() as $line) {
                    fputcsv($csv, $line, ';');
                }
                fclose($csv);

                $headers = array(
                    'Content-Type: text/csv',
                );

                return response()->download(storage_path('app/public/') . '/' . $fileName, $fileName, $headers);
            } else {
                throw new \Exception("Nenhum torcedor para fazer download");
            }
        }catch (\Exception $e){
            return response($e->getMessage(), 400);
        }
    }
}
