# 9th Inter-IIIT Sports Meet 2026 - Digital Registration System

The 9th Inter-IIIT Sports Meet Digital Registration System is a centralized, secure web application designed to streamline the participant registration process for all participating IIITs. It replaces traditional, manual, spreadsheet-based registration processes with a unified online platform.

The system enforces complex sports participation rules (such as per-student event limits, gender constraints, and overall squad sizes) by providing real-time, automated validation. IIIT coordinators use the platform to assemble their rosters and event entries, ensuring that any submitted registration is 100% compliant with the official rulebook. For event administrators, it provides a centralized database of all registered participants with advanced filtering and export capabilities.

## Features

- **IIIT Authentication:** Secure login for pre-provisioned IIIT accounts.
- **Admin Authentication:** Dedicated master account for tournament organizers.
- **Registration Form:** Comprehensive interface to register students and assign events.
- **Live Validation:** Real-time feedback on business rules and constraints.
- **Draft Persistence:** Unfinished registrations are auto-saved to the browser.
- **Final Submission:** Atomic, transactional saving of the final roster.
- **Permanent Lock:** Prevents any further modifications after a successful submission.
- **CSV Export:** Participants and admins can export rosters to CSV.
- **Admin Dashboard:** High-level statistics on submissions and participation.
- **Server-Side Filtering:** Advanced database-level filtering for admins.
- **Security & Data Isolation:** Strict role-based access and IIIT data separation.

## Technology Stack

- **Next.js** (App Router & API Routes)
- **React**
- **JavaScript**
- **Tailwind CSS**
- **PostgreSQL**
- **Drizzle ORM**
- **Zod** (Schema validation)
- **bcryptjs** (Password hashing)

## Requirements

To run this project locally, you will need:
- **Node.js** (v18.x or newer)
- **npm** (comes with Node.js)
- **PostgreSQL** (v14 or newer)
- **pgAdmin 4** (Recommended for managing the database on Windows)
- **Git**

*(Windows users: You can run this natively on Windows. WSL is not required.)*

## Clone the Project

```bash
git clone https://github.com/your-org/inter_iiit.git
cd inter_iiit
```

## Install Dependencies

```bash
npm install
```

## PostgreSQL Setup (Windows)

1. Download and install PostgreSQL from the official website.
2. Open **pgAdmin 4** (installed alongside PostgreSQL).
3. Connect to your local PostgreSQL server (usually `localhost:5432`).
4. Right-click on **Databases** → **Create** → **Database...**
5. Name the database exactly: `inter_iiit`
6. Click **Save**.

*Note: Do NOT manually create any tables inside the database. The application's migration scripts will handle the schema setup automatically.*

## Database Configuration

1. In the root of the project, create a new file named `.env.local`
2. Copy the contents of `.env.example` into `.env.local`
3. Update the variables with your local settings.

Example `.env.local`:
```env
DATABASE_URL=postgresql://postgres:YOUR_POSTGRES_PASSWORD@localhost:5432/inter_iiit
SESSION_SECRET=replace_with_a_long_random_secret_string
ADMIN_PASSWORD=replace_with_local_admin_password
DEFAULT_IIIT_PASSWORD=replace_with_local_iiit_password
PORT=3000
```
*Never commit `.env.local` to version control.*

## Database Migration

Run the following command to create the required tables in your database:

```bash
npm run db:migrate
```
This script uses Drizzle ORM to automatically apply the necessary SQL schemas to your PostgreSQL database. Do not manually create or alter tables in pgAdmin.

## Database Seed

Run the following command to populate the database with the initial accounts:

```bash
npm run db:seed
```
This script creates:
- **1 Admin account** (using the `ADMIN_PASSWORD` from your `.env.local`).
- **25 IIIT accounts** (using the `DEFAULT_IIIT_PASSWORD` from your `.env.local`).

## Run Development Server

Start the Next.js development server:

