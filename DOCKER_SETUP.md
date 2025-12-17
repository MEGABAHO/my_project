# Docker & MySQL Setup Guide

This project uses Docker to run a MySQL database for storing registered user accounts.

## Prerequisites

- Docker Desktop installed on your machine
- Docker Compose (usually comes with Docker Desktop)

## Quick Start

### Automated Setup (Recommended)

Run the automated setup script:

```bash
chmod +x setup-database.sh
./setup-database.sh
```

This script will:
1. Create `.env` file from `.env.example` if it doesn't exist
2. Start the MySQL Docker container
3. Generate Prisma Client
4. Run database migrations

### Manual Setup

If you prefer to set up manually, follow these steps:

#### 1. Configure Environment Variables

Create a `.env` file in the project root (copy from `.env.example`):

```bash
cp .env.example .env
```

**Important:** The `.env` file must contain:
```
DATABASE_URL="mysql://myuser:mypassword@localhost:3306/my_project_db"
```

The URL format is: `mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME`

#### 2. Start the MySQL Database

```bash
# Start MySQL in Docker
npm run docker:up

# Or manually with docker-compose
docker-compose up -d
```

This will:
- Start a MySQL 8.0 container
- Create a database named `my_project_db`
- Expose MySQL on port 3306

Wait 10-15 seconds for MySQL to be fully ready before proceeding.

#### 3. Run Prisma Migrations

Generate the Prisma Client and create database tables:

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations to create tables
npm run prisma:migrate
```

When prompted for a migration name, you can use: `init`

#### 4. Start the Development Server

```bash
npm install --legacy-peer-deps
npm run dev
```

Visit http://localhost:3000 to see your application.

## Database Management

### View Database with Prisma Studio

```bash
npm run prisma:studio
```

This opens a GUI at http://localhost:5555 to view and edit your database.

### Stop the Database

```bash
npm run docker:down

# Or manually
docker-compose down
```

### Reset the Database

```bash
# Stop containers and remove volumes
docker-compose down -v

# Start fresh
npm run docker:up
npm run prisma:migrate
```

## Database Schema

The `User` model includes:
- `id`: Unique identifier
- `email`: User's email (unique)
- `firstName`: User's first name
- `lastName`: User's last name
- `password`: Hashed password
- `createdAt`: Registration timestamp
- `updatedAt`: Last update timestamp

## Docker Configuration

### MySQL Container Details
- **Image**: mysql:8.0
- **Container Name**: my_project_mysql
- **Port**: 3306
- **Database**: my_project_db
- **User**: myuser
- **Password**: mypassword
- **Root Password**: rootpassword

### Data Persistence
Database data is stored in a Docker volume named `mysql_data`, so your data persists even if you stop the container.

## Troubleshooting

### Error: "the URL must start with the protocol `mysql://`"

This error occurs when the `.env` file is missing or has an incorrect DATABASE_URL format.

**Solution:**
1. Check if `.env` file exists in the project root:
```bash
ls -la .env
```

2. If it doesn't exist, create it:
```bash
cp .env.example .env
```

3. Verify the content of `.env`:
```bash
cat .env
```

It should contain:
```
DATABASE_URL="mysql://myuser:mypassword@localhost:3306/my_project_db"
```

**Important:** The DATABASE_URL must:
- Start with `mysql://` protocol
- Include username and password
- Follow the format: `mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME`

### Port 3306 Already in Use
If you have MySQL already running locally:
```bash
# Stop local MySQL (macOS)
brew services stop mysql

# Or change the port in docker-compose.yml
ports:
  - "3307:3306"  # Change host port to 3307

# Then update DATABASE_URL in .env:
DATABASE_URL="mysql://myuser:mypassword@localhost:3307/my_project_db"
```

### Connection Issues
Make sure the MySQL container is running:
```bash
docker ps
```

You should see `my_project_mysql` in the list.

If not running, start it:
```bash
npm run docker:up
```

### Error: "User was denied access on the database" (P3014)

This error occurs when the MySQL user doesn't have permission to create shadow databases needed for Prisma migrations.

**Solution:**
The docker-compose.yml now includes an initialization script that grants the necessary permissions. If you're getting this error:

1. Stop and remove the existing MySQL container and volume:
```bash
npm run docker:down
docker volume rm my_project_mysql_data
```

2. Start fresh (this will run the init script):
```bash
npm run docker:up
```

3. Wait 15-20 seconds for MySQL to fully initialize, then run migrations:
```bash
npm run prisma:generate
npm run prisma:migrate
```

**Alternative:** Use root user in DATABASE_URL (not recommended for production):
```
DATABASE_URL="mysql://root:rootpassword@localhost:3306/my_project_db"
```

### Reset Everything
```bash
npm run docker:down
docker volume rm my_project_mysql_data
npm run docker:up
# Wait 15-20 seconds for MySQL to initialize
npm run prisma:migrate
```

## Production Deployment

For production:
1. Use environment variables for sensitive data
2. Change default passwords
3. Use proper password hashing (bcrypt is already included)
4. Consider using managed database services (AWS RDS, PlanetScale, etc.)
5. Enable SSL/TLS for database connections

## Next Steps

The registration form is now connected to the database schema. To fully implement user registration:

1. Create an API route at `/api/auth/register`
2. Hash passwords using bcryptjs before storing
3. Use Prisma Client to save user data
4. Implement proper error handling
5. Add email verification (optional)
6. Implement login functionality

See the Prisma documentation for more details: https://www.prisma.io/docs
