# FraudShield AI - Database Design

## 1. Database Choice

FraudShield AI will use **PostgreSQL** as the primary database.

PostgreSQL was selected because:

- It is widely used in production systems.
- It provides strong data consistency, which is important for financial transaction records.
- It supports complex queries needed for dashboards and analytics.
- It works well with backend frameworks such as FastAPI.

A relational database is suitable because the system contains structured data with clear relationships between users, transactions, predictions, and investigations.

---

# 2. Database Design Approach

The database is designed around the core workflow:

```
Dataset Upload
        ↓
Transactions
        ↓
Fraud Prediction
        ↓
Explainability (SHAP)
        ↓
Human Investigation
```

The design focuses on:

- Keeping the MVP simple.
- Maintaining traceability from transaction to prediction.
- Supporting future model improvements through model version tracking.

---

# 3. Tables

## Users

Stores users who access the platform.

| Field | Description |
|---|---|
| id (PK) | Unique user identifier |
| name | User name |
| email | Login email |
| password_hash | Encrypted password |
| role | Admin or Analyst |
| created_at | Account creation date |

---

## Datasets

Stores uploaded transaction datasets.

Examples:
- PaySim
- UCI Credit Card Fraud Dataset

| Field | Description |
|---|---|
| id (PK) | Dataset identifier |
| name | Dataset name |
| source | Dataset source |
| file_name | Uploaded file name |
| total_records | Number of transactions |
| uploaded_by (FK) | User who uploaded |
| uploaded_at | Upload date |

Relationship:

```
Users 1 ---- Many Datasets
```

---

## Transactions

Stores individual transaction records.

| Field | Description |
|---|---|
| id (PK) | Transaction identifier |
| dataset_id (FK) | Source dataset |
| transaction_reference | Transaction ID |
| amount | Transaction amount |
| transaction_type | Transfer/Cash-out |
| old_balance | Previous balance |
| new_balance | Updated balance |
| time_step | Transaction timestamp |

Relationship:

```
Dataset 1 ---- Many Transactions
```

---

## Fraud Predictions

Stores machine learning model results.

Predictions are separated from transactions because models can change over time.

| Field | Description |
|---|---|
| id (PK) | Prediction identifier |
| transaction_id (FK) | Related transaction |
| model_name | Model used |
| model_version | Model version |
| risk_score | Fraud probability |
| prediction | Fraud/Legitimate |
| created_at | Prediction date |

Relationship:

```
Transaction 1 ---- Many Predictions
```

---

## Explanations

Stores SHAP explainability results.

| Field | Description |
|---|---|
| id (PK) | Explanation identifier |
| prediction_id (FK) | Related prediction |
| feature_name | Feature contributing to prediction |
| feature_value | Feature value |
| shap_value | Impact on prediction |

Example:

```
Feature: amount
SHAP value: +0.35
```

---

## Fairness Results

Stores fairness evaluation metrics.

This supports evaluating model performance across transaction groups.

Example groups:

- TRANSFER
- CASH_OUT

| Field | Description |
|---|---|
| id (PK) | Result identifier |
| model_name | Model evaluated |
| dataset | Dataset used |
| group_variable | Group analysed |
| metric_name | SPD/EOD/FPR |
| metric_value | Metric result |

---

## Investigations

Stores analyst review decisions.

| Field | Description |
|---|---|
| id (PK) | Investigation identifier |
| transaction_id (FK) | Transaction reviewed |
| assigned_to (FK) | Analyst |
| status | Pending/Fraud/False Positive |
| notes | Analyst comments |
| created_at | Date created |

Relationship:

```
Transaction 1 ---- Many Investigations
```

---

## Audit Logs

Stores important user actions.

| Field | Description |
|---|---|
| id (PK) | Log identifier |
| user_id (FK) | User performing action |
| action | Action performed |
| created_at | Timestamp |

---

# 4. Database Relationships

```
Users
 |
 |
Datasets
 |
 |
Transactions
 |
 |----------------|
 |                |
Predictions   Investigations
 |
 |
Explanations


Predictions
 |
 |
Fairness Results
```

---

# 5. Background Processing Flow

The application will process uploaded files asynchronously.

Flow:

```
User uploads CSV
        ↓
Dataset record created
        ↓
Background worker processes file
        ↓
Transactions stored
        ↓
Fraud model generates predictions
        ↓
SHAP explanations generated
        ↓
Dashboard displays results
```
