package com.example.inventory_backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "stock_transactions")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StockTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;

    private Integer quantity;

    private LocalDateTime transactionDate;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}