# Kiri - Property Management Ecosystem

## Project Overview

**Kiri** is a centralized platform designed for landlords to manage multiple properties and automate communication with tenants.  
The core philosophy is to minimize manual administrative overhead by integrating essential property management workflows, such as maintenance, legal documentation, scheduling, and utilities management directly into the application, reducing the need for external messaging.

The app focuses on keeping communication within its features, minimizing reliance on WhatsApp or manual chatting.

### Features Overview

- **User Access & Privacy**  
  Supports two types of users: Landlords (who manage multiple properties) and Tenants (residents). Each user has a secure, private account to ensure sensitive information like rental prices, personal contact details, or contracts is only visible to the involved parties.

- **Property Portfolio Management**  
  Landlords have a central "Dashboard" for an at-a-glance view of all their properties. For large portfolios, server-side pagination prevents interface overload.

- **Maintenance & Issue Tracking**  
  Tenants can report issues (e.g., "leaky sink") through maintenance tickets. Landlords track progress and mark repairs as "Fixed." Full property history, including renting and fix history, is available.

- **Data Control**  
  Landlords can add, update, or remove properties (deletion blocked if active contracts exist). Tenants can update personal contact information.

- **Instant Communication & Alerts**  
  Real-time notifications and chat system: landlords are notified immediately of new issues, tenants when repairs are updated, and both can chat in-app.

- **Scheduling**  
  Landlords initiate visit requests. Tenants propose available time intervals. Landlords confirm a slot to finalize scheduling without external messaging.

- **Contract Management**  
  Digital rental contracts can be generated and securely stored. Both parties receive notifications about contract expiration and renewal deadlines.

- **Utilities Management**  
  Landlords control all utility bills (water, electricity, gas). They can upload PDF invoices, parse totals per tenant, and send automated reminders. Tenants submit meter readings either manually or via simple OCR/copy-paste.

---

## High-Level Requirements (Features)

- **User Access & Privacy**  
  Landlord & Tenant roles with secure, private accounts.

- **Property Portfolio Management**  
  Central dashboard for landlords.  
  Server-side pagination for property lists.  
  Quick-view status for each property.

- **Maintenance & Issue Tracking**  
  Property history with renting and repair details.  
  Tenants can report issues.  
  Landlords track and resolve issues.

- **Real-Time Communication**  
  Integrated chat system with push notifications.

- **Scheduling**  
  Three-step visit request/confirmation system.

- **Contract & Billing Management**  
  Digital contracts stored securely.  
  Automated reminders for contract expirations and rent due dates.

- **Utilities Management**  
  Landlord uploads PDF invoices and parses total amounts due.  
  Automated notifications for tenants to pay utilities.  
  Tenants submit meter readings via manual input or OCR.

- **Security & Performance**  
  HTTPS for all communication.  
  Rate-limiting and input validation to prevent attacks.  
  Database indexing for performance.

---

## Low-Level Requirements (Detailed Specifications)

### 1. Identity and Access Management (IAM)

#### 1.1 User Registration & Security

1.1.1 User Data Fields  
1.1.1.1 Users must provide: unique Email, Password (min. 8 characters), First Name, Last Name.  
1.1.1.2 Role selection (Landlord or Tenant) is mandatory and immutable post-registration.

1.1.2 Password Storage  
1.1.2.1 Passwords must be hashed using **BCrypt**.  
1.1.2.2 Plain-text passwords must never be stored, logged, or transmitted unencrypted.

1.1.3 Authentication (JWT)  
1.1.3.1 Login generates JWT with `UserId`, `Email`, and `Role`.  
1.1.3.2 JWT expires after 60 minutes; Refresh Token valid for 7 days.

#### 1.2 Authorization & Privacy

1.2.1 Policy-Based Access Control  
1.2.1.1 Landlords can only access properties they own.  
1.2.1.2 Tenants can only access their assigned property.

1.2.2 Resource Protection  
1.2.2.1 Unauthorized resource access must return HTTP 403 Forbidden.

---

### 2. Property Portfolio Management

#### 2.1 Dashboard Implementation (Master View)

