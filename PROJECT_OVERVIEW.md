# 9th INTER IIIT SPORTS MEET 2026
## Digital Registration & Management System

==================================================
## 1. EXECUTIVE OVERVIEW
==================================================

The 9th Inter-IIIT Sports Meet Digital Registration System is a centralized, secure web application designed to streamline the participant registration process for all participating IIITs. It replaces the traditional, manual, spreadsheet-based registration processes with a unified online platform. 

The system solves the problem of enforcing complex, overlapping sports participation rules (such as per-student event limits, gender constraints, and overall squad sizes) by providing real-time, automated validation. IIIT coordinators use the platform to assemble their rosters and event entries, ensuring that any submitted registration is 100% compliant with the official rulebook before it reaches the tournament administration. For event administrators, it provides a centralized, instantly accessible database of all registered participants, complete with filtering and export capabilities.

==================================================
## 2. SYSTEM USERS
==================================================

The system strictly supports two distinct user roles:

### IIIT Coordinator / IIIT Account
Each participating IIIT is provided with a single, pre-provisioned account. The IIIT Coordinator logs in to build, review, and finalize their institute's sports registration. 
- **Capabilities:** They can add students, assign them to sports and events, view live validation feedback, save drafts, and submit their final registration. They can also view and export their own finalized registration.
- **Restrictions:** They cannot view, edit, or access any registration data belonging to other IIITs. Once they finalize and submit their registration, their account is locked from making any further modifications.

### Administrator
The tournament administration has a dedicated master account to oversee the entire event.
- **Capabilities:** The administrator can view a consolidated dashboard of all submitted registrations, track the number of participating IIITs and students, filter the global participant list by sport, event, or gender, search for specific students, and export filtered data to CSV.
- **Restrictions:** The administrator operates in a read-only capacity regarding the registration data itself; they cannot create, edit, or submit registrations on behalf of IIITs. 

==================================================
## 3. COMPLETE SYSTEM WORKFLOW
==================================================

The system operates on two primary workflows based on the user's role:

**IIIT Coordinator Workflow**
IIIT Login
↓
Registration Form (Drafts saved locally)
↓
Automatic Validation (Real-time rule checking)
↓
Review (Pre-submission summary)
↓
Final Submission (Database transaction)
↓
Permanent Lock (No further edits allowed)
↓
CSV Export (Download submitted data)

**Administrator Workflow**
Admin Login
↓
Dashboard
↓
Overview (High-level statistics)
↓
Registration Data (Global participant list)
↓
Filters (Filter by IIIT, sport, event, etc.)
↓
CSV Export (Download filtered data)

==================================================
## 4. COMPLETE FEATURE LIST
==================================================

The following user-facing features are fully implemented in the current system:

- **Authentication:** Secure login for pre-provisioned accounts using password hashing.
- **Role-Based Access Control:** Distinct interfaces and data access policies for IIIT and Administrator accounts.
- **Data Isolation:** Cryptographic and logical separation of IIIT registration data.
- **Registration Form:** A comprehensive form to enter student details and assign them to various sports and events.
- **Event-wise Participant Entry:** Capability to specify main participants and reserves for team and individual events.
- **Live Validation & Constraint Feedback:** Instant, real-time warnings when a rule (e.g., maximum students, gender mismatch) is violated.
- **Draft Persistence:** Unfinished registrations are automatically saved in the browser, surviving page refreshes or accidental closures.
- **Review Before Submission:** A dedicated review screen summarizing all entered students and rule compliance before finalizing.
- **Final Submission:** Atomic saving of the entire registration to the central database.
- **Permanent Locking:** Once submitted, the system locks the IIIT's registration form permanently, converting it to a read-only view.
- **Own Registration Viewing:** IIIT coordinators can review their locked submission at any time.
- **CSV Export (IIIT):** IIIT coordinators can export their finalized participant roster and entries to a CSV file.
- **Admin Dashboard & Statistics:** A high-level overview showing total submitted IIITs, unique students, and total event entries.
- **Registration Data Viewing:** A comprehensive, paginated view of all submitted participants across all IIITs.
- **Server-Side Filtering:** Advanced filtering capabilities for the admin, including filtering by specific IIIT, sport, event, and gender.
- **Search:** Admin capability to search the entire database by student name or roll number.
- **Filtered CSV Export (Admin):** Administrators can export the currently filtered view (or the entire dataset) to a CSV file.
- **Secure Logout:** Complete session termination for all user types.

==================================================
## 5. REGISTRATION BUSINESS RULES
==================================================

The system automatically enforces the official Inter-IIIT Sports Meet rulebook. No registration can be submitted if it violates any of the following business rules:

- **Maximum Unique Students:** A maximum of 150 unique students can be registered per IIIT.
- **Student Identity & Normalization:** A student is uniquely identified by their Roll Number. The same roll number registered across multiple events is correctly counted as a single unique student. Roll numbers and names are automatically normalized (trimmed and capitalized) to prevent accidental duplicates.
- **Duplicate/Conflicting Entry Prevention:** The system prevents the same student from being entered multiple times into the exact same event. It also rejects conflicting information for the same roll number.
- **Event Participant Limits:** Every sport and event enforces strict squad size limits (e.g., maximum mains and maximum reserves).
- **Athletics Individual Limit:** A student can participate in a maximum of 3 individual Athletics events (excluding relay events).
- **Aquatics Individual Limit:** A student can participate in a maximum of 3 individual Aquatics (swimming) events (excluding relay events).
- **Normal-Sport Limit:** A student can participate in a maximum of 2 "normal" sports. 
- **Athletics/Aquatics Exception:** Athletics and Aquatics are exempt from the "normal-sport" limit, meaning a student can participate in up to 2 normal sports *plus* Athletics and/or Aquatics.
- **Gender Restrictions:** Male students can only be registered for Men's events (M); Female students can only be registered for Women's events (F).
- **Combined/Mixed Gender Behavior:** Sports explicitly designated as mixed (such as Chess) accept both male and female participants into the same squad limit without gender mismatches.
- **No Minimum Sports Requirement:** There is no minimum number of sports an IIIT must participate in to submit a valid registration.

==================================================
## 6. DATA & SUBMISSION BEHAVIOR
==================================================

The system employs a specific data handling strategy to ensure data integrity and prevent partial or accidental submissions:

- **Browser-Based Drafts:** While an IIIT is actively filling out the registration, all data (drafts) is retained locally in their browser's storage. This ensures drafts survive browser refreshes, closures, and network interruptions.
- **Drafts are NOT Submissions:** Data held in a draft state is entirely invisible to the administration and is not treated as a submitted registration.
- **Centralized Final Submission:** Only when the IIIT coordinator explicitly triggers a "Final Submission" is the data transmitted, validated server-side, and saved to the central database.
- **Permanent Lock Mechanism:** A successful final submission immediately and permanently locks the registration for that IIIT. The user interface converts to a read-only mode.
- **Immutability:** A submitted registration cannot be resubmitted, edited, or modified through the system by the IIIT coordinator. If corrections are required after submission, the UI explicitly states that the coordinator must contact the designated tournament authority directly.

This strict one-way submission flow completely eliminates the risk of an IIIT altering their roster after the deadline or after tournament brackets have been drawn, ensuring absolute data integrity for the organizers.

==================================================
## 7. ADMINISTRATOR CAPABILITIES
==================================================

The administrative dashboard provides the tournament organizers with comprehensive oversight of the registered data:

