<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LastShortCode extends Model
{

    protected $fillable = [
        'last_short_code_id'
    ];
    protected $hidden = ['updated_at'];


}
