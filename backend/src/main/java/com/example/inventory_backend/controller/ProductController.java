package com.example.inventory_backend.controller;

import com.example.inventory_backend.entity.Product;
import com.example.inventory_backend.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductService ProductService;

    public ProductController(ProductService ProductService) {
        this.ProductService = ProductService;
    }

    // CREATE
    @PostMapping
    public Product createProduct(@RequestBody Product Product) {
        return ProductService.createProduct(Product);
    }

    // READ ALL
    @GetMapping
    public List<Product> getAllProducts() {
        return ProductService.getAllProducts();
    }

    // READ ONE
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return ProductService.getProductById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    // UPDATE
    @PutMapping("/{id}")
    public Product updateProduct(
            @PathVariable Long id,
            @RequestBody Product Product
    ) {
        return ProductService.updateProduct(id, Product);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        ProductService.deleteProduct(id);
    }
}