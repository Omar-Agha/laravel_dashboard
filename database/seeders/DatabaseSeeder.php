<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = [
            'name' => 'Admin User',
            'email' => 'admin@admin.com',
            'password' => Hash::make("123456789")
        ];
        if (!User::whereEmail($user['email'])->exists()) {

            User::factory()->create($user);
        }
    }
}
