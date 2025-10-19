# 🌐 AWS CloudFront Setup — CodeFusion Serverless Web Application

This document outlines the **Amazon CloudFront configuration** used to distribute and cache static assets for the **CodeFusion Serverless Web Application**.  
CloudFront provides **global low-latency delivery** for the React frontend hosted on **Amazon S3**, secured with **HTTPS** via **AWS Certificate Manager (ACM)** and mapped through **Route 53**.

---

## ⚙️ Overview

| Distribution Name | Origin | Custom Domain | SSL Certificate | Behavior | Status |
|--------------------|---------|----------------|------------------|-----------|----------|
| `CodeFusion-CD` | `codefusion.pankajksh.xyz (S3)` | `codefusion.pankajksh.xyz` | ACM (Issued - US East N. Virginia) | Redirect HTTP → HTTPS, Compression Enabled | ✅ Active |

---

### 1. Start CloudFront Distribution Setup 🚀  
**Description:**  
Initial **Create Distribution** step:  
- **Distribution name:** `CodeFusion-CD`  
- **Type selected:** “Single website or app”  

This begins the setup for globally caching and distributing the frontend.
<img width="1366" height="688" alt="1" src="https://github.com/user-attachments/assets/86ea1111-71ea-4d41-893c-3c2ab96e3ae1" />

---

### 2. Specify S3 Origin and Private Access 🛡️  
**Description:**  
In the **Specify origin** step:  
- Origin set to **S3 bucket:** `codefusion.pankajksh.xyz`  
- Enabled: **Allow private S3 bucket access to CloudFront (Recommended)**  

Ensures CloudFront can securely fetch objects from S3 without public exposure.
<img width="1366" height="688" alt="2" src="https://github.com/user-attachments/assets/d6a79801-65d5-4ce8-a22a-2bc6d7fc6c7c" />

---

### 3. Confirming Origin and Cache Settings ⚙️  
**Description:**  
Reviewed **origin path** and selected **Use recommended origin and cache settings**.  
This optimizes caching, TTLs, and compression settings for static site delivery.
<img width="1366" height="688" alt="3" src="https://github.com/user-attachments/assets/3316d867-4a03-4cd6-be5e-5817854e6500" />

---

### 4. Disable Web Application Firewall (WAF) 🚫  
**Description:**  
Under **Enable security**, opted for:  
- **Do not enable security protections** (AWS WAF not enabled).  
This simplifies initial setup, as WAF can be added later if needed.
<img width="1366" height="687" alt="4" src="https://github.com/user-attachments/assets/c1c2c0eb-c0f2-450e-8c9f-095ccfe19ce2" />

---

### 5. Review and Create Distribution 📝  
**Description:**  
Final step before deployment: reviewed all parameters for the **CodeFusion-CD** distribution and confirmed creation.  
<img width="1366" height="687" alt="5" src="https://github.com/user-attachments/assets/13130171-77df-4b92-9786-c7d04b678a39" />

---

### 6. CloudFront Distribution Details (Deploying) 🌐  
**Description:**  
The new distribution appears in the dashboard showing:  
- **Status:** Deploying  
- **Domain name:** auto-generated CloudFront URL  
Indicates CloudFront is propagating configuration globally.
<img width="1366" height="688" alt="6" src="https://github.com/user-attachments/assets/4f07b8e1-c4e9-4c87-80b1-c6cabfa70468" />

---

### 7. CloudFront Origin Configuration View 🔗  
**Description:**  
Opened the **Origins** tab showing a single S3 origin — `codefusion.pankajksh.xyz`.  
Confirms successful mapping between CloudFront and S3.
<img width="1366" height="687" alt="7" src="https://github.com/user-attachments/assets/491aab10-303b-4f9c-9c12-2b0a0024756c" />

---

### 8. Configure Custom Domain Name 💻  
**Description:**  
Added **custom domain name:** `codefusion.pankajksh.xyz`  
This ensures users access the frontend via the project’s domain instead of the default CloudFront URL.
<img width="1366" height="687" alt="8" src="https://github.com/user-attachments/assets/14eca9c6-ea7e-41a2-b807-b2c6501da3b8" />

