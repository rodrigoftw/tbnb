<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Product;
use Faker\Generator as Faker;

$factory->define(Product::class, function (Faker $faker) {
    return [
        "name" => $faker->productName(),
        "description" => $faker->paragraph,
        "category" => $faker->category(),
        "amount" => $faker->numberBetween(0, 5000),
        "price" => $faker->numberBetween(100, 2000),
    ];
});
