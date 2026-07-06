# ProjectBoard

A full-stack e-commerce platform for board game enthusiasts built with **ASP.NET Core Web API** and **React**. The project provides a modern shopping experience with secure authentication, online payment integration, inventory management, and a comprehensive administration dashboard.

<p align="center">

<img src="https://img.shields.io/badge/ASP.NET_Core-512BD4?style=for-the-badge&logo=.net&logoColor=white"/>

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>

<img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"/>

<img src="https://img.shields.io/badge/Zustand-443E38?style=for-the-badge"/>

<img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white"/>

<img src="https://img.shields.io/badge/ASP.NET_Web_API-512BD4?style=for-the-badge"/>

<img src="https://img.shields.io/badge/Entity_Framework_Core-512BD4?style=for-the-badge"/>

<img src="https://img.shields.io/badge/SQL_Server-CC2927?style=for-the-badge&logo=microsoftsqlserver&logoColor=white"/>

<img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>

<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white"/>

<img src="https://img.shields.io/badge/VNPay-005BAC?style=for-the-badge"/>

</p>

---

## Overview

ProjectBoard is a full-stack board game e-commerce application developed to simulate a real-world online shopping platform. Customers can browse products, manage shopping carts, complete purchases through VNPay, and track their orders. Administrators are provided with a dedicated dashboard to manage products, categories, users, inventory, and customer orders.

The project focuses on clean code organization, RESTful API design, and scalable application architecture while providing a responsive and user-friendly interface.

---

## Highlights

* JWT Authentication & Refresh Token
* Role-based Authorization
* Product Catalog & Search
* Shopping Cart with Reservation Stock
* VNPay Payment Integration
* Order Management
* Admin Dashboard
* Responsive User Interface

---

## Tech Stack

| Layer            | Technology            |
| ---------------- | --------------------- |
| Frontend         | React, TypeScript     |
| Routing          | React Router DOM      |
| State Management | Zustand               |
| Server State     | TanStack Query        |
| Styling          | Tailwind CSS          |
| Backend          | ASP.NET Core Web API  |
| ORM              | Entity Framework Core |
| Database         | SQL Server            |
| Authentication   | JWT + Refresh Token   |
| Payment          | VNPay                 |
| HTTP Client      | Axios                 |

---

## Features

### Customer

* User Registration & Login
* Browse Board Games
* Product Search & Filtering
* Shopping Cart
* Checkout
* VNPay Payment
* Order History
* Profile Management

### Administrator

* Dashboard
* Product Management
* Category Management
* User Management
* Order Management
* Inventory Management

---


## Database Design

<img width="3468" height="2989" alt="image" src="https://github.com/user-attachments/assets/e66a1db2-d655-40aa-a3cc-c9e579c322fd" />

---

## Payment Flow (VNPay)

    User->>Frontend: Initiate Payment
    Frontend->>Backend: Request Payment Session (Order Details)
    Backend->>Backend: Persist Order (Status: PENDING)
    Backend->>VNPay: Request Payment URL (vnp_Amount, vnp_TxnRef)
    VNPay-->>Backend: Provide Secure Payment URL
    Backend-->>Frontend: Redirect to Payment URL
    Frontend->>User: Redirect to VNPay Gateway
    
    Note over User, VNPay: User completes payment
    
    VNPay-->>User: Redirect to Return URL (with transaction params)
    User->>Frontend: Forward transaction result params
    Frontend->>Backend: POST verification data for validation
    
    Note over Backend: Security Check
    Backend->>Backend: Validate vnp_SecureHash
    Backend->>Backend: Update Order Status (PAID/FAILED)
    
    Backend-->>Frontend: Return transaction final status

---

## Screenshots

### Home

<img width="874" height="496" alt="image" src="https://github.com/user-attachments/assets/d1f40def-ea61-434a-9973-783db79aaaca" />

---

### Login & Register

<img width="883" height="548" alt="image" src="https://github.com/user-attachments/assets/0eedb368-70ee-4e47-9ff9-66a103108f11" />

<img width="875" height="491" alt="image" src="https://github.com/user-attachments/assets/745ec138-7822-4d0f-8482-a13f618369d2" />

---

### Product Details

<img width="865" height="490" alt="image" src="https://github.com/user-attachments/assets/10ff82d1-7716-4071-a0cf-9b49b2253b08" />

---

### Shopping Cart

<img width="875" height="484" alt="image" src="https://github.com/user-attachments/assets/0a78b1ed-2f32-4d2a-9bdf-047b26d944bf" />

---

### Favorite

<img width="872" height="535" alt="image" src="https://github.com/user-attachments/assets/4ecbcefa-8e22-4463-abb9-18b5fe195af3" />

---

### Product Filter

<img width="874" height="544" alt="image" src="https://github.com/user-attachments/assets/4098849e-fcd7-44cd-828e-9b278b0f224b" />

---

### Checkout

<img width="874" height="432" alt="image" src="https://github.com/user-attachments/assets/2199c032-8262-4be3-b7fb-e15383b3d3a2" />

<img width="872" height="479" alt="image" src="https://github.com/user-attachments/assets/d2ce65c0-4067-4683-b36b-58aed901ff4c" />

---

### VNPay Payment

<img width="827" height="559" alt="image" src="https://github.com/user-attachments/assets/62c62afd-f60e-4617-9428-31b8bc0eecd4" />

<img width="878" height="488" alt="image" src="https://github.com/user-attachments/assets/3199e91b-e816-4337-b2ca-2f5da192d643" />

---

### User Profile

<img width="872" height="485" alt="image" src="https://github.com/user-attachments/assets/a4de2e9e-4cfb-41b9-adf1-526fd746d074" />

<img width="863" height="493" alt="image" src="https://github.com/user-attachments/assets/a625a5ca-8641-4a30-979a-8451a643f2b8" />

---

### Order History

<img width="873" height="459" alt="image" src="https://github.com/user-attachments/assets/dae57ab8-b540-49dc-bad8-a7206b778f57" />

<img width="861" height="485" alt="image" src="https://github.com/user-attachments/assets/9a065682-b870-4c7a-9b60-8af6dfc5c375" />

---

### Admin Dashboard

<img width="930" height="488" alt="image" src="https://github.com/user-attachments/assets/122d983f-0bca-478a-aa9d-f81e2a3d2ebf" />

<img width="922" height="491" alt="image" src="https://github.com/user-attachments/assets/eece7fed-61cd-4024-b47c-2f089871db3e" />

---

### Product Management

> ONGOING

---

### Order Management

> ONGOING

---

## Installation

### Clone repository

```bash
git clone https://github.com/kiet1911/ProjectBoard.git
```

### Env Setup 

```bash
VITE_API_URL = .../api
```

### Backend

```bash
https://github.com/kiet1911/webResfulAPIs
```

---


## Live Demo

Frontend

```text
ONGOING
```

Backend

```text
ONGOING
```

---

## Video Demonstration

```text
ONGOING
```

---

## Future Improvements

* Product Reviews & Ratings
* Wishlist
* Coupon System
* Product Recommendation
* Real-time Notification
* Docker Deployment
* CI/CD Pipeline
* Unit & Integration Testing

---

## Author

**Nguyen Tuan Kiet**

Full Stack Developer (.NET & React)

* GitHub: https://github.com/kiet1911
* Email: nguyentuankiet19112002@gmail.com
* LinkedIn: (https://www.linkedin.com/in/tuankietnguyen1911/)
