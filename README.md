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

DevOps Tech Challenge – End-to-End AWS Deployment
Overview
This project demonstrates a complete end-to-end DevOps workflow using AWS, Terraform, ECS Fargate, ECR, ALB, and Jenkins.
The goal was to provision infrastructure as code, deploy containerized frontend and backend services, expose them via an Application Load Balancer, and validate production-ready behavior.
Architecture
Services Deployed:
Frontend: React app served via NGINX (ECS Fargate)
Backend: Node/Express API (ECS Fargate)
Container Registry: Amazon ECR
Load Balancing: Application Load Balancer (path-based routing)
Networking: Custom VPC with public/private subnets
Logging: CloudWatch Logs
Scaling: ECS Service Auto Scaling (CPU-based)
CI/CD Context: Jenkins workspace execution
Traffic Flow:
User
 → Application Load Balancer (HTTP :80)
   → /        → Frontend Target Group
   → /api*    → Backend Target Group
Infrastructure as Code
All infrastructure was provisioned using Terraform from the Jenkins workspace:
/var/lib/jenkins/workspace/devops-tech-challenge-pipeline/terraform
Key resources:
VPC, subnets, route tables, IGW
Security groups for ALB and ECS
ECS Cluster
ECS Task Definitions (frontend & backend)
ECS Services (Fargate)
Application Load Balancer
ALB listeners and listener rules
ECR repositories
CloudWatch Log Groups
Application Auto Scaling targets & policies
Deployment Steps (High Level)
Installed and verified AWS CLI on EC2
Confirmed IAM role credentials via EC2 metadata (no static keys)
Initialized Terraform in Jenkins workspace
Generated and applied Terraform plan
Resolved existing AWS resource conflicts
Deployed ECS cluster, services, and ALB
Validated health checks and service state
Verified live application endpoints
Issues Encountered & How They Were Resolved
1. Permission Denied / ResourceAlreadyExists Errors
Cause:
Some AWS resources (ALB, target groups, ECR repos, IAM roles) already existed from previous attempts.
Fix:
Deleted conflicting ALB and target groups manually
Re-ran terraform apply
Allowed Terraform to recreate resources cleanly
2. IAM AccessDenied for ECS, Logs, Auto Scaling
Cause:
EC2 instance was using an IAM role with incomplete permissions.
Fix:
Verified assumed role via:
aws sts get-caller-identity
Updated role permissions to allow:
ECS
ECR
CloudWatch Logs
Application Auto Scaling
3. Terraform State Not Found from ec2-user
Cause:
Terraform was executed as the jenkins user, not ec2-user.
Fix:
Always ran Terraform commands as Jenkins:
sudo -u jenkins -H bash -lc 'cd /var/lib/jenkins/workspace/... && terraform output'
4. Backend /api Returned 404
Cause:
ALB listener rule only matched /api/*, not /api.
Fix:
Added an additional ALB listener rule for /api
Verified both paths:
/api
/api/
5. SSH / PEM Confusion
Cause:
Tried to use local PEM file paths while already logged into EC2.
Fix:
SSH key is only required from local machine
No PEM file needed once inside the instance
Validation Results
ECS Services
aws ecs describe-services \
  --cluster devops-tech-challenge-cluster \
  --services devops-tech-challenge-frontend-svc devops-tech-challenge-backend-svc
Result:
Frontend: ACTIVE, 1 running task
Backend: ACTIVE, 1 running task
Live Endpoints
Frontend
http://devops-tech-challenge-alb-511576122.us-east-1.elb.amazonaws.com/
Backend
http://devops-tech-challenge-alb-511576122.us-east-1.elb.amazonaws.com/api/
HTTP Status Validation
curl http://<ALB_DNS>/
curl http://<ALB_DNS>/api
curl http://<ALB_DNS>/api/
All endpoints return HTTP 200 OK.
Terraform Outputs
alb_dns_name      = devops-tech-challenge-alb-511576122.us-east-1.elb.amazonaws.com
frontend_url      = http://devops-tech-challenge-alb-511576122.us-east-1.elb.amazonaws.com/
backend_url       = http://devops-tech-challenge-alb-511576122.us-east-1.elb.amazonaws.com/api/
frontend_repo_url = 471112532877.dkr.ecr.us-east-1.amazonaws.com/devops-tech-challenge-frontend
backend_repo_url  = 471112532877.dkr.ecr.us-east-1.amazonaws.com/devops-tech-challenge-backend
Key Takeaways
Demonstrated real-world Terraform troubleshooting
Validated IAM role-based authentication (no hard-coded credentials)
Implemented path-based ALB routing
Deployed scalable, production-ready ECS services
Proved full application availability end-to-end
