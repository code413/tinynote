<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInviteesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invitees', function (Blueprint $table) {
            $table->id();
            $table->text('email');
            $table->unsignedBigInteger('upload_id');
            $table->unsignedBigInteger('user_id')->nullable()->default(null);

            $table->timestamps();

            $table->foreign('upload_id')->references('id')->on('uploads')->onDelete('CASCADE');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('invitees', function (Blueprint $table) {
            $table->dropForeign(['upload_id']);

            $table->dropForeign(['user_id']);
        });

        Schema::dropIfExists('invitees');
    }
}
