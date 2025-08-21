<?php

use App\Http\Controllers\AuthorController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render("Home");
});


Route::prefix('admin')->group(function () {
    Route::get('/', function () {
        return Inertia::render("Admin/Dashboard");
    });

    Route::prefix('authors')->group(function () {
        Route::get('/', [AuthorController::class, 'index'])->name('admin.authors.index');
        Route::get('/create', [AuthorController::class, 'create']);
        Route::post('/store', [AuthorController::class, 'store']);
        Route::get('/{author}/edit', [AuthorController::class, 'edit']);
        Route::post('/{author}/update', [AuthorController::class, 'update']);
        Route::delete('/{author}/delete', [AuthorController::class, 'delete']);
    });
});