# Smart Inventory Management System

A full-stack inventory management application built using **Spring Boot**, **PostgreSQL**, and **React**.

This system allows admins to manage:
- Products
- Categories
- Suppliers
- Stock Transactions

It demonstrates:
- REST API development
- CRUD operations
- Database relationships using JPA
- Frontend/backend integration
- Real-world inventory logic

---

# Features

## Core Features
- Add / update / delete products
- Manage categories
- Manage suppliers
- Track stock transactions
- Search and filter products
- View inventory details

## Bonus Features
- Low stock warnings
- Dashboard overview
- Pagination & sorting
- Validation handling
- Swagger/OpenAPI documentation
- Global exception handling

---

# Tech Stack

## Backend
- Java 21 (or Java 17)
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Maven
- Lombok

## Frontend
- React
- Axios
- React Router
- Tailwind CSS / CSS

## Tools
- Postman
- pgAdmin

---

# System Architecture

```text
React Frontend
       ↓
REST APIs
       ↓
Spring Boot Backend
       ↓
PostgreSQL Database

```

* * * * *

Database Design
===============

Categories Table
----------------

| Column | Type |
| --- | --- |
| id | BIGINT |
| name | VARCHAR |
| description | TEXT |

* * * * *

Suppliers Table
---------------

| Column | Type |
| --- | --- |
| id | BIGINT |
| name | VARCHAR |
| email | VARCHAR |
| phone | VARCHAR |
| address | TEXT |

* * * * *

Products Table
--------------

| Column | Type |
| --- | --- |
| id | BIGINT |
| name | VARCHAR |
| description | TEXT |
| price | DECIMAL |
| quantity | INTEGER |
| category_id | FK |
| supplier_id | FK |

### Relationships

-   Many Products → One Category

-   Many Products → One Supplier

* * * * *

Stock Transactions Table
------------------------

| Column | Type |
| --- | --- |
| id | BIGINT |
| product_id | FK |
| type | VARCHAR |
| quantity | INTEGER |
| transaction_date | TIMESTAMP |

### Transaction Types

-   IN

-   OUT

* * * * *

Entity Relationships
====================

```
Category (1) ---- (Many) Products

Supplier (1) ---- (Many) Products

Product (1) ---- (Many) StockTransactions

```

* * * * *

Backend Structure
=================

```
src/main/java/com/example/inventory

├── controller
├── service
├── repository
├── entity
├── dto
├── config
└── exception

```

* * * * *

REST API Endpoints
==================

Category APIs
=============

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | /api/categories | Get all categories |
| GET | /api/categories/{id} | Get category by ID |
| POST | /api/categories | Create category |
| PUT | /api/categories/{id} | Update category |
| DELETE | /api/categories/{id} | Delete category |

* * * * *

Supplier APIs
=============

| Method | Endpoint |
| --- | --- |
| GET | /api/suppliers |
| POST | /api/suppliers |
| PUT | /api/suppliers/{id} |
| DELETE | /api/suppliers/{id} |

* * * * *

Product APIs
============

| Method | Endpoint |
| --- | --- |
| GET | /api/products |
| GET | /api/products/{id} |
| POST | /api/products |
| PUT | /api/products/{id} |
| DELETE | /api/products/{id} |

Extra APIs
----------

| Method | Endpoint |
| --- | --- |
| GET | /api/products/category/{id} |
| GET | /api/products/low-stock |

* * * * *

Stock Transaction APIs
======================

| Method | Endpoint |
| --- | --- |
| GET | /api/transactions |
| POST | /api/transactions |

* * * * *

JPA Relationships
=================

Product Entity
--------------

```
@ManyToOne
@JoinColumn(name = "category_id")
private Category category;

@ManyToOne
@JoinColumn(name = "supplier_id")
private Supplier supplier;

```

* * * * *

Category Entity
---------------

```
@OneToMany(mappedBy = "category")
private List<Product> products;

```

* * * * *

PostgreSQL Schema
=================

```
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    description TEXT
);

CREATE TABLE suppliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    address TEXT
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    price DECIMAL(10,2),
    quantity INT,
    category_id INT REFERENCES categories(id),
    supplier_id INT REFERENCES suppliers(id)
);

CREATE TABLE stock_transactions (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id),
    type VARCHAR(10),
    quantity INT,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

* * * * *

Frontend Pages
==============

| Page | Purpose |
| --- | --- |
| Dashboard | Overview |
| Products | Product CRUD |
| Categories | Category CRUD |
| Suppliers | Supplier CRUD |
| Transactions | Stock history |

* * * * *

Suggested UI Components
=======================

Product Table
-------------

-   Name

-   Price

-   Quantity

-   Category

-   Supplier

-   Actions

Forms
-----

-   Add Product

-   Edit Product

-   Add Supplier

-   Add Category

* * * * *

Validation Examples
===================

```
@NotBlank
private String name;

@Email
private String email;

@Positive
private BigDecimal price;

```

* * * * *

Global Exception Handling
=========================

```
@ControllerAdvice
public class GlobalExceptionHandler {

}

```

* * * * *

Running the Backend
===================

Clone the Repository
--------------------

```
git clone https://github.com/your-username/inventory-management-system.git

```

Navigate to Backend
-------------------

```
cd backend

```

Configure Database
------------------

Update `application.properties`

```
spring.datasource.url=jdbc:postgresql://localhost:5432/inventory_db
spring.datasource.username=postgres
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

```

Run the Application
-------------------

```
mvn spring-boot:run

```

Backend runs on:

```
http://localhost:8080

```

* * * * *

Running the Frontend
====================

Navigate to Frontend
--------------------

```
cd frontend

```

Install Dependencies
--------------------

```
npm install

```

Start React App
---------------

```
npm start

```

Frontend runs on:

```
http://localhost:3000

```

* * * * *

API Testing
===========

Use Postman to test APIs:

-   GET requests

-   POST requests

-   PUT requests

-   DELETE requests

* * * * *

Future Improvements
===================

-   Authentication & Authorization

-   JWT Security

-   Role-based Access

-   Export reports

-   Barcode scanning

-   Docker deployment

* * * * *

Project Goals
=============

This project was built to practice:

-   Spring Boot REST APIs

-   React frontend integration

-   PostgreSQL database design

-   JPA entity relationships

-   Full-stack CRUD operations

* * * * *

Author
======

Zubair Murshid

