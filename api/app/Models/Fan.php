<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fan extends Model
{
    protected $table = 'fans';

    protected $fillable = [
        'id', 'name', 'document', 'email', 'phone', 'active', 'address_id'
    ];

    public function address()
    {
        return $this->hasOne(Address::class, 'id','address_id');
    }

    public function allAddress()
    {
        return $this->hasMany(Address::class, 'fan_id', 'id');
    }
}
