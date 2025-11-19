# 📦 Inventory Manager
*A simple and efficient web application for managing products.*

---

## 📘 Overview
Inventory Manager is a lightweight web application that allows users to create, update, delete, and search products.  
The application automatically calculates the total product cost and stores all data in **LocalStorage**, ensuring your data remains available even after refreshing the page.

---

## 🚀 Features

### ➕ Create Products
You can add a product with the following fields:

| Field | Description | Required |
|-------|-------------|----------|
| **Product Name** | Name of the product | ✔️ Yes |
| **Price** | Base price of the product | ✔️ Yes |
| **Taxes** | Added tax value | ❌ Optional |
| **Ads** | Advertising cost | ❌ Optional |
| **Discount** | Discount amount | ❌ Optional |
| **Count** | Quantity of the product | ❌ Optional |
| **Category** | Product category (e.g., electronics, food) | ✔️ Yes |

**Total Price Formula:**
total = price + taxes + ads - discount

### 🔍 Search & Filter
Search for products easily by:

- **Product Name**
- **Category**

The results update instantly as you type.

---

### ✏️ Update & Delete

- Update existing product details with one click.
- Delete individual products.
- Delete all products at once.

---

### 💾 LocalStorage Support
Your product list is saved automatically in **LocalStorage**, giving you persistent data across browser sessions.

---

### 🖼️ Interface Preview

![Inventory Manager Screenshot]()

---

### 🛠️ Technologies Used

- **HTML5**
- **CSS3**
- **JavaScript (Vanilla JS)**
- **LocalStorage API**

---

### 📌 How to Use

1. Fill in the product information.
2. Click **Create** to add the product.
3. View and manage all products in the table below.
4. Use the search bar to filter by name or category.
5. Update or delete any product as needed.

---

### 📄 License
This project is open-source and free for personal and educational use.

---
### 🌐 Live Demo  
🔗 **Check the website here:** [Inventory Manager Live]()





