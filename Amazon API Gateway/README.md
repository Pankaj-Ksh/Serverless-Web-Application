# 🌐 Amazon API Gateway Setup — CodeFusion Serverless Web Application

This document details the creation and configuration of **Amazon API Gateway** for the **CodeFusion Serverless Web Application**.  
API Gateway serves as the **HTTP interface layer**, securely connecting the React frontend with backend **AWS Lambda functions** that interact with **DynamoDB**.

---

## ⚙️ Overview

| API Name    | Type     | Endpoint Type | Stage | Integrated Lambdas | Purpose |
|--------------|----------|----------------|--------|----------------------|----------|
| `CodeFusion` | REST API | Regional       | `Test` | `SignupFunction`, `LoginFunc` | Handles all authentication-related API calls from the frontend |

---

## 📸 Screenshots & Descriptions

### 1. Project API Endpoints Definition 💻  
**Description:**  
A VS Code screen showing `API_Routes.jsx`, defining two main authentication endpoints:
- `/auth/signup`
- `/auth/login`  
These routes are called by the frontend to trigger the respective Lambda functions via API Gateway.
<img width="1366" height="768" alt="1" src="https://github.com/user-attachments/assets/5565ea27-bf61-47b5-b96b-b39a02015d0a" />

---

### 2. Select REST API Type 🌐  
**Description:**  
In **Amazon API Gateway**, the **Create API** page is displayed with:
- **Option selected:** “REST API”  
- Reason: Provides full control over request/response structure and integration with Lambda.
<img width="1366" height="687" alt="2" src="https://github.com/user-attachments/assets/844047e4-4fbc-4843-9169-e3558d7bdf23" />

---

### 3. Name New REST API 📝  
**Description:**  
The **Create REST API** configuration page:
- **API Name:** `CodeFusion`
- **Endpoint Type:** Regional  
- **Create Option:** “New API”  
This creates the foundational API container.
<img width="1366" height="686" alt="3" src="https://github.com/user-attachments/assets/755c398f-16eb-46ab-8610-89f024469617" />

---

### 4. Initial API Gateway Resources View 🌲  
**Description:**  
The main **Resources** view of the new `CodeFusion` API shows:
- Root path `/` selected  
- Message: “No methods defined yet”  
This is the default initial state after API creation.
<img width="1366" height="686" alt="4" src="https://github.com/user-attachments/assets/b9ae634d-b1be-4024-91f2-9b05e9b13996" />

---

### 5. Create `/auth` Resource Path 🔒  
**Description:**  
A new resource named `auth` is created under the root `/` path.  
This path will serve as the **base resource** for all authentication-related endpoints.
<img width="1366" height="687" alt="5" src="https://github.com/user-attachments/assets/555f0f0b-06f3-4558-89c3-ec49ab5df3b6" />

---

### 6. Create `/signup` Resource Path ➕  
**Description:**  
Inside `/auth`, a new nested resource `/signup` is added.  
No methods are defined yet; this will later connect to the `SignupFunction`.
<img width="1366" height="687" alt="6" src="https://github.com/user-attachments/assets/f111e027-9c7f-4900-9402-9b6244a6182c" />

---

### 7. Create Signup POST Method Integration 🔗  
**Description:**  
A **POST** method is added under `/auth/signup`.  
Integration type: **Lambda Function**  
Linked Lambda ARN: `SignupFunction`  
This allows frontend signup requests to trigger the Lambda directly.
<img width="1366" height="688" alt="7" src="https://github.com/user-attachments/assets/9adc8aaa-48d9-4f5f-8b5e-fdf60529e30c" />

---

### 8. Create Login POST Method Integration 🔑  
**Description:**  
A **POST** method is created for `/auth/login`.  
Integration type: **Lambda Function**  
Linked Lambda ARN: `LoginFunc`  
Handles user login and credential validation.
<img width="1366" height="687" alt="8" src="https://github.com/user-attachments/assets/19e8a112-3bab-483c-ac5d-9a5930d1816c" />

---

### 9. Final API Resources Structure 🏛️  
**Description:**  
The completed API Resource Tree:

auth → signup → POST → SignupFunction,

auth → login → POST → LoginFunc

<img width="1366" height="688" alt="9" src="https://github.com/user-attachments/assets/3e5a4158-4707-4af5-a63a-7fdeaea6711b" />

---

### 10. Enable CORS for API Gateway 🛡️  
**Description:**  
CORS (Cross-Origin Resource Sharing) is enabled to allow the React frontend to call the API.  
Configuration includes:
- **Access-Control-Allow-Origin:** `*` (wildcard)
- Automatically adds **OPTIONS** methods for all resources.
<img width="1366" height="688" alt="10" src="https://github.com/user-attachments/assets/e04c9a16-4ffb-4c6b-ad9b-59484160ccdd" />

---

### 11. API Gateway Resources with OPTIONS Methods 🚦  
**Description:**  
After enabling CORS, the Resources view now shows:
- **OPTIONS** methods automatically created under `/auth`, `/auth/signup`, and `/auth/login`.
<img width="1366" height="688" alt="11" src="https://github.com/user-attachments/assets/f65b93ce-d245-4b8e-bc1e-866a92ab1561" />

---

### 12. Deploy API to New Stage 🚀  
**Description:**  
API deployment dialog shows:
- **Stage Name:** `Test`  
- **Purpose:** Make the API accessible via a public **Invoke URL**.
<img width="1366" height="688" alt="12" src="https://github.com/user-attachments/assets/18d3772d-d1d6-4ee2-833d-5b86495c58ab" />

---

### 13. API Gateway Test Stage Details ✨  
**Description:**  
The **Stages** view displays:
- Stage: `Test`
- Generated **Invoke URL**
- Complete resource tree under this stage, ready for frontend integration.
<img width="1366" height="688" alt="13" src="https://github.com/user-attachments/assets/eedadf31-676c-4ad5-b6e6-a6187b80083c" />

---

### 14. Update Frontend Base URL and Build Error ❌  
**Description:**  
In `API_Routes.jsx`, the `BASE_URL` is updated to the new API Gateway **Invoke URL**.  
A small build error occurs after this change in the terminal.
<img width="1366" height="768" alt="14" src="https://github.com/user-attachments/assets/5a724a39-ca20-4b29-9e37-fee0886aac47" />

---

### 15. Successful Frontend Build after Fix ✅  
**Description:**  
After correcting the build issue, `npm run build` completes successfully.  
The React frontend is now correctly connected to the **API Gateway endpoints**.
<img width="1366" height="768" alt="15" src="https://github.com/user-attachments/assets/93dcb736-9197-4edb-9016-e6dfd462b7b8" />

---

## 🧩 Integration Summary

- The **API Gateway** acts as the public entry point for the frontend.
- Each endpoint is directly integrated with a **Lambda function**:
  - `/auth/signup` → `SignupFunction`
  - `/auth/login` → `LoginFunc`
- **CORS enabled** for secure cross-origin communication.
- Deployed to stage: `Test`

---