2.1.1 Pagination Logic  
2.1.1.1 API accepts `pageNumber` (start at 1) and `pageSize` (default 10, max 50).  
2.1.1.2 Response includes: `TotalItems`, `TotalPages`, and current page properties.

2.1.2 Property Fields  
2.1.2.1 Required fields: Full Address, City, Monthly Rent (>0), Occupancy Status.  
2.1.2.2 If `Occupied`, `TenantId` must be non-null.

#### 2.2 CRUD Operations

2.2.1 Data Integrity  
2.2.1.1 Landlords can create/update properties; deletion blocked if active contract exists.  
2.2.1.2 All input validated server-side.

---

### 3. Maintenance & Issue Tracking

#### 3.1 Ticket State Machine

3.1.1 Lifecycle Transitions  
3.1.1.1 Valid flow: `Open` → `In Progress` → `Resolved` → `Fixed`.  
3.1.1.2 Invalid transitions return HTTP 400 Bad Request.

3.1.2 User Interactions  
3.1.2.1 Tenants create tickets; landlords update status.  
3.1.2.2 All updates record precise `UpdatedAt` timestamps.  
3.1.2.3 Notifications sent immediately on ticket creation/status change.

---

### 4. Real-Time Communication

#### 4.1 Chat Logic

4.1.1 Message Persistence  
4.1.1.1 Messages include Sender, Receiver, Property, Content, Timestamp, ReadStatus.  
4.1.1.2 Stored in DB before transmission.

4.1.2 SignalR / WebSockets Integration  
4.1.2.1 Online recipients receive instant messages.  
4.1.2.2 Offline recipients receive stored notifications.

---

### 5. Scheduling System (Handshake)

5.1 Three-Step Implementation  
5.1.1 Landlord creates `VisitRequest` with a specific date.  
5.1.2 Tenant proposes 1+ intervals (≥30 min) on that date.  
5.1.3 Landlord confirms one interval; overlapping slots blocked.

---

### 6. Contract & Billing Management

#### 6.1 Legal Automation

6.1.1 PDF Generation  
6.1.1.1 DB fields mapped to standardized PDF template.  
6.1.1.2 Stored securely, outside public directories.

#### 6.2 Billing Reminders

6.2.1 Notification Logic  
6.2.1.1 Tenants receive daily notifications during payment interval until landlord confirms payment.  
6.2.1.2 Automated reminders sent 3 days before contract expiration or extension deadlines.

---

### 7. Utilities Management

7.1 PDF Invoice Handling  
7.1.1 Landlord can upload PDF invoices for utilities.  
7.1.2 System parses total amounts per tenant using text parsing or OCR.  
7.1.3 Total amount due per tenant is stored in DB and associated with the billing month.

7.2 Meter Reading Management  
7.2.1 Landlord can send reminders to tenants to submit meter readings.  
7.2.2 Tenants submit readings via manual input or copy-paste/OCR from meter images.  
7.2.3 System validates readings for correct format and stores them per tenant/property.

7.3 Utility Payment Reminders  
7.3.1 System generates automated notifications for tenants to pay utilities based on invoice totals and submitted readings.  
7.3.2 Landlord can view monthly totals and payment status per tenant.

---

### 8. Technical Constraints

#### 8.1 Security

8.1.1 All traffic via HTTPS.  
8.1.2 Input validated server-side.  
8.1.3 Rate-limiting: 5 login attempts per minute per IP.  
8.1.4 JWT secret keys in environment variables only.  
8.1.5 Sensitive documents stored securely.

#### 8.2 Performance & Reliability

8.2.1 Database indexes on Email, LandlordId, PropertyId.  
8.2.2 ORM used with foreign key integrity.  
8.2.3 API endpoints and DB queries optimized for speed.

---

### 9. Notifications System

9.1 Generated for events:  
9.1.1 New maintenance ticket  
9.1.2 Ticket status update  
9.1.3 Offline chat message  
9.1.4 Visit confirmation  
9.1.5 Contract expiration reminder  
9.1.6 Rent due reminder  
9.1.7 Utility payment due reminder  
9.1.8 Meter reading submission reminder

9.2 Notifications stored with read/unread status; users can mark as read.
