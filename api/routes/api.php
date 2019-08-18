<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group(['prefix' => 'fan'], function () {
    Route::get('/export', ['as' => 'fan.export', 'uses' => 'FanController@export']);
    Route::post('/save-by-file', ['as' => 'fan.save-by-file', 'uses' => 'FanController@saveByFile']);
});

Route::group(['prefix' => 'mail'], function () {
    Route::post('/send-mail-fan', ['as' => 'send', 'uses' => 'MailController@sendMailToFan']);
    Route::post('/send', ['as' => 'send', 'uses' => 'MailController@sendMail']);
});



Route::resource('fan', 'FanController');
Route::resource('Address', 'FanController');
