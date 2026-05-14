package com.example.inventory_backend.controller;

import com.example.inventory_backend.entity.Supplier;
import com.example.inventory_backend.service.SupplierService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/suppliers")
@CrossOrigin(origins = "http://localhost:5173")
public class SupplierController {

    private final SupplierService SupplierService;

    public SupplierController(SupplierService SupplierService) {
        this.SupplierService = SupplierService;
    }

    // CREATE
    @PostMapping
    public Supplier createSupplier(@RequestBody Supplier Supplier) {
        return SupplierService.createSupplier(Supplier);
    }

    // READ ALL
    @GetMapping
    public List<Supplier> getAllSuppliers() {
        return SupplierService.getAllSuppliers();
    }

    // READ ONE
    @GetMapping("/{id}")
    public Supplier getSupplierById(@PathVariable Long id) {
        return SupplierService.getSupplierById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
    }

    // UPDATE
    @PutMapping("/{id}")
    public Supplier updateSupplier(
            @PathVariable Long id,
            @RequestBody Supplier Supplier
    ) {
        return SupplierService.updateSupplier(id, Supplier);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteSupplier(@PathVariable Long id) {
        SupplierService.deleteSupplier(id);
    }
}