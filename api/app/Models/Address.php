<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $table = 'address';

    protected $fillable = [
        'id', 'address', 'neighborhood', 'city', 'state', 'zipcode', 'active', 'fan_id'
    ];

    public function fan()
    {
        return $this->hasOne(Fan::class, 'id','fan_id');
    }
}
