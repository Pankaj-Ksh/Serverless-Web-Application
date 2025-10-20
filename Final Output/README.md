# 💻 CodeFusion Web Application — Final Output

This document presents the **final deployed view and user interaction flow** of the **CodeFusion Serverless Web Application**.  
It showcases the successful integration of **AWS Lambda, API Gateway, DynamoDB, S3, CloudFront, and Route 53**, resulting in a fully functional, secure, and scalable web app accessible via the custom domain:

🔗 **https://codefusion.pankajksh.xyz**

---

## ⚙️ Overview

| Component | Service | Purpose |
|------------|----------|----------|
| Frontend Hosting | Amazon S3 + CloudFront | Delivers static React app globally with caching and HTTPS |
| Backend Logic | AWS Lambda (Node.js 22.x) | Handles signup and login logic |
| Database | Amazon DynamoDB | Stores user credentials and profile data |
| Domain Management | Amazon Route 53 | Routes domain traffic to CloudFront |
| Security | AWS Certificate Manager | Provides SSL/TLS encryption |

---

## 📸 Screenshots & Descriptions

### 1. CodeFusion Initial Login Page 🔑  

Displays the **login interface** of the CodeFusion application, accessed via the **CloudFront distribution domain name** before the custom domain setup.  
Confirms successful frontend deployment and CloudFront propagation.
<img width="1366" height="729" alt="1" src="https://github.com/user-attachments/assets/3fe19e0d-795c-4ead-a83b-7f8d8702b18d" />

---

### 2. Empty Signup Form 📝  
 
The fully loaded **CodeFusion Signup Page**, accessed through the custom domain `https://codefusion.pankajksh.xyz/signup`.  
Shows empty input fields for:  
- Username  
- Name  
- Email  
- Password  

Validates the S3–CloudFront–Route53 connection for HTTPS frontend access.
<img width="1366" height="729" alt="2" src="https://github.com/user-attachments/assets/a1980e15-5685-4e7a-adf9-f5e1db5e3e12" />

---

### 3. Completed Signup Form Submission ✍️  

Signup form filled with sample user data ready for submission:  
- **Username:** DemoUser  
- **Email:** demo@gmail.com  
- **Password:** ******  

On submission, the request is routed through **API Gateway → Lambda (SignupFunction)** → **DynamoDB (users table)**.
<img width="1366" height="727" alt="3" src="https://github.com/user-attachments/assets/1804019d-ce11-492c-8f26-1b2f65018178" />

---

### 4. Successful Signup and Password Save Prompt ✅  

After signup, the app redirects to the login page.  
A browser pop-up appears prompting:  
> “Save password for this site?”  

Confirms a **successful response from Lambda** and **user data stored in DynamoDB**.
<img width="1366" height="731" alt="4" src="https://github.com/user-attachments/assets/dbf8743a-4a64-4f6f-ab58-0d63391037f5" />

---

### 5. Filled Login Form ➡️  

The **login page** with valid user credentials entered:  
- **Email:** demo@gmail.com  
- **Password:** ******  

When submitted, the request hits **API Gateway → Lambda (LoginFunc)** → **DynamoDB validation**.  
Upon success, a **JWT token** is returned and stored in local state management.
<img width="1366" height="731" alt="5" src="https://github.com/user-attachments/assets/6ec2d5a3-dcc8-4a7f-b090-75f08e3f86a5" />

---

### 6. User Dashboard Post-Login 👋 

The main **user dashboard** loads after successful authentication:  
Displays personalized greeting:  
> “Hi, DemoUser 👋”  
and user profile details:  
- Registered email: demo@gmail.com  
- Logout option  

Confirms complete end-to-end workflow between the frontend, backend, and database.
<img width="1366" height="729" alt="6" src="https://github.com/user-attachments/assets/7c4189e5-384b-464f-afda-6a2df8b51751" />

---

## 🧩 System Workflow Summary

**1️⃣ User Interaction (Frontend)**  
User accesses the application → fills forms → triggers HTTP requests via Axios.

**2️⃣ API Gateway (Middleware)**  
Routes HTTP requests to specific Lambda functions.

**3️⃣ AWS Lambda Functions**  
- `SignupFunction` → Validates and saves user data to DynamoDB  
- `LoginFunc` → Authenticates users and returns JWT  

**4️⃣ DynamoDB Database**  
Stores and retrieves user data securely.

**5️⃣ CloudFront + Route 53 + ACM**  
Delivers content globally, enforces HTTPS, and maps domain.

---
