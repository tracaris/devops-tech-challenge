# DevOps Tech Challenge — Node.js Frontend & Backend on AWS ECS

This project demonstrates deploying a React frontend and Node.js (Express) backend to AWS using **ECS Fargate**, **Application Load Balancer**, **ECR**, **Terraform**, and **Jenkins CI/CD**.

---

## Architecture Overview

- **Frontend:** React application served via NGINX running in ECS Fargate
- **Backend:** Node.js (Express) API running in ECS Fargate
- **Load Balancer:** Application Load Balancer (ALB)
  - `/` → Frontend service
  - `/api/*` → Backend service
- **Container Registry:** Amazon ECR
- **Infrastructure as Code:** Terraform
- **CI/CD:** Jenkins

---

## Live Application URLs

- **Frontend (Public):**  
  http://devops-tech-challenge-alb-1887251520.us-east-1.elb.amazonaws.com/

- **Backend Health Check:**  
  http://devops-tech-challenge-alb-1887251520.us-east-1.elb.amazonaws.com/api/

---

## ECS Configuration

- **Launch Type:** Fargate
- **Services:** Frontend & Backend
- **Desired Tasks:** 1
- **Minimum Tasks:** 1
- **Maximum Tasks:** 4
- **CPU per Task:** 512 (0.5 vCPU)
- **Memory per Task:** 1024 MB (1 GB)
- **Auto Scaling:** Target tracking at 50% CPU utilization

---

## Infrastructure Provisioning (Terraform)

All infrastructure required to run the frontend and backend services is provisioned using Terraform, including:

- ECS Cluster (Fargate)
- ECS Task Definitions
- ECS Services
- Application Load Balancer
- Target Groups
- Security Groups
- Application Auto Scaling policies

### Deploy Infrastructure

```bash
cd terraform
terraform init
terraform plan
terraform apply

