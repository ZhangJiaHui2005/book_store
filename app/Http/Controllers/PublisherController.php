<?php

namespace App\Http\Controllers;

use App\Models\Publisher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublisherController extends Controller
{
    public function index() {
        $publishers = Publisher::all();

        return Inertia::render('Admin/Publishers/Publishers', [
            'publishers' => $publishers
        ]);
    }

    public function create() {
        return Inertia::render('Admin/Publishers/Create');
    }

    public function store(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'nullable|string|max:255',
            'website' => 'nullable|url|max:255',
        ]);

        Publisher::create($request->only('name', 'address', 'website'));

        return redirect()->route('admin.publishers.index')->with('success', 'Publisher created successfully.');
    }

    public function edit(Publisher $publisher) {
        return Inertia::render('Admin/Publishers/Edit', [
            'publisher' => $publisher
        ]);
    }

    public function update(Request $request, Publisher $publisher) {
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'nullable|string|max:255',
            'website' => 'nullable|url|max:255',
        ]);

        $publisher->update($request->only('name', 'address', 'website'));

        return redirect()->route('admin.publishers.index')->with('success', 'Publisher updated successfully.');
    }

    public function delete(Publisher $publisher) {
        $publisher->delete();

        return redirect()->route('admin.publishers.index')->with('success', 'Publisher deleted successfully.');
    }
}
