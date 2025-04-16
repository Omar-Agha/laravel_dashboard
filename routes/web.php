<?php

use App\Http\Controllers\ExampleInertiaController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::post('/change-app-language', function () {
     session(['locale' => request('lang')]);
    return back();
})->name('change-lang');


Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])
    ->prefix('dashboard')
    ->group(function () {
        Route::get('/', function () {
            return Inertia::render('Admin/Dashboard');
        })->name('dashboard');


        Route::resource('examples', ExampleInertiaController::class)->except(['create', 'edit']);
    });
