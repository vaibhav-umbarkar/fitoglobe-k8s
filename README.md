# Fitoglobe — Full-Stack Application on Kubernetes

A containerized full-stack fitness application deployed on Kubernetes using Docker, Kubernetes Deployments, Services, Ingress, StatefulSets, ConfigMaps, Secrets, and persistent storage.

This project demonstrates practical experience with containerization, Kubernetes orchestration, service discovery, persistent storage, application configuration, and multi-tier application deployment.

---

## 🔍 Project Overview

Fitoglobe is a full-stack fitness application consisting of a React frontend, Node.js/Express backend, and PostgreSQL database.

The application is containerized using Docker and deployed on a Kubernetes cluster.

The project demonstrates:

- Containerized application deployment
- Kubernetes workload management
- Service-to-service communication
- Kubernetes Ingress routing
- PostgreSQL stateful deployment
- Persistent database storage
- Configuration management
- Secret management
- Kubernetes application debugging

---

## 🏗️ Architecture

```text
                         ┌─────────────────────┐
                         │       Client        │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │      Ingress        │
                         │   HTTP Routing      │
                         └──────────┬──────────┘
                                    │
                   ┌────────────────┴────────────────┐
                   │                                 │
                   ▼                                 ▼
          ┌─────────────────┐               ┌─────────────────┐
          │    Frontend     │               │     Backend     │
          │   Deployment    │               │   Deployment    │
          │     React       │               │ Node.js/Express │
          └────────┬────────┘               └────────┬────────┘
                   │                                 │
                   ▼                                 ▼
          ┌─────────────────┐               ┌─────────────────┐
          │ Frontend Service│               │ Backend Service │
          └─────────────────┘               └────────┬────────┘
                                                     │
                                                     ▼
                                            ┌─────────────────┐
                                            │   PostgreSQL    │
                                            │   StatefulSet   │
                                            └────────┬────────┘
                                                     │
                                                     ▼
                                            ┌─────────────────┐
                                            │      PVC        │
                                            │ Persistent Data │
                                            └─────────────────┘
```

---

## ⚙️ Kubernetes Infrastructure

### Namespace

A dedicated Kubernetes namespace is used to isolate the Fitoglobe application resources.

```text
k8s/namespace.yml
```

### Frontend

The React frontend is deployed using:

- Kubernetes Deployment
- Kubernetes Service

```text
k8s/frontend/
├── deployment.yml
└── service.yml
```

Responsibilities:

- Run the React application container
- Manage frontend pod replicas
- Provide internal Kubernetes networking

### Backend

The Node.js/Express backend is deployed using:

- Kubernetes Deployment
- Kubernetes Service
- ConfigMap
- Secret

```text
k8s/backend/
├── configmap.yml
├── deployment.yml
├── secret.yml
└── service.yml
```

Responsibilities:

- Run backend application containers
- Manage backend replicas
- Provide service discovery
- Manage application configuration
- Handle sensitive configuration through Kubernetes Secrets

### PostgreSQL

PostgreSQL is deployed using:

- StatefulSet
- Service
- PersistentVolumeClaim
- Secret

```text
k8s/postgres/
├── pvc.yml
├── secret.yml
├── service.yml
└── statefulset.yml
```

The StatefulSet provides stable database identity, while the PersistentVolumeClaim provides persistent storage for PostgreSQL data.

### Ingress

The application uses Kubernetes Ingress for HTTP routing.

```text
k8s/ingress.yml
```

Ingress provides a single entry point for accessing the application and routes incoming requests to the appropriate Kubernetes Service.

---

## 🔄 Application Deployment Workflow

1. Application source code is maintained in GitHub.
2. Frontend and backend applications are containerized using Docker.
3. Docker images are built for the application components.
4. Images are made available to the Kubernetes cluster.
5. Kubernetes namespace is created.
6. PostgreSQL StatefulSet and persistent storage are deployed.
7. Backend Deployment and Service are deployed.
8. Frontend Deployment and Service are deployed.
9. Ingress is configured for application routing.
10. Kubernetes manages the application workloads and networking.
11. PostgreSQL data is persisted using a PersistentVolumeClaim.

---

## 💾 Persistent Storage

PostgreSQL uses Kubernetes persistent storage to prevent database data from being lost when the PostgreSQL pod is recreated.

```text
PostgreSQL StatefulSet
        │
        ▼
PersistentVolumeClaim
        │
        ▼
Persistent Storage
```

This demonstrates the difference between stateless application workloads and stateful database workloads in Kubernetes.

---

## 🔐 Configuration & Security

The application uses Kubernetes configuration resources to separate configuration from application images.

### ConfigMap

Used for non-sensitive application configuration.

```text
k8s/backend/configmap.yml
```

### Secrets

Used for sensitive values such as database credentials and other protected configuration.

```text
k8s/backend/secret.yml
k8s/postgres/secret.yml
```

> Secrets committed to a Git repository should be handled carefully. For production environments, use a proper secret-management solution instead of storing real credentials in Git.

