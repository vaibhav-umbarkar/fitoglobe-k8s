# Fitoglobe — Kubernetes Deployment

This directory contains the Kubernetes manifests used to deploy the **Fitoglobe** full-stack application.

The application consists of:

- React frontend
- Node.js/Express backend
- PostgreSQL database

The application is containerized using Docker and deployed on a Kubernetes cluster.

## Architecture

```text
                         ┌──────────────────┐
                         │     Ingress      │
                         │  HTTP Routing    │
                         └────────┬─────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
             ┌──────▼──────┐             ┌──────▼──────┐
             │  Frontend   │             │   Backend   │
             │ Deployment  │             │ Deployment  │
             └──────┬──────┘             └──────┬──────┘
                    │                           │
             Frontend Service             Backend Service
                                                │
                                         ┌──────▼──────┐
                                         │ PostgreSQL  │
                                         │ StatefulSet │
                                         └──────┬──────┘
                                                │
                                         ┌──────▼──────┐
                                         │     PVC     │
                                         │ Persistent  │
                                         │   Storage   │
                                         └─────────────┘
```

## Kubernetes Resources

### Namespace

```text
namespace.yml
```

Creates an isolated Kubernetes namespace for the application.

### Backend

```text
backend/
├── configmap.yml
├── deployment.yml
├── secret.yml
└── service.yml
```

The backend is deployed using a Kubernetes Deployment and exposed internally through a Service.

Configuration values are managed using a ConfigMap, while sensitive credentials are stored using Kubernetes Secrets.

### Frontend

```text
frontend/
├── deployment.yml
└── service.yml
```

The React frontend is deployed using a Kubernetes Deployment and exposed through a Kubernetes Service.

### PostgreSQL

```text
postgres/
├── pvc.yml
├── secret.yml
├── service.yml
└── statefulset.yml
```

PostgreSQL is deployed using a StatefulSet because the database requires stable identity and persistent storage.

A PersistentVolumeClaim (PVC) is used to persist PostgreSQL data beyond the lifecycle of individual pods.

### Ingress

```text
ingress.yml
```

The Ingress resource provides HTTP routing to the application services.

## Project Structure

```text
k8s/
├── namespace.yml
├── ingress.yml
│
├── backend/
│   ├── configmap.yml
│   ├── deployment.yml
│   ├── secret.yml
│   └── service.yml
│
├── frontend/
│   ├── deployment.yml
│   └── service.yml
│
└── postgres/
    ├── pvc.yml
    ├── secret.yml
    ├── service.yml
    └── statefulset.yml
```

## Prerequisites

Make sure the following are installed and configured:

- Docker
- Kubernetes cluster
- kubectl
- Ingress Controller

For local development, the manifests can be tested using tools such as Kind or Minikube.

## Deployment

### 1. Create the namespace

```bash
kubectl apply -f namespace.yml
```

### 2. Deploy PostgreSQL

```bash
kubectl apply -f postgres/
```

### 3. Deploy the backend

```bash
kubectl apply -f backend/
```

### 4. Deploy the frontend

```bash
kubectl apply -f frontend/
```

### 5. Configure Ingress

```bash
kubectl apply -f ingress.yml
```

## Verify the Deployment

Check the namespace:

```bash
kubectl get namespaces
```

Check all application resources:

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

Check PostgreSQL StatefulSet:

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

## Useful Debugging Commands

View pod details:

```bash
kubectl describe pod <pod-name> -n fitoglobe
```

View application logs:

```bash
kubectl logs <pod-name> -n fitoglobe
```

Follow logs:

```bash
kubectl logs -f <pod-name> -n fitoglobe
```

Check Deployment status:

```bash
kubectl rollout status deployment/<deployment-name> -n fitoglobe
```

Restart a Deployment:

```bash
kubectl rollout restart deployment/<deployment-name> -n fitoglobe
```

## Cleanup

To remove the Kubernetes deployment:

```bash
kubectl delete -f ingress.yml
kubectl delete -f frontend/
kubectl delete -f backend/
kubectl delete -f postgres/
kubectl delete -f namespace.yml
```

Alternatively, deleting the namespace removes the resources inside it:

```bash
kubectl delete namespace fitoglobe
```

## Technologies

- Docker
- Kubernetes
- React
- Node.js
- Express.js
- PostgreSQL
- Prisma
- Kubernetes Ingress
- Kubernetes StatefulSet
- Kubernetes ConfigMap
- Kubernetes Secrets
- PersistentVolumeClaim

## Learning Objectives

This deployment demonstrates practical experience with:

- Containerized application deployment
- Kubernetes Deployments
- Kubernetes Services
- Kubernetes Ingress
- StatefulSets
- Persistent storage using PVC
- ConfigMaps and Secrets
- Kubernetes namespaces
- Application debugging using kubectl
- Multi-tier application deployment
