<?php

namespace App\Services;

use App\Models\Fan;
use Illuminate\Support\Collection;

class FanService extends Service {

    /**
     * @param $data Collection
     */
    public function save($data){
        validate($data->toArray(), [
            'name' => 'required',
            'document' => 'required|unique:fans|cpf'
        ], [
            'name' => 'O nome do fan é obrigatório.',
            'document.required' => 'O documento do fan é obrigatório.',
            'document.unique' => 'O documento do fan ja existe em nosso banco de dados.',
            'document.cpf' => 'O documento do fan não é válido.',
        ]);

        $fan = new Fan();
        $fan->fill($data->toArray());
        $fan->save();
    }

}