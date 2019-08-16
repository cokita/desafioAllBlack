<?php

if (!function_exists('validate')) {

    /**
     * Create a new Validator instance.
     *
     * @param  array $data
     * @param  array $rules
     * @param  array $messages
     * @param  array $customAttributes
     */
    function validate(array $data = [], array $rules = [], array $messages = [], array $customAttributes = [])
    {
        $v = validator($data, $rules, $messages, $customAttributes);

        if ($v->fails())
            abort(412, $v->messages()->first());
    }

}

if (!function_exists('only_numbers')) {
    function only_numbers($valor)
    {
        if($valor){
            return preg_replace("/[^0-9]/", "", trim($valor));
        }else{
            return null;
        }
    }
}