# 🌍 AWS Route 53 Setup — CodeFusion Serverless Web Application

This document explains the **Amazon Route 53 configuration** for connecting the **CodeFusion CloudFront distribution** to the **custom domain `codefusion.pankajksh.xyz`**.  
Route 53 provides **DNS management**, ensuring reliable routing of web traffic from the domain registrar (GoDaddy) to the CloudFront CDN endpoint.

---

## ⚙️ Overview

| Domain | Record Type | Alias Target | Status | Purpose |
|----------|--------------|----------------|----------|----------|
| `codefusion.pankajksh.xyz` | A (Alias) | CloudFront Distribution (`CodeFusion-CD`) | ✅ In Sync | Routes traffic from domain to CloudFront-hosted frontend |

---

### 1. Domain Name Servers at Registrar 🗄️  
Screenshot from **GoDaddy** (domain registrar) showing **custom nameservers** configured for the root domain `pankajksh.xyz`.  
These nameservers point to **Amazon Route 53**, delegating DNS management to AWS.
<img width="1366" height="768" alt="1" src="https://github.com/user-attachments/assets/c45f584a-4b50-4a75-9095-6534248af8c1" />

---

### 2. Route 53 Hosted Zone Records (Initial) 🗺️   
In the **Amazon Route 53 console**, the **Hosted Zone** for `pankajksh.xyz` displays the initial default records:
- **NS (Name Server)** record  
- **SOA (Start of Authority)** record  

This forms the foundational DNS setup for the hosted zone.
<img width="1366" height="688" alt="2" src="https://github.com/user-attachments/assets/9c18f9f4-f0af-48d9-8dfb-45936f439408" />

---

### 3. Create CloudFront Alias Record ➡️  
Created a new **A record** in the hosted zone:  
- **Record name:** `codefusion`  
- **Record type:** A (Alias)  
- **Alias target:** Linked to the **CloudFront Distribution (CodeFusion-CD)**  

This connects the subdomain `codefusion.pankajksh.xyz` directly to the CloudFront endpoint.
<img width="1366" height="687" alt="3" src="https://github.com/user-attachments/assets/7f07c973-2ac8-4d31-8319-3c2a115c3f10" />

---

### 4. DNS Change Status: Pending ⏳  
Viewed the **Change Info** status after record creation:  
- **Status:** PENDING  
Indicates that Route 53 has received the update and is propagating it across DNS servers globally.
<img width="1366" height="687" alt="4" src="https://github.com/user-attachments/assets/27e936c4-fefb-4552-992b-7dd42ed04a99" />

---

### 5. DNS Change Status: InSync ✅  
After propagation, the **Change Info** page updates to:  
- **Status:** INSYNC  
Confirms that DNS changes are now active and globally propagated.
<img width="1366" height="686" alt="5" src="https://github.com/user-attachments/assets/d8048c8f-c1c7-491a-bca6-df5c2df3f0f9" />

---

### 6. Final Route 53 Records List 🌐  
The **Hosted Zone details** page now shows:
- `NS` and `SOA` default records  
- New **A (Alias)** record: `codefusion.pankajksh.xyz → CloudFront`  

The hosted zone configuration is now complete for the frontend domain.
<img width="1366" height="688" alt="6" src="https://github.com/user-attachments/assets/b6a7c6dc-59e0-4167-8df0-af8247fb943a" />

---

### 7. Deployed Application Login Page 🖥️  
Browser view confirming deployment success:  
- URL: **https://codefusion.pankajksh.xyz/login**  
- Displays the **CodeFusion application login page**, served securely via HTTPS through CloudFront and Route 53.
<img width="1366" height="731" alt="7" src="https://github.com/user-attachments/assets/d972a03c-512b-4bc5-bf56-67451fb01bb7" />

---

## 🧩 Integration Summary

**Amazon Route 53** acts as the **DNS routing layer** that bridges the domain registrar with the **AWS CloudFront distribution**.  
It ensures reliable, secure, and low-latency access to the CodeFusion frontend.

**Key Responsibilities:**
- Manage DNS records for the CodeFusion domain  
- Route traffic from `pankajksh.xyz` to CloudFront (`CodeFusion-CD`)  
- Enable secure HTTPS delivery using ACM certificates  
- Maintain fault-tolerant and globally distributed DNS resolution  

---
