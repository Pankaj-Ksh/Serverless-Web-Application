# 🗃️ Amazon DynamoDB Setup — CodeFusion Serverless Web Application

This document outlines the configuration and setup of Amazon DynamoDB tables used in the **CodeFusion Serverless Web Application**.  
DynamoDB acts as the **NoSQL database layer** for storing user and project data with seamless scalability and low-latency access.

---

## ⚙️ Overview

| Table Name | Partition Key | Sort Key | Capacity Mode | Status | Purpose |
|-------------|----------------|-----------|----------------|----------|----------|
| `users`     | `email`        | —         | On-Demand      | Active   | Stores user registration and authentication details |
| `projects`  | `projectID`    | `userID`  | On-Demand      | Active   | Manages user projects and their associated metadata |

---

## 📸 Screenshots & Descriptions

### 1. DynamoDB Empty Tables List 🚫  
Initial view of the **Amazon DynamoDB console** in the **Asia Pacific (Mumbai)** region before any tables are created.
<img width="1366" height="686" alt="1" src="https://github.com/user-attachments/assets/ce2d5978-f0ac-494d-a35b-95b572254d04" />

---

### 2. Create `'users'` Table Configuration 👤  
Creating the `users` table with:
- **Partition key:** `email`
- **Key type:** String  
- **Capacity mode:** Default (On-Demand)

Used to store individual user information for authentication and profile management.
<img width="1366" height="687" alt="2" src="https://github.com/user-attachments/assets/cec6ce03-5002-4ac7-967d-d1488cdf9401" />

---

### 3. Create `'projects'` Table Configuration 🛠️    
Creating the `projects` table with:
- **Partition key:** `projectID`
- **Sort key:** `userID`
- **Capacity mode:** Default (On-Demand)

Used to maintain project-specific data linked to individual users.
<img width="1366" height="686" alt="3" src="https://github.com/user-attachments/assets/17d346fe-45a0-4cef-b589-d8c048f67106" />

---

### 4. `'users'` Table Settings View ⚙️    
After creation, the `users` table shows:
- **Status:** Active  
- **Capacity Mode:** On-Demand  
- **Item count:** 0 (no data inserted yet)
<img width="1366" height="686" alt="4" src="https://github.com/user-attachments/assets/3b396b41-1b20-403f-b292-e4416b41744d" />

---

### 5. Exploring `'users'` Table Items 🔍    
Using the **Explore items** tab for the `users` table.  
A **Scan** operation confirms **0 items returned**, indicating a clean, empty table ready for application data insertion.
<img width="1366" height="688" alt="5" src="https://github.com/user-attachments/assets/8cf6ca6b-ea27-4307-a27e-3e2d28274d8e" />

---

### 6. Exploring `'projects'` Table Items 🗺️  
Viewing the `projects` table under **Explore items**.  
Running a **Scan** also returns **0 items**, confirming the table is active but empty.
<img width="1366" height="688" alt="6" src="https://github.com/user-attachments/assets/732babee-e1ca-4eb9-8727-6561d734cd47" />

---

## 🧩 Integration Summary

- Both tables (`users` and `projects`) are accessed programmatically through AWS SDK in the Lambda backend.
- CRUD operations are handled using:
  - `PutItemCommand`
  - `GetItemCommand`
  - `ScanCommand`
- The tables form the **data persistence layer** of the **CodeFusion Serverless Architecture**, supporting login, project management, and user-specific data retrieval.
