<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index() {
        $categories = Category::all();

        return Inertia::render("Admin/Categories/Categories", [
            "categories" => $categories,
        ]);
    }

    public function create() {
        return Inertia::render("Admin/Categories/Create");
    }

    public function store(Request $request) {
        Category::create($request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]));

        return redirect()->route('admin.categories.index')->with('success', 'Category created successfully.');
    }

    public function edit(Category $category) {
        return Inertia::render("Admin/Categories/Edit", [
            'category' => $category,
        ]);
    }

    public function update(Request $request, Category $category) {
        $category->update($request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]));

        return redirect()->route('admin.categories.index')->with('success', 'Category updated successfully.');
    }

    public function delete(Category $category) {
        $category->delete();

        return redirect()->route('admin.categories.index')->with('success', 'Category deleted successfully.');
    }
}
