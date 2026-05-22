# HGU Media Analytics Platform (POC)

## Overview
This repository contains a **proof-of-concept analytics platform** for HGU that centralizes paid media performance data across advertising platforms into a **single, standardized data model**.

The goal of this POC is to demonstrate:
- scalable ingestion of platform data
- consistent, cross-platform metrics
- production-minded modeling practices
- a clear path to agency-wide rollout

---

## High-Level Architecture

Media Platform APIs
↓
Fivetran Connectors
↓
Fivetran Quickstart dbt Models (platform-specific logic)
↓
HGU dbt Cloud Project
↓
Canonical Paid Media Marts
↓
BI / Reporting / Future Advanced Analytics


### Key Design Principles
- **Vendor-managed complexity upstream** (Fivetran handles API + platform logic)
- **LERMA-owned canonical models downstream**
- **Single source of truth** for cross-platform reporting
- **Designed for scale**, even when scoped to a single client for POC

---

## Current State (What Exists Today)

### Ingested Platforms
- Google Ads
- Reddit Ads

### Canonical Mart
**`mart_paid_media__campaign_daily`**

- **Grain:**  
  `date_day × platform × platform_account × campaign`

- **Purpose:**  
  A standardized, cross-platform daily performance table intended to power:
  - executive reporting
  - client performance dashboards
  - future optimization and forecasting use cases

### Core Metrics
- impressions  
- clicks  
- cost  
- conversions  
- view_through_conversions (when available)

### Data Quality
- dbt tests enforce:
  - non-null keys
  - accepted platform values
  - grain consistency (unique combinations)

---

## Why Quickstart Models Are Used
Fivetran Quickstart dbt models are treated as **trusted upstream facts**. They:
- encode correct platform-specific joins
- follow API semantics
- reduce custom transformation complexity

HGU dbt models focus on **normalization, cross-platform consistency, and business logic**, not reimplementing vendor logic.

---

## Future Enhancements / TODOs

### Platform Expansion
Planned additions follow the same pattern:
1. Enable Fivetran connector  
2. Enable Quickstart dbt models  
3. Add staging model  
4. Union into canonical mart  

Planned platforms:
- Facebook / Meta Ads
- Snapchat Ads
- TikTok Ads
- YouTube / Google Video
- LinkedIn Ads (if applicable)

---

### Modeling Enhancements
- Add **weekly and monthly rollup marts**
- Introduce **client mapping dimension** (`dim_client`)
- Add **budget + pacing models**
- Add **normalized conversion definitions** (e.g. `total_conversions`)
- Support **multi-currency normalization** if needed

---

### Advanced Use Cases (Post-POC)
- Performance anomaly detection
- Budget pacing alerts
- Forecasting and scenario modeling
- Cross-platform creative analysis
- AI-assisted performance insights

---

## Scaling Notes
- Current POC is scoped to a **single client (HGU)** for cost and risk control
- Platform is designed to ingest **all client accounts** via configuration change
- No model refactors required to scale scope — only additional data volume

---

## Status
**Proof of Concept – Production-Ready Architecture**
