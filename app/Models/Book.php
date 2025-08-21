<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'isbn', 'published_year', 'price', 'stock', 'publisher_id'
    ];

    public function authors()
    {
        return $this->belongsToMany(Author::class, 'book_authors');
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'book_categories');
    }

    public function publisher()
    {
        return $this->belongsTo(Publisher::class);
    }
}