---

## 🚀 Kubernetes Deployment

### Create Namespace

```bash
kubectl apply -f k8s/namespace.yml
```

### Deploy PostgreSQL

```bash
kubectl apply -f k8s/postgres/
```

### Deploy Backend

```bash
kubectl apply -f k8s/backend/
```

### Deploy Frontend

```bash
kubectl apply -f k8s/frontend/
```

### Deploy Ingress

```bash
kubectl apply -f k8s/ingress.yml
```

---

## 🔎 Verify Deployment

Check all resources:

```bash
kubectl get all -n fitoglobe
```

Check pods:

```bash
kubectl get pods -n fitoglobe
```

Check services:

```bash
kubectl get svc -n fitoglobe
```

Check deployments:

```bash
kubectl get deployments -n fitoglobe
```

Check StatefulSet:

```bash
kubectl get statefulset -n fitoglobe
```

Check persistent storage:

```bash
kubectl get pvc -n fitoglobe
```

Check Ingress:

```bash
kubectl get ingress -n fitoglobe
```

---

## 🛠️ Troubleshooting

View pod logs:

```bash
kubectl logs <pod-name> -n fitoglobe
```

Follow pod logs:

```bash
kubectl logs -f <pod-name> -n fitoglobe
```

Describe a pod:

```bash
kubectl describe pod <pod-name> -n fitoglobe
```

Check Deployment rollout:

```bash
kubectl rollout status deployment/<deployment-name> -n fitoglobe
```

Restart a Deployment:

```bash
kubectl rollout restart deployment/<deployment-name> -n fitoglobe
```

Check events:

```bash
kubectl get events -n fitoglobe
```

---

## 🐳 Docker Components

- Docker Engine
- Docker Images
- Docker Containers
- Dockerfiles
- Docker Compose

Frontend and backend services have their own Dockerfiles.

```text
frontend/Dockerfile
backend/Dockerfile
```

---

## ☸️ Kubernetes Components

- Kubernetes Namespace
- Deployments
- Services
- Ingress
- StatefulSet
- PersistentVolumeClaim
- ConfigMap
- Secrets
- Pods
- Kubernetes Service Discovery

---

## 🛠️ Technology Stack

### Application

- React
- Node.js
- Express.js
- Prisma
- PostgreSQL

### DevOps

- Docker
- Kubernetes
- kubectl
- Kubernetes Ingress

### Source Control

- Git
- GitHub

### Configuration

- YAML
- Environment Variables

### Operating System

- Linux

---

## 📂 Project Structure

```text
.
├── backend/
│   ├── Dockerfile
│   ├── README.md
│   ├── package.json
│   ├── prisma/
│   └── src/
│
├── frontend/
│   ├── Dockerfile
│   ├── README.md
│   ├── package.json
│   ├── public/
│   └── src/
│
├── compose.yml
│
├── k8s/
│   ├── namespace.yml
│   ├── ingress.yml
│   │
│   ├── backend/
│   │   ├── configmap.yml
│   │   ├── deployment.yml
│   │   ├── secret.yml
│   │   └── service.yml
│   │
│   ├── frontend/
│   │   ├── deployment.yml
│   │   └── service.yml
│   │
│   └── postgres/
│       ├── pvc.yml
│       ├── secret.yml
│       ├── service.yml
│       └── statefulset.yml
│
└── README.md
```

---

## 📚 Learning Outcomes

This project demonstrates practical understanding of:

- Docker containerization
- Kubernetes architecture
- Kubernetes Deployments
- Kubernetes Services
- Kubernetes Ingress
- StatefulSets
- PersistentVolumeClaims
- ConfigMaps
- Kubernetes Secrets
- Kubernetes namespaces
- Service discovery
- Containerized database deployment
- Kubernetes troubleshooting
- Multi-tier application architecture

---

## 🎯 Project Highlights

- Full-stack application containerization
- React frontend deployment on Kubernetes
- Node.js backend deployment on Kubernetes
- PostgreSQL StatefulSet
- Persistent database storage
- Kubernetes Service-based communication
- Ingress-based HTTP routing
- ConfigMap-based configuration
- Secret-based sensitive configuration
- Docker Compose support for local development
- Kubernetes-based application orchestration

---

## 🔮 Future Improvements

The project can be extended with additional DevOps and Kubernetes capabilities:

- Helm Charts
- Horizontal Pod Autoscaler (HPA)
- Kubernetes resource requests and limits
- Liveness and readiness probes
- GitHub Actions CI/CD
- Container image scanning
- Prometheus and Grafana monitoring
- Centralized logging
- TLS/HTTPS with cert-manager
- External Secrets Management
- Terraform-based AWS infrastructure
- Kubernetes deployment to Amazon EKS

---

## 👤 Author

**Vaibhav Umbarkar**

DevOps Engineer | AWS | Kubernetes | Docker | Terraform | Jenkins | CI/CD
