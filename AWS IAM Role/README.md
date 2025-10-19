# 🔐 AWS IAM Role Setup — CodeFusion Serverless Web Application

This document outlines the creation and configuration of the **IAM Role** that grants **AWS Lambda** functions secure access to **Amazon DynamoDB** within the CodeFusion Serverless Web Application.

---

## ⚙️ Overview

| Role Name                 | Trusted Entity | Attached Policy               | Purpose |
|----------------------------|----------------|--------------------------------|----------|
| `Lambda-Role-For-DynamoDB` | AWS Lambda     | `AmazonDynamoDBFullAccess`     | Allows Lambda functions to read and write data in DynamoDB tables |

---

### 1. Select Lambda Trusted Entity 🤝  
**Description:**  
**Step 1: Select trusted entity** during IAM Role creation.  
- **AWS service** is selected as the trusted entity type.  
- **Use case:** Lambda.  
This ensures the role can be assumed only by AWS Lambda functions.
<img width="1366" height="686" alt="1" src="https://github.com/user-attachments/assets/41a5a46f-3435-4fed-b0dc-dc6de8e1e073" />

---

### 2. Add DynamoDB Full Access Policy ✅  
**Description:**  
**Step 2: Add permissions** screen.  
The AWS managed policy **`AmazonDynamoDBFullAccess`** is selected and attached to this role.  
This grants full read/write permissions for DynamoDB resources.
<img width="1366" height="686" alt="2" src="https://github.com/user-attachments/assets/200143e0-afbf-43ea-a6f9-922ae78604c2" />

---

### 3. Review Role Details and Trust Policy 📝  
**Description:**  
**Step 3: Name, review, and create** page.  
- **Role name:** `Lambda-Role-For-DynamoDB`  
- Displays the **trust relationship policy** allowing AWS Lambda to assume the role.  

**Sample Trust Policy:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "Service": "lambda.amazonaws.com" },
      "Action": "sts:AssumeRole"
    }
  ]
}
```
<img width="1366" height="687" alt="3" src="https://github.com/user-attachments/assets/dbaf382f-4fce-4eec-8453-d5ed99ce1cb6" />

---

### 4. Final Lambda Role Summary 🛡️

**Description:**  
The final summary page confirms successful role creation.

- **Role Name:** `Lambda-Role-For-DynamoDB`  
- **Attached Policy:** `AmazonDynamoDBFullAccess`

This role is now ready to be assigned to Lambda functions (e.g., `SignupFunction` and `LoginFunc`).
<img width="1366" height="686" alt="4" src="https://github.com/user-attachments/assets/209fa908-6d58-471f-99c6-af6d4149eb54" />

---

### 5. Edit Role Session Duration ⏳

**Description:**  
The **Edit Role** dialog is opened to modify:

- **Maximum session duration:** changed from the default **1 hour → 2 hours**

This ensures longer execution sessions for extended operations if required.
<img width="1366" height="688" alt="5" src="https://github.com/user-attachments/assets/decf5d58-4dae-46aa-bb03-d014f2883642" />

---

### 🧩 Integration Summary

This IAM Role (`Lambda-Role-For-DynamoDB`) acts as a secure bridge between **AWS Lambda** and **DynamoDB**.  
It enables Lambda functions to perform essential CRUD operations on tables like:

- `users`
- `projects`

**Key Benefits:**

- ✅ Follows **least privilege principle** (limited to DynamoDB only)  
- 🧰 Uses **AWS-managed policy** for easy maintenance  
- 🔒 Ensures **secure, role-based access** without permanent credentials
