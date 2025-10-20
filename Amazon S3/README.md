# 🪣 Amazon S3 Setup — CodeFusion Serverless Web Application

This document outlines the **Amazon S3 configuration** used to host the **frontend (React build)** of the **CodeFusion Serverless Web Application**.  
The S3 bucket serves as the **static website hosting layer**, storing all built frontend assets that integrate seamlessly with **CloudFront** and **Route 53**.

---

## ⚙️ Overview

| Bucket Name | Region | Bucket Type | Integrated Services |
|--------------|---------|---------------|----------------------|
| `codefusion.pankajksh.xyz` | ap-south-1 (Mumbai) | Private | CloudFront, Route 53 |

---

## 📸 Screenshots & Descriptions

### 1. Final Frontend Build Confirmation ✅  
**Description:**  
A view of the **React codebase** after a successful production build.  
- The deployed **API Gateway Invoke URL** is configured as the `BASE_URL` in `API_Routes.jsx`.  
- The `dist/` directory contains the optimized frontend build ready for deployment.
<img width="1366" height="768" alt="1" src="https://github.com/user-attachments/assets/6f6b8542-1d58-400c-9294-200018fcf164" />

---

### 2. Empty S3 Bucket for Frontend Hosting 🪣  
**Description:**  
The **Objects** tab of the S3 bucket `codefusion.pankajksh.xyz` showing an **empty state**.  
- The bucket is created with **default public access blocked** (temporarily disabled later for website hosting).  
- Ready to receive frontend deployment files.
<img width="1366" height="688" alt="2" src="https://github.com/user-attachments/assets/8d6a5c83-b27b-4b40-abba-05e761f51851" />

---

### 3. Initiate Frontend Dist Files Upload ⬆️  
**Description:**  
The **S3 Upload** interface displays a **file explorer** opened to the local `dist` directory.  
- Selected items include all generated files and the **`assets/`** folder.  
- The upload process begins, transferring the React build to S3.
<img width="1366" height="686" alt="3" src="https://github.com/user-attachments/assets/885b0999-1708-4fec-b44b-230b123f9b0b" />

---

### 4. S3 Upload Success and File List 📂  
**Description:**  
Successful upload confirmation showing **8 total objects** (files + folders).  
- Includes `index.html`, `vite.svg`, `manifest.json`, and the full `assets/` directory.  
- The frontend is now available for static hosting and ready for **CloudFront** distribution setup.
<img width="1366" height="687" alt="4" src="https://github.com/user-attachments/assets/e61495fb-7194-457f-9999-9e2d75921b21" />

---

## 🧩 Integration Summary

This S3 bucket acts as the **frontend hosting layer** in the **CodeFusion** architecture stack.  
It integrates with **CloudFront** for global content delivery and **Route 53** for domain mapping.

**Key Responsibilities:**
- Store static frontend files (HTML, CSS, JS, assets)
- Serve the web application through CloudFront and custom domain (`codefusion.pankajksh.xyz`)
- Provide fast and scalable access for end-users worldwide

---
