package com.example.inventory_backend.controller;

import com.example.inventory_backend.entity.StockTransaction;
import com.example.inventory_backend.service.StockTransactionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:5173")
public class StockTransactionController {

    private final StockTransactionService transactionService;

    public StockTransactionController(StockTransactionService transactionService) {
        this.transactionService = transactionService;
    }

    // CREATE
    @PostMapping
    public StockTransaction createTransaction(@RequestBody StockTransaction transaction) {
        return transactionService.createTransaction(transaction);
    }

    // READ ALL
    @GetMapping
    public List<StockTransaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    // READ ONE
    @GetMapping("/{id}")
    public StockTransaction getTransactionById(@PathVariable Long id) {
        return transactionService.getTransactionById(id)
                .orElseThrow(() -> new RuntimeException("StockTransaction not found"));
    }

    // UPDATE
    @PutMapping("/{id}")
    public StockTransaction updateTransaction(
            @PathVariable Long id,
            @RequestBody StockTransaction transaction
    ) {
        return transactionService.updateTransaction(id, transaction);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteTransaction(@PathVariable Long id) {
        transactionService.deleteTransaction(id);
    }
}