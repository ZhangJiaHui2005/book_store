<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use App\Models\Publisher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::with(['authors', 'categories', 'publisher'])->get();
        return Inertia::render('Admin/Books/Books', [
            'books' => $books,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Books/Create', [
            'publishers' => Publisher::all(),
            'authors' => Author::all(),
            'categories' => Category::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'          => 'required|string|max:255',
            'isbn'           => 'nullable|string|max:20|unique:books,isbn',
            'published_year' => 'nullable|integer',
            'price'          => 'nullable|numeric|min:0',
            'stock'          => 'nullable|integer|min:0',
            'publisher_id'   => 'nullable|exists:publishers,id',
            'authors'        => 'array',
            'authors.*'      => 'exists:authors,id',
            'categories'     => 'array',
            'categories.*'   => 'exists:categories,id',
            'image'          => 'nullable|image|max:2048', // <= 2MB
        ]);

        // Create book
        $book = new Book($validated);

        // Handle image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('books', 'public');
            $book->image = $path;
        }

        $book->save();

        // Attach relationships
        if (isset($validated['authors'])) {
            $book->authors()->sync($validated['authors']);
        }

        if (isset($validated['categories'])) {
            $book->categories()->sync($validated['categories']);
        }

        return redirect()->route('admin.books.index')->with('success', 'Book created successfully.');
    }

    public function edit(Book $book)
    {
        return Inertia::render('Admin/Books/Edit', [
            'book' => $book->load(['authors', 'categories', 'publisher']),
            'publishers' => Publisher::all(),
            'authors' => Author::all(),
            'categories' => Category::all(),
        ]);
    }

    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            'title'          => 'required|string|max:255',
            'isbn'           => 'nullable|string|max:20|unique:books,isbn,' . $book->id,
            'published_year' => 'nullable|integer',
            'price'          => 'nullable|numeric|min:0',
            'stock'          => 'nullable|integer|min:0',
            'publisher_id'   => 'nullable|exists:publishers,id',
            'authors'        => 'array',
            'authors.*'      => 'exists:authors,id',
            'categories'     => 'array',
            'categories.*'   => 'exists:categories,id',
            'image'          => 'nullable|image|max:2048', // <= 2MB
        ]);

        // Update book details
        $book->fill($validated);

        // Handle image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('books', 'public');
            $book->image = $path;
        }

        $book->save();

        // Sync relationships
        if (isset($validated['authors'])) {
            $book->authors()->sync($validated['authors']);
        }

        if (isset($validated['categories'])) {
            $book->categories()->sync($validated['categories']);
        }

        return redirect()->route('admin.books.index')->with('success', 'Book updated successfully.');
    }

    public function delete(Book $book)
    {
        $book->delete();

        return redirect()->route('admin.books.index')->with('success', 'Book deleted successfully.');
    }
}
