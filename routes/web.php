<?php

use App\Http\Controllers\AuthorController;
use App\Http\Controllers\CategoryController;
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

    Route::prefix('categories')->group(function () {
        Route::get('/', [CategoryController::class, 'index'])->name('admin.categories.index');
        Route::get('/create', [CategoryController::class, 'create']);
        Route::post('/store', [CategoryController::class, 'store']);
        Route::get('/{category}/edit', [CategoryController::class, 'edit']);
        Route::post('/{category}/update', [CategoryController::class, 'update']);
        Route::delete('/{category}/delete', [CategoryController::class, 'delete']);
    });

    Route::prefix('publishers')->group(function () {
        Route::get('/', [\App\Http\Controllers\PublisherController::class, 'index'])->name('admin.publishers.index');
        Route::get('/create', [\App\Http\Controllers\PublisherController::class, 'create']);
        Route::post('/store', [\App\Http\Controllers\PublisherController::class, 'store']);
        Route::get('/{publisher}/edit', [\App\Http\Controllers\PublisherController::class, 'edit']);
        Route::post('/{publisher}/update', [\App\Http\Controllers\PublisherController::class, 'update']);
        Route::delete('/{publisher}/delete', [\App\Http\Controllers\PublisherController::class, 'delete']);
    });

    Route::prefix('books')->group(function () {
        Route::get('/', [\App\Http\Controllers\BookController::class, 'index'])->name('admin.books.index');
        Route::get('/create', [\App\Http\Controllers\BookController::class, 'create']);
        Route::post('/store', [\App\Http\Controllers\BookController::class, 'store']);
        Route::get('/{book}/edit', [\App\Http\Controllers\BookController::class, 'edit']);
        Route::post('/{book}/update', [\App\Http\Controllers\BookController::class, 'update']);
        Route::delete('/{book}/delete', [\App\Http\Controllers\BookController::class, 'delete']);
    });
});
