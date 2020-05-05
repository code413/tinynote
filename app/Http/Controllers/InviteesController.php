<?php

namespace App\Http\Controllers;

use App\Models\Upload;
use Illuminate\Http\Request;

class InviteesController extends Controller
{
    public function store(Upload $upload)
    {
        dd($upload);
    }
}
