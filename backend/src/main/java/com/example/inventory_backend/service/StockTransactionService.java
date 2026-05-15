package com.example.inventory_backend.service;

import com.example.inventory_backend.entity.StockTransaction;
import com.example.inventory_backend.repository.StockTransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StockTransactionService {

    private final StockTransactionRepository transactionRepository;

    public StockTransactionService(StockTransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    // CREATE
    public StockTransaction createTransaction(StockTransaction transaction) {
        return transactionRepository.save(transaction);
    }

    // READ ALL
    public List<StockTransaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    // READ ONE
    public Optional<StockTransaction> getTransactionById(Long id) {
        return transactionRepository.findById(id);
    }

    // UPDATE
    public StockTransaction updateTransaction(Long id, StockTransaction updatedTransaction) {
        return transactionRepository.findById(id)
                .map(transaction -> {
                    transaction.setType(updatedTransaction.getType());
                    transaction.setQuantity(updatedTransaction.getQuantity());
                    transaction.setTransactionDate(updatedTransaction.getTransactionDate());
                    transaction.setProduct(updatedTransaction.getProduct());
                    return transactionRepository.save(transaction);
                })
                .orElseThrow(() -> new RuntimeException("StockTransaction not found"));
    }

    // DELETE
    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }
}