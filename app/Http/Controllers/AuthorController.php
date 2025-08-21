<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthorController extends Controller
{
    public function index() {
        $authors = Author::all();

        return Inertia::render("Admin/Authors/Authors", [
            'authors' => $authors,
        ]);
    }

    public function create() {
        return Inertia::render("Admin/Authors/Create");
    }

    public function store(Request $request) {
        Author::create($request->validate([
            'name' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'birth_year' => 'nullable|integer',
        ]));
    }

    public function edit(Author $author) {
        return Inertia::render("Admin/Authors/Edit", [
            'author' => $author,
        ]);
    }

    public function update(Request $request, Author $author) {
        $author->update($request->validate([
            'name' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'birth_year' => 'integer',
        ]));
    }

    public function delete(Author $author) {
        $author->delete();

        return redirect()->route('admin.authors.index')->with('success', 'Author deleted successfully.');
    }
}
