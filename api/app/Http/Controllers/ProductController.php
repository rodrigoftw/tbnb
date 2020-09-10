<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::get()->toJson(JSON_PRETTY_PRINT);
        return response($products, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $product = new Product;
            $product->name = $request->name;
            $product->description = $request->description;
            $product->category = $request->category;
            $product->amount = $request->amount;
            $product->price = $request->price;
            $product->save();

            return response()->json([
                "message" => "Product created successfully.",
            ], 201);
        } catch (\Exception $error) {
            return response()->json(['error' => $error->getMessage()], 400);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show($productId)
    {
        if (Product::where('id', $productId)->exists()) {
            $product = Product::where('id', $productId)->get()->toJson(JSON_PRETTY_PRINT);
            return response($product, 200);
        } else {
            return response()->json([
                "message" => "Product not found.",
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $productId)
    {
        if (Product::where('id', $productId)->exists()) {
            $product = Product::find($productId);
            $product->name = is_null($request->name) ? $product->name : $request->name;
            $product->description = is_null($request->description) ? $product->description : $request->description;
            $product->category = is_null($request->category) ? $product->category : $request->category;
            $product->amount = is_null($request->amount) ? $product->amount : $request->amount;
            $product->price = is_null($request->price) ? $product->price : $request->price;
            $product->save();

            return response()->json([
                "message" => "Product updated successfully.",
            ], 200);
        } else {
            return response()->json([
                "message" => "Product not found.",
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy($productId)
    {
        if (Product::where('id', $productId)->exists()) {
            $product = Product::find($productId);
            $product->delete();

            return response()->json([
                "message" => "Product removed successfully.",
            ], 204);
        } else {
            return response()->json([
                "message" => "Product not found.",
            ], 404);
        }
    }
}
