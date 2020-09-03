<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use \App\Http\Traits\UsesUuid;

    protected $fillable = [
        'name', 'description', 'category', 'amount', 'price'
    ];
}
