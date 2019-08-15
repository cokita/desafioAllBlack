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

        if($data->get('per_page')){
            $this->perPage = $data['per_page'];
        }

        if(!empty($data['page'])){
            $this->page = $data['page'];
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
                'message' => $e->getMessage()]);
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
     * @param  \App\Models\Fan  $fan
     * @return \Illuminate\Http\Response
     */
    public function destroy(Fan $fan)
    {
        //
    }
}
