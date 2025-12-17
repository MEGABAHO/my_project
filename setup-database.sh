#!/bin/bash

# Database Setup Script for my_project
# This script automates the database setup process

echo "🚀 Starting Database Setup..."
echo ""

# Step 1: Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created successfully"
else
    echo "ℹ️  .env file already exists"
fi

echo ""
echo "📋 Current DATABASE_URL configuration:"
grep DATABASE_URL .env || echo "⚠️  DATABASE_URL not found in .env"
echo ""

# Step 2: Start Docker containers
echo "🐳 Starting Docker MySQL container..."
npm run docker:up

echo ""
echo "⏳ Waiting for MySQL to be ready and initialize (20 seconds)..."
echo "   This includes granting necessary permissions for Prisma migrations..."
sleep 20

# Step 3: Generate Prisma Client
echo ""
echo "🔧 Generating Prisma Client..."
npm run prisma:generate

# Step 4: Run migrations
echo ""
echo "📊 Running database migrations..."
npm run prisma:migrate

echo ""
echo "✨ Database setup complete!"
echo ""
echo "🎉 You can now run your application with: npm run dev"