- **High-Level Statistics:** Real-time visibility into the number of IIITs that have successfully submitted, the total count of unique students across the tournament, and the total number of individual event entries.
- **Comprehensive Data Viewing:** Access to view every submitted student and their associated events.
- **Granular Filtering:** The ability to filter the global database by specific IIIT, Sport, specific Event within a sport, and Gender.
- **Text Search:** Rapid searching for specific participants by their Roll Number or exact Name.
- **Combined Filters:** Filters and searches can be combined (e.g., searching for all Female students from IIIT Hyderabad participating in the 100m Athletics event).
- **Clear Filters:** A one-click reset to clear all active filters and searches.
- **Flexible Exporting:** The ability to export the entire global registration database to CSV, or to export only the currently filtered results (e.g., generating a CSV solely for the Men's Basketball tournament).
- **Administrator Logout:** Secure session termination.

==================================================
## 8. PAGES / SCREENS
==================================================

The application consists of the following primary routes and screens:

- **`/` (Home):** The public landing page introducing the event. Primary users: General public, IIIT coordinators.
- **`/about`:** General information about the host institute and the sports meet. Primary users: General public.
- **`/events`:** A public listing of the sports and events offered. Primary users: General public.
- **`/gallery`:** Visual media from past or current events. Primary users: General public.
- **`/team`:** Information about the organizing committee. Primary users: General public.
- **`/contact`:** Contact information for event authorities. Primary users: General public.
- **`/login`:** The authentication gateway. Primary users: IIIT Coordinators and Administrators. (Includes loading and error states for invalid credentials).
- **`/register`:** The core registration application for IIIT Coordinators.
  - *Draft State:* Interactive form for data entry and live validation.
  - *Review State:* A summary screen prior to final submission.
  - *Locked State:* A read-only view displayed after a successful final submission.
- **`/admin`:** The centralized dashboard for the Administrator.
  - Features overview statistics, an interactive data table, filtering sidebars, and export tools. Primary users: Administrators.

==================================================
## 9. SECURITY & DATA PROTECTION
==================================================

The system employs a standard, robust security model appropriate for transactional web applications:

- **Authenticated Access:** All registration and administrative routes are strictly protected and require a valid session.
- **Role-Based Authorization:** Server-side checks ensure that IIIT accounts cannot access administrative API endpoints or interfaces.
- **Data Isolation:** IIIT accounts are cryptographically tied to their specific institute code; the server strictly enforces that an IIIT can only query or submit data matching their assigned identity.
- **Server-Side Validation:** All business rules and data schemas are re-validated on the server prior to database insertion, preventing malicious client-side manipulation or bypass of rules.
- **Password Protection:** All user passwords are encrypted using strong hashing algorithms (bcrypt).
- **Secure Sessions:** Authentication is maintained via HTTP-only session cookies, protecting against cross-site scripting (XSS) attacks.
- **Database Atomicity:** Final submissions are executed as database transactions, guaranteeing that a registration is either saved entirely or not at all (preventing corrupted or partial data).
- **Local Data Safety:** Client-side `localStorage` is used exclusively for non-sensitive registration draft data; no authentication secrets or sensitive credentials are saved locally.

==================================================
## 10. TECHNOLOGY STACK
==================================================

The system is built using modern, reliable web technologies:

- **Next.js & React:** The core framework used to build both the user interface and the server-side API logic, providing a fast, responsive user experience.
- **JavaScript:** The primary programming language utilized across both the frontend and backend.
- **Tailwind CSS:** A utility-first styling framework used to design the visual interface and ensure responsiveness across devices.
- **PostgreSQL:** A powerful, robust relational database used as the central, permanent storage for all user accounts and finalized registration data.
- **Drizzle ORM:** A lightweight, type-safe database toolkit used by the server to safely interact with the PostgreSQL database.
- **Zod:** A schema declaration library used to enforce strict data validation on the server.
- **bcryptjs:** A secure cryptographic library used to safely hash user passwords.
- **Neon Serverless (@neondatabase/serverless):** Database driver enabling compatibility with modern, cloud-native serverless PostgreSQL environments.

==================================================
## 11. DEPLOYMENT & RELIABILITY
==================================================

The application's architecture is highly flexible and designed for modern cloud hosting:

- **Hosting Suitability:** The Next.js architecture makes the system exceptionally well-suited for deployment on modern platforms like Vercel, which can automatically scale to handle varying loads.
- **Database Infrastructure:** It is designed to run on managed PostgreSQL services (such as Neon), abstracting away database maintenance and ensuring high availability.
- **Resource Efficiency:** The system is a lightweight transactional web application. It operates entirely via browser-based access and does not perform any computationally intensive processing. It requires no GPU, nor does it necessitate a dedicated, large-scale virtual server.
- **Workload Expectation:** The architecture is perfectly suited for an event-registration workload, which typically involves low but critical transactional volume (a few dozen IIITs submitting data), well within the capabilities of standard managed hosting and database services.

==================================================
## 12. OPERATIONAL REQUIREMENTS
==================================================

To operate the system in a live environment, the organizers require:

- **Infrastructure:** A Next.js-compatible application host (e.g., Vercel) and a PostgreSQL database provider.
- **Access:** Standard internet and modern web browser access for all participating IIIT coordinators and administrators.
- **Configuration:** Proper environment configuration (`.env.local`) linking the application to the live database.
- **Pre-seeded Accounts:** The database must be seeded with the master administrator credentials and the individual, pre-generated login credentials for every invited IIIT prior to opening the registration window.

==================================================
## 13. DATA INTEGRITY
==================================================

The system relies on strict database constraints and server-side logic to guarantee data integrity. It fundamentally prevents:

- **Duplicate Students:** Unique database indexes ensure the same roll number cannot exist twice for a given IIIT.
- **Duplicate Participation:** The server rejects entries placing the same student into the same event multiple times.
- **Invalid Genders & Counts:** Server validation strictly blocks cross-gender participation (where prohibited) and rejects squad sizes exceeding official limits.
- **Excessive Participation:** The server blocks any submission where a student exceeds the maximum allowed normal sports or individual event caps.
- **Duplicate Submissions:** The permanent lock status checked at the server level ensures an IIIT cannot submit their form a second time.
- **Partial Submissions:** Relational database transactions guarantee that if a network failure occurs halfway through saving the 150 students, the entire transaction is rolled back, preventing corrupted, half-finished rosters.

==================================================
## 14. CURRENT SYSTEM STATUS
==================================================

Based on the current repository implementation, the core logic, API endpoints, database schemas, validation rules, IIIT workflows, and the Administrator dashboard are fully implemented and functional. 

==================================================
## 15. SCOPE / NON-REQUIREMENTS
==================================================

To maintain a streamlined and focused architecture, the system intentionally **does not** include:

- **Self-Service Registration:** There is no "Sign Up" page. IIIT accounts are strictly pre-provisioned by the administration to prevent unauthorized access.
- **Email/OTP Verification:** Because accounts are pre-distributed securely, the system does not require complex email or SMS verification loops.
- **Payment Processing:** The system handles data registration only; it does not process entry fees or financial transactions.
- **QR Code Generation:** The system does not generate participant ID badges or QR codes.
- **Social Authentication:** Logins are strictly username/password based; Google/Facebook logins are not supported or required.
- **Microservices:** The application operates as a cohesive monolith, avoiding unnecessary infrastructure complexity.

==================================================
## 16. FUTURE UI / PRESENTATION REFINEMENT
==================================================

Because the core registration logic, data validation, and database architecture are fully established and separated from the presentation layer, visual refinement of the user interface (such as updating colors, layouts, or branding) can continue independently. Cosmetic changes to the UI can be safely implemented without risking or altering the robust data architecture underlying the registration rules.

==================================================
## 17. FINAL SUMMARY
==================================================

The 9th Inter-IIIT Sports Meet Digital Registration System provides a robust, zero-compromise solution to tournament registration. By moving away from manual spreadsheets, the system eliminates human error, automates the enforcement of complex rulebook constraints, and guarantees that the tournament organizers receive perfectly formatted, 100% compliant data. Its lightweight architecture, combined with strict data immutability and centralized administrative oversight, makes it highly suitable, secure, and reliable for managing the registration process of the Inter-IIIT Sports Meet.
