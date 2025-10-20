<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
=======
# 🌐 CodeFusion — Serverless Web Application on AWS

## 📖 Project Overview
**CodeFusion** is a fully serverless web application designed, developed, and deployed using a range of AWS services.  
The project demonstrates the integration of a React-based frontend with a serverless backend built on AWS Lambda, API Gateway, and DynamoDB.  
All components are hosted and distributed globally through Amazon CloudFront, with a custom domain managed via Amazon Route 53 and secured using AWS Certificate Manager (ACM).

The goal of CodeFusion is to showcase a production-grade, cost-efficient, and highly scalable serverless architecture—removing the need for traditional backend servers while maintaining performance, security, and global reach.

---

## 🧰 Technologies and Tools
- **AWS Services:** Lambda, API Gateway, DynamoDB, S3, CloudFront, Route 53, ACM, IAM  
- **Frontend:** React, JavaScript, npm (using files like `app.jsx`, `index.jsx`, and a build process via `npm run build`)
- **Backend Language:** Node.js.
- **Domain Registrar:** GoDaddy  
- **Region Used:** ap-south-1 (Mumbai)
- **Deployment Type:** Fully serverless (no EC2 instances or manual servers involved).
  
---

## 🧩 Architecture Summary
CodeFusion follows a **modern serverless architecture** that connects the frontend, backend, and database through fully managed AWS services. 

<img width="1252" height="532" alt="diagram-export-19-10-2025-10_17_49" src="https://github.com/user-attachments/assets/1d5182ff-0e61-4368-9124-786d9eb9668b" />

The architectural flow is as follows:
1. The **frontend** is a static React web application hosted in **Amazon S3**.
2. **CloudFront** serves the frontend globally and ensures secure HTTPS delivery.
3. The **backend logic** is handled by **AWS Lambda** functions.
4. These Lambda functions are exposed to the web via **Amazon API Gateway REST API**.
5. **Amazon DynamoDB** serves as the NoSQL database for persistent storage.
6. **IAM** ensures secure permission control across all components.
7. **Route 53** provides reliable DNS routing with GoDaddy domain integration.
8. **AWS Certificate Manager (ACM)** secures communication through TLS/SSL certificates.

---

## 🧠 Application Flow
1. A user accesses **https://codefusion.pankajksh.xyz** served by CloudFront.  
2. The React frontend loads from S3 via CloudFront’s global edge network.  
3. On signup or login, the frontend sends a request to the API Gateway endpoint.  
4. API Gateway invokes the appropriate Lambda function.  
5. The Lambda function interacts with DynamoDB to read or write user data.  
6. The response is returned to the frontend and displayed to the user.  
7. All communication occurs securely via HTTPS.

---

## ☁️ AWS Services Used

### 🗄️ Amazon DynamoDB
- Used as the **NoSQL database** to store user and project data.  
- Two tables were created:
  - **users** — with `email` as the partition key.
  - **projects** — with `projectID` as the partition key and `userID` as the sort key.  
- DynamoDB ensures high scalability and automatic management of read/write capacity.

### 🔐 AWS Identity and Access Management (IAM)
- Used to create a dedicated **execution role** for Lambda functions.
- Role created: **Lambda-Role-For-DynamoDB**.
- Granted permissions using the **AmazonDynamoDBFullAccess** policy to allow secure data operations from the backend.

### ⚙️ AWS Lambda
- Used to host the **serverless backend logic**.  
- Functions created:
  - **SignupFunction** — Handles user registration and stores details in DynamoDB.
  - **LoginFunc** — Authenticates users and retrieves records from DynamoDB.
- Both functions use the Node.js runtime and are connected to API Gateway.

### 🌐 Amazon API Gateway (REST API)
- Provides **public REST API endpoints** for the Lambda backend.  
- API created: **CodeFusion API** with resources for:
  - `/auth/signup`
  - `/auth/login`  
- Both endpoints use the **POST** method and integrate directly with the respective Lambda functions.
- **CORS** is explicitly enabled to allow frontend requests from the custom domain.

### 🗃️ Amazon Simple Storage Service (S3)
- Hosts the **static frontend assets** (HTML, JS, CSS, images).  
- S3 bucket: **codefusion.pankajksh.xyz**.

### 🚀 Amazon CloudFront
- Acts as a **Content Delivery Network (CDN)** for the frontend application.  
- Distribution created: **CodeFusion-CD**.
- Origin: the S3 bucket (`codefusion.pankajksh.xyz`).
- Provides:
  - Global low-latency content delivery.
  - HTTPS using a custom domain.
  - Caching for performance optimization.

### 🌍 Amazon Route 53
- Used for **DNS management** and connecting the custom domain to CloudFront.  
- Domain: **pankajksh.xyz**.
- Record created: `codefusion.pankajksh.xyz` (A-Record Alias pointing to the CloudFront distribution).
- Integrated seamlessly with **GoDaddy (domain registrar)** by delegating name servers to Route 53.

### 🔒 AWS Certificate Manager (ACM)
- Provides **TLS/SSL certificates** for secure HTTPS access.  
- Certificate issued for `*.pankajksh.xyz` and validated through DNS using Route 53.
- Integrated with CloudFront to ensure all web traffic is encrypted.

---

## 💻 Frontend Stack
- Developed using **React** with modern JavaScript tooling.
- Core files include `app.jsx`, `index.jsx`, and a build directory (`dist`) generated using the `npm run build` process.
- The frontend communicates with the backend through **API Gateway endpoints**.

---

## 🔄 Networking and Security
- **CORS** was configured on API Gateway to allow requests from the CloudFront domain.
- **IAM roles** control permissions for Lambda and DynamoDB interactions.
- **ACM** ensures HTTPS encryption for all external traffic.
- **Route 53** provides reliable DNS routing with GoDaddy domain integration.

---

## 🌍 Domain & DNS Integration
- The domain **pankajksh.xyz** was originally registered on GoDaddy.
- DNS management was transferred to **Amazon Route 53** by updating GoDaddy name servers.
- An **A-record alias** was created in Route 53 to map `codefusion.pankajksh.xyz` to the CloudFront distribution.
- Once the **TLS/SSL certificate** was validated, the domain successfully served the application over HTTPS.

---

## 🧾 Project Outcome
The CodeFusion project successfully demonstrates how to:
- Build a **serverless authentication system** using AWS Lambda, DynamoDB, and API Gateway.
- Host and deliver a **secure, globally available frontend** using S3, CloudFront, and Route 53.
- Manage **permissions, SSL, and DNS routing** using IAM, ACM, and Route 53.
- Integrate multiple AWS services in a cohesive and scalable architecture.

The final result is a **fully functional, secure, and low-maintenance web application**, showcasing the potential of AWS serverless technologies in real-world deployments.

---

## 🏁 Final Outcome
- A fully deployed and secure web application accessible via:
  **https://codefusion.pankajksh.xyz**
- The application supports user signup and login through a completely serverless backend.
- Frontend is globally distributed with SSL security and low-latency performance.

---

## 🏷️ Project Type
**Serverless | Full Stack | AWS-Based | Scalable | Secure**
>>>>>>> 25506e16ae5423ff7081a50b1704efb7baa3dbec
