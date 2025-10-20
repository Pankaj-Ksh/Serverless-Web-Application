# ⚡ AWS Lambda Setup — CodeFusion Serverless Web Application

This document describes the setup and configuration of **AWS Lambda functions** used in the **CodeFusion Serverless Web Application**.  
Each Lambda function is responsible for handling specific backend operations such as **user signup**, **login**, and interaction with **Amazon DynamoDB**.

---

## ⚙️ Overview

| Function Name     | Runtime       | Timeout | Role                       | Purpose |
|--------------------|---------------|----------|-----------------------------|----------|
| `SignupFunction`   | Node.js 22.x  | 10 sec   | `Lambda-Role-For-DynamoDB`  | Handles user registration and stores data into DynamoDB |
| `LoginFunc`        | Node.js 22.x  | 10 sec   | `Lambda-Role-For-DynamoDB`  | Authenticates user credentials from DynamoDB |

---

## 📸 Screenshots & Descriptions

### 1. Start Lambda Function Creation ✍️  
**Description:**  
Initial **Create Function** screen with **"Author from scratch"** selected.  
- **Function name:** `SignupFunction`  
- **Runtime:** Node.js 22.x  

This marks the beginning of Lambda creation for user signup handling.
<img width="1366" height="686" alt="1" src="https://github.com/user-attachments/assets/788e400d-8878-4794-842f-10925541c615" />

---

### 2. Assign Existing Execution Role ⚙️  
**Description:**  
During function setup in the **Permissions** section:
- **Option selected:** “Use an existing role”  
- **Role chosen:** `Lambda-Role-For-DynamoDB`  

This role allows the Lambda to read and write data in DynamoDB.
<img width="1366" height="687" alt="2" src="https://github.com/user-attachments/assets/81ff9a32-6539-489a-85a0-3da34abab22d" />

---

### 3. Initial Function Configuration View 📊  
**Description:**  
The `SignupFunction` main configuration page shows:
- Function **ARN**
- Default **3-second timeout**
- **Memory**, **Runtime**, and **Handler** information  

The function is successfully deployed but not yet customized.
<img width="1366" height="687" alt="3" src="https://github.com/user-attachments/assets/8585d81e-6c50-4034-8fe4-6747dc79cfdb" />

---

### 4. Update Function Timeout and Role ⏱️  
**Description:**  
Edited basic settings to:
- Increase **Timeout** from 3 seconds → **10 seconds**
- Verify **Execution Role:** `Lambda-Role-For-DynamoDB`

This ensures adequate time for network operations with DynamoDB.
<img width="1366" height="687" alt="4" src="https://github.com/user-attachments/assets/39d24840-254a-43e4-94a1-269317cf84e5" />

---

### 5. Prepare to Upload Code Source ⬆️  
**Description:**  
In the **Code** tab, opened the **Upload from** dropdown showing:
- “.zip file” upload option  
- “Amazon S3 location” upload option  

Prepares the function for source code deployment.
<img width="1366" height="687" alt="5" src="https://github.com/user-attachments/assets/ccb93e06-35fe-4ec0-92fb-aa9d16cb1fdb" />

---

### 6. Local Zip File Upload Dialog 📂  
**Description:**  
A **file explorer dialog** appears for choosing the Lambda deployment package.  
The folder includes:
- `index.js` (main Lambda handler)
- `node_modules` directory  
This package contains all dependencies required for execution.
<img width="1366" height="768" alt="6" src="https://github.com/user-attachments/assets/c96cb993-e6be-4327-8faa-43dafdf35d36" />

---

### 7. Final Functions List 🚀  
**Description:**  
The **AWS Lambda Functions** list shows:
- `SignupFunction`
- `LoginFunc`  
Both using **Node.js 22.x** runtime and configured successfully.
<img width="1366" height="688" alt="7" src="https://github.com/user-attachments/assets/3ac139aa-d387-4460-87e0-0d123cf4d340" />

---

## 🧩 Integration Summary

These Lambda functions act as the **backend logic layer** for the **CodeFusion** serverless stack.  
They interact with the **DynamoDB tables (`users` and `projects`)** via the **AWS SDK v3**.

**Example Responsibilities:**
- `SignupFunction` → Hash password, validate user, and save to DynamoDB  
- `LoginFunc` → Retrieve user record and verify credentials  

---