---

### 9. Select TLS Certificate for Domain Security 🔐  
**Description:**  
In the **Get TLS certificate** step:  
- Option to **use existing** or **create new certificate** from AWS Certificate Manager (ACM).  
Ensures all content is served over secure HTTPS.
<img width="1366" height="688" alt="9" src="https://github.com/user-attachments/assets/fead987b-e5d7-43ac-9cd5-cde94a73c164" />

---

### 10. Issued ACM Certificate Status (US East) 📜  
**Description:**  
Viewed in **AWS Certificate Manager**, confirming:  
- **Status:** Issued  
- **Region:** US East (N. Virginia)  
- **Domain:** `codefusion.pankajksh.xyz`  

This certificate will be linked to the CloudFront distribution.
<img width="1366" height="686" alt="10" src="https://github.com/user-attachments/assets/29a1e665-6187-49fd-a79e-227c19b11a11" />

---

### 11. Select Available TLS Certificate 🛡️  
**Description:**  
Selected the issued **ACM certificate** for `codefusion.pankajksh.xyz` in the **Get TLS certificate** step.  
This enables end-to-end HTTPS encryption for the distribution.
<img width="1366" height="688" alt="11" src="https://github.com/user-attachments/assets/a63eba2e-b100-4ecb-aec8-a1dfb046e037" />

---

### 12. Review Custom Domain Changes 📝  
**Description:**  
Final review before applying domain updates:  
- **Domain name:** `codefusion.pankajksh.xyz`  
- **TLS Certificate ARN:** Selected ACM certificate  
Confirmed and saved configuration.
<img width="1366" height="687" alt="12" src="https://github.com/user-attachments/assets/3d1c019b-aaf9-4121-801e-d6ff9b860dd7" />

---

### 13. Default CloudFront Cache Behavior ⚙️  
**Description:**  
Viewed the **Behaviors** tab showing the **Default (*) path pattern** with:  
- **Redirect HTTP → HTTPS** enabled  
Ensures all incoming traffic is automatically upgraded to secure HTTPS.
<img width="1366" height="686" alt="13" src="https://github.com/user-attachments/assets/654225dc-2a5d-46f6-b5b1-3a554ae46a19" />

---

### 14. Edit Default Behavior Settings 🔧  
**Description:**  
Edited default behavior settings to enable:  
- **Compress objects automatically**  
- **Redirect HTTP to HTTPS**  
Improves performance and enforces encryption.
<img width="1366" height="688" alt="14" src="https://github.com/user-attachments/assets/8b998083-abb9-4f56-a190-8ea1e0990186" />

---

### 15. Distribution Details with Custom Domain 💻  
**Description:**  
The **General** tab now shows:  
- **Alternate domain name:** `codefusion.pankajksh.xyz`  
- **SSL certificate:** Custom ACM (Active)  
Distribution status: **Deployed and Active**.
<img width="1366" height="687" alt="15" src="https://github.com/user-attachments/assets/77e1d129-3948-4b8b-aa44-65f9f7573df8" />

---

### 16. DNS Propagation Check 🗺️  
**Description:**  
Used **whatsmydns.net** to verify propagation of the CloudFront domain globally.  
All DNS records show successful propagation for the custom domain.
<img width="1366" height="731" alt="16" src="https://github.com/user-attachments/assets/bc4b6783-c087-41a7-8ae4-ff390b8fd9fd" />

---

## 🧩 Integration Summary

**Amazon CloudFront** serves as the **content delivery and caching layer** for the CodeFusion web app.  
It fetches static files from **S3**, applies **HTTPS via ACM**, and routes requests through the **Route 53** domain.

**Key Responsibilities:**
- Distribute static frontend assets globally  
- Enforce HTTPS for secure access  
- Integrate with S3 (origin), ACM (security), and Route 53 (domain mapping)  
- Cache and compress assets for faster delivery  

---