```bash
npm run dev
```
Open your browser and navigate to:
[http://localhost:3000](http://localhost:3000)

## Login / Test Accounts

You can log in to the system at `http://localhost:3000/login`.

- **Admin Account:** Username is `admin`. Password is the value you set for `ADMIN_PASSWORD`.
- **IIIT Accounts:** Usernames correspond to the IIIT codes (e.g., `iiitdm-kancheepuram`, `iiit-allahabad`). Password is the value you set for `DEFAULT_IIIT_PASSWORD`.

## Testing

The following commands are available to validate the codebase:

```bash
# Check code formatting and linting errors
npm run lint

# Validate that the application compiles correctly
npm run build

# Run the backend test suite (validates rules, endpoints, and DB constraints)
node scratch/test_backend.js
```

## Database Inspection

You can use the Query Tool in **pgAdmin 4** to inspect the data.

Useful queries for checking data:
```sql
-- View all seeded user accounts
SELECT id, username, role, iiit_name FROM users;

-- View all submitted registrations
SELECT * FROM registrations;

-- View students for a specific registration
SELECT * FROM students WHERE iiit_code = 'iiitdm-kancheepuram';
```

*(LOCAL DEVELOPMENT ONLY) If you need to completely reset your database during testing:*
```sql
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
```
*(After dropping, you must re-run `npm run db:migrate` and `npm run db:seed`)*

## Project Structure

```text
src/
├── app/          # Next.js App Router (Pages, Layouts, API Routes)
├── components/   # Reusable React UI components
├── data/         # Static configuration data (e.g., list of IIITs)
├── db/           # PostgreSQL configuration, schema, migrations, and seed scripts
└── lib/          # Core backend/frontend logic (Auth, Validation, Sports Config, Admin)
```

## Environment / Security

- **NEVER** commit `.env.local` to version control.
- **NEVER** share passwords or your `SESSION_SECRET`.
- Use strong, cryptographically random secrets for real production deployment.
- **Do not** put credentials or sensitive data in frontend components or `localStorage`.

## Production Build

To test or run the optimized production build locally:

```bash
npm run build
npm start
```

## Deployment Overview

**Application:** The Next.js app is designed to be easily deployed on **Vercel** or any compatible Node.js/Next.js hosting provider.
**Database:** Use a managed PostgreSQL service such as **Neon**, Supabase, or AWS RDS.

*Note: You must manually configure all environment variables (`DATABASE_URL`, `SESSION_SECRET`, etc.) in the hosting platform's dashboard before deploying.*

## Common Setup Issues

- **Database Connection Refused:** Ensure PostgreSQL is actually running as a background service on your Windows machine and that your `DATABASE_URL` password is correct.
- **Database Does Not Exist:** You must explicitly create the `inter_iiit` database in pgAdmin before running migrations.
- **"relation does not exist" error:** You forgot to run `npm run db:migrate`.
- **Cannot Login:** You forgot to run `npm run db:seed` or your password does not match `.env.local`.
- **Port 3000 occupied:** Change the `PORT` variable in `.env.local` to `3001` or another open port.
- **Session/Logout loops:** Usually caused by changing `SESSION_SECRET` while holding an active browser cookie. Clear your browser cookies or restart the dev server.

## Contribution / Development Rules

- Keep `.env.local` completely private.
- Always run `npm run lint` and `npm run build` locally before pushing code.
- **Do not** bypass backend validation logic in `src/lib/validation/rules.js`.
- **Do not** casually modify business rules without consulting stakeholders.
- Update tests if you change underlying business rules.
- Maintain clear separation between frontend components (`src/components`) and backend services (`src/lib`).

## Quick Start

```bash
# 1. Clone & Install
git clone https://github.com/your-org/inter_iiit.git
cd inter_iiit
npm install

# 2. Open pgAdmin and create a database named 'inter_iiit'

# 3. Create environment config
cp .env.example .env.local
# (Edit .env.local to match your database password)

# 4. Setup Database
npm run db:migrate
npm run db:seed

# 5. Start Server
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)
