<?php

namespace App\Services;

use App\Models\Address;
use App\Models\Fan;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;

class FanService extends Service {

    /**
     * @param $data Collection
     */
    public function save($data){
        try {
            validate($data->toArray(), [
                'name' => 'required',
                'document' => 'required|cpf'
            ], [
                'name' => 'O nome do fan é obrigatório.',
                'document.required' => 'O documento do torcedor é obrigatório.',
                'document.cpf' => 'O documento do torcedor não é válido.',
            ]);

            $fan = new Fan();
            if($data->get('id')){
                $fan = Fan::find($data->get('id'));
//                //Não posso permitir mudar o Documento?
//                $data = $data->except(['document']);
            }else{
                validate($data->toArray(), [
                    'document' => 'unique:fans',
                    'email' => 'unique:fans'
                ], [
                    'document.unique' => 'O documento do torcedor ja existe em nosso banco de dados.',
                    'email.unique' => 'Já existe este e-mail em nosso banco de dados.',
                ]);
            }

            $fan->fill($data->toArray());
            $fan->save();

            if ($data->get('address') && $fan) {
                validate($data->toArray(), [
                    'address.zipcode' => 'required',
                    'address.address' => 'required',
                    'address.neighborhood' => 'required',
                    'address.city' => 'required',
                    'address.state' => 'required',
                ], [
                    'address.zipcode' => 'O CEP é obrigatório.',
                    'address.address' => 'O Logradouro é obrigatório.',
                    'address.neighborhood' => 'O Bairro é obrigatório.',
                    'address.city' => 'A cidade é obrigatório.',
                    'address.state' => 'O estado é obrigatório.',
                ]);

                $address =$data->get('address');
                if(!empty($address['id'])){
                   $addressExists = Address::find($address['id']);
                   if($addressExists) {
                       $addressExists->active = 0;
                       $addressExists->save();
                       $address = $data->get('address');
                       unset($address['id']);
                   }
                }

                $newAddress = new Address();
                $newAddress->fan_id = $fan->id;
                $newAddress->fill($address);
                $newAddress->save();

                $fan->address_id = $newAddress->id;
                $fan->save();
            }

            return $fan->load(['address']);
        }catch (\Exception $e){
            throw $e;
        }

    }

    /**
     * @param $file UploadedFile
     * @return array
     * @throws \Exception
     */
    public function saveByFile($file)
    {
        $content = $file->get();
        $xml = simplexml_load_string($content, "SimpleXMLElement");
        $json = json_encode($xml);
        $array = json_decode($json,TRUE);
        $errors = [];
        $success = 0;
        $linha = 0;
        if(count($array) <= 0)
            throw new \Exception("O arquivo não possui linhas.");

        $array = isset($array['torcedor']) ? $array['torcedor'] : $array;
        foreach ($array as $item) {
            if(empty($item["@attributes"])){
                $errors[] = "Ops!! Falha ao ler a linha: ". $linha;
                continue;
            }
            $torcedor = $item["@attributes"];

            if(empty($torcedor['nome']) || empty($torcedor['documento']) || empty($torcedor['endereco']) ||
                empty($torcedor['bairro']) || empty($torcedor['cidade']) || empty($torcedor['uf']) || empty($torcedor['cep'])){
                $errors[] = "Ops!! Falha na linha: ".$linha.". Registro incompleto! Lembre-se! Cada TAG do torcedor deve conter no mínimo os seguintes campos: 
                Nome, Documento, Endereço, Bairro, Cidade, UF e CEP.";
                continue;
            }
            $newTorcedor = [
                "name" => $torcedor['nome'],
                "document" => only_numbers($torcedor['documento']),
                "phone" => isset($torcedor['telefone']) ? only_numbers($torcedor['telefone']) : null,
                "email" => isset($torcedor['email']) ? $torcedor['email'] : null,
                "address" => [
                    "zipcode" => only_numbers($torcedor['cep']),
                    "address" => $torcedor['endereco'],
                    "neighborhood" => $torcedor['bairro'],
                    "city" => $torcedor['cidade'],
                    "state" => $torcedor['uf'],
                ]
            ];
            try {
                $this->save(collect($newTorcedor));
                $success++;
            }catch (\Exception $e){
                $errors[] =
                    "O torcedor: ". $torcedor['nome'] . ", com o documento: ".only_numbers($torcedor['documento']).", apresentou os seguinte erro: ". $e->getMessage();
                continue;
            }
            $linha++;
        }

        return ['errors' => $errors,'success'=>$success, 'total' => count($array)];
    }

}