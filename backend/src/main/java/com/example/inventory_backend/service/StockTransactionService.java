package com.example.inventory_backend.service;

import com.example.inventory_backend.entity.Product;
import com.example.inventory_backend.entity.StockTransaction;
import com.example.inventory_backend.repository.ProductRepository;
import com.example.inventory_backend.repository.StockTransactionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class StockTransactionService {

    private final StockTransactionRepository transactionRepository;
    private final ProductRepository productRepository;

    public StockTransactionService(StockTransactionRepository transactionRepository, ProductRepository productRepository) {
        this.transactionRepository = transactionRepository;
        this.productRepository = productRepository;
    }

    // CREATE
    @Transactional
    public StockTransaction createTransaction(StockTransaction transaction) {
        if (transaction.getProduct() == null || transaction.getProduct().getId() == null) {
            throw new RuntimeException("Product is required for a transaction");
        }

        Product product = productRepository.findById(transaction.getProduct().getId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if ("IN".equalsIgnoreCase(transaction.getType())) {
            product.setQuantity(product.getQuantity() + transaction.getQuantity());
        } else if ("OUT".equalsIgnoreCase(transaction.getType())) {
            if (product.getQuantity() < transaction.getQuantity()) {
                throw new RuntimeException("Insufficient stock for this transaction");
            }
            product.setQuantity(product.getQuantity() - transaction.getQuantity());
        } else {
            throw new RuntimeException("Invalid transaction type. Must be IN or OUT.");
        }

        productRepository.save(product);
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