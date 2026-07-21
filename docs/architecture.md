# FraudShield AI - System Architecture

## 1. Architecture Overview

FraudShield AI follows a full-stack architecture consisting of:

- Frontend application
- Backend API
- Database
- Background processing system
- Machine learning pipeline

The architecture is designed to support transaction uploads, fraud prediction, explainability, and analyst investigation workflows.

---

# 2. High-Level Architecture

```
                    User
                      |
                      |
              React Frontend
                      |
                      |
              FastAPI Backend
                      |
        --------------------------------
        |              |               |
   PostgreSQL      Redis Queue      Cloud Storage
                       |
                       |
              Background Worker
                       |
                       |
             Fraud Detection Pipeline
                       |
        --------------------------------
        |              |               |
     Model          SHAP          Fairness
   Prediction   Explanation     Evaluation
```

---

# 3. Frontend

## Technology

- React / Next.js
- TypeScript
- Tailwind CSS

## Responsibilities

The frontend provides the user interface for:

- Authentication
- Dashboard analytics
- Transaction viewing
- Dataset upload
- Investigation workflow
- Fraud explanation display

The frontend communicates with the backend through REST APIs.

---

# 4. Backend API

## Technology

- FastAPI (Python)

## Responsibilities

The backend handles:

- Authentication
- User management
- Transaction APIs
- Dataset uploads
- Fraud prediction requests
- Investigation management
- Database communication

The backend acts as the main communication layer between the frontend, database, and machine learning pipeline.

---

# 5. Database

## Technology

- PostgreSQL

## Responsibilities

Stores:

- Users
- Datasets
- Transactions
- Fraud predictions
- SHAP explanations
- Fairness results
- Investigations
- Audit logs

The database provides reliable storage for transaction history and model results.

---

# 6. Background Processing

## Technology

- Redis
- Celery

## Purpose

Fraud analysis can be computationally expensive, especially when processing large transaction files.

Instead of blocking the API request, uploaded files are processed asynchronously.

Workflow:

```
User uploads CSV
        |
        ↓
FastAPI receives file
        |
        ↓
Job added to Redis queue
        |
        ↓
Celery worker processes data
        |
        ↓
Model generates predictions
        |
        ↓
Results stored in PostgreSQL
```

---

# 7. Machine Learning Pipeline

The ML pipeline is responsible for fraud detection.

## Components

### Data Processing

Responsibilities:

- Validate uploaded data.
- Clean transaction records.
- Apply preprocessing.

---

### Fraud Detection Model

Initial models:

- Logistic Regression
- Random Forest
- XGBoost

The system stores:

- Model name
- Model version
- Prediction score
- Prediction result

---

### Explainability Layer

Technology:

- SHAP

Purpose:

Provide transparency into model decisions.

Example:

```
Risk Score: 92%

Reasons:

Transaction amount: +0.35
Transaction type: +0.20
Balance change: +0.15
```

This helps analysts understand why a transaction was flagged.

---

### Fairness Evaluation

The system evaluates whether model performance differs across transaction groups.

Metrics:

- False Positive Rate
- Equal Opportunity Difference
- Statistical Parity Difference

Initial grouping:

- TRANSFER
- CASH_OUT

---

# 8. File Storage

Large uploaded files should not be stored directly inside PostgreSQL.

Possible storage:

- AWS S3
- Google Cloud Storage

The database stores:

- File name
- File location
- Upload information

---

# 9. Deployment Architecture

Initial deployment:

```
Frontend
   |
   |
Cloud Platform

Backend API
   |
   |
PostgreSQL Database

Background Worker
   |
   |
Redis
```

Possible cloud providers:

- AWS
- Google Cloud Platform

---

# 10. Future Improvements

Potential improvements:

- Real-time transaction monitoring.
- Streaming fraud detection.
- Model retraining pipeline.
- Feature store.
- More advanced monitoring.
- Third-party payment integrations.