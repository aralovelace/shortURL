<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PublicUrl extends Model
{
    protected $fillable = [
        'long_url', 'short_code', 'number_visit','private'
    ];
    protected $hidden = ['updated_at', 'deleted_at'];
}

