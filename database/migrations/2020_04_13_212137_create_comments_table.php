<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->text('body')->nullable();
            $table->string('coordinate_x')->nullable();
            $table->string('coordinate_y')->nullable();
            $table->unsignedBigInteger('upload_id');
            $table->unsignedBigInteger('user_id');
            $table->boolean('active')->default(false);
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
        Schema::table('comments', function (Blueprint $table) {
            $table->dropForeign(['upload_id']);

            $table->dropForeign(['user_id']);
        });

        Schema::dropIfExists('comments');
    }
}
