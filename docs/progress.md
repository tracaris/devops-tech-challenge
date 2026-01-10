### AWS access key rotation
- Rotated AWS access keys for terraform-admin IAM user
- Updated local AWS CLI credentials using `aws configure`
- Verified new credentials with `aws sts get-caller-identity`
- Configured AWS CLI locally using `aws configure` (region us-east-1, output json)
- Verified credentials using `aws sts get-caller-identity`
### Step 3.1: AWS IAM + CLI setup
- Created IAM user `terraform-admin`
- Attached AdministratorAccess policy
- Generated access keys for CLI usage
- Configured AWS CLI locally using `aws configure`
- Verified authentication using `aws sts get-caller-identity`
## Task 3 — Terraform + ECS (In Progress)

### Step 3.1: Terraform project setup
- Created Terraform directory structure (ecr, ecs, network, envs/dev)
- Added AWS provider configuration
- Defined base variables for region and project naming
- No infrastructure applied yet (setup only)
- Fixed typo: renamed docker-compose.ymlx to docker-compose.yml
### Task 2 Complete — Dockerized frontend + backend
- Backend image: devops-backend:local (node:16-alpine), exposed on 8080
- Frontend image: devops-frontend:local (multi-stage build, served by nginx), exposed on 3000
- Added docker-compose.yml to run both services with `docker compose up --build`
- Verified browser shows SUCCESS + GUID on http://localhost:3000
- Cleaned up with `docker compose down`
### Step 6: Frontend container verification
- Confirmed nginx serves React build on http://localhost:3000 (HTTP 200)
- Verified frontend displays SUCCESS + GUID and calls backend successfully
### Step 6: Frontend container run
- Ran container: docker run --rm -p 3000:80 --name devops-frontend devops-frontend:local
- Verified frontend accessible at http://localhost:3000
- Confirmed frontend displays SUCCESS + GUID (backend connectivity)
- Verified with curl http://localhost:8080 returning HTTP 200 + JSON id
### Step 5: Backend running in Docker
- Started backend container from image devops-backend:local
- Exposed port 8080 to host (docker run -p 8080:8080)
- Backend logs confirm service started successfully on 8080
### Step 4: Port 8080 conflict resolved
- Found process using port 8080 with `lsof -i :8080` (node PID 66020)
- Killed process to free port using `kill -9 66020`
- Confirmed port free (no output from lsof)

### Step 5: Backend container running
- Started container: devops-backend:local
- Exposed port 8080 and verified with curl (HTTP 200 + JSON id)
### Port 8080 conflict resolution
- Docker container failed to start due to port 8080 already in use
- Identified running Node process using lsof
- Stopped local backend process to free port
### Docker Hub auth issue
- Encountered Docker build failure pulling base image node:16-alpine
- Error: 401 Unauthorized — Docker Hub requires email verification
- Fix: Verify Docker Hub email and re-authenticate Docker Desktop, then retry build
- Fix: Docker build failed because file was named Dockerfilex; renamed to Dockerfile
## Task 1 — Local run baseline
**Date:** 2026-01-07 (ET)

### Step 1–3: Setup + imported challenge code
- Initialized repo structure (docs/, screenshots/)
- Imported challenge repo code (frontend/ + backend/)
- Ready to run backend locally

### Step 2: Backend Dockerfile creation
- Created backend/Dockerfile using node:16-alpine
- Configured container to install dependencies and expose port 8080
### Step 2: Backend Dockerfile creation (retry)
- Initial docker build failed because Dockerfile did not exist
- Created backend/Dockerfile with Node 16 base image
- Verified Dockerfile present in backend directory

### Step 3: Backend Docker image build
- Successfully built image devops-backend:local from backend/Dockerfile


