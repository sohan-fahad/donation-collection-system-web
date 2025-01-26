# Donation Collection System Web Application

A Next.js frontend application for donation system.

## Features

### 1. Authentication

- User registration with phone number and password
- Secure login system
- Protected routes
- JWT token management
- Session persistence

### 2. Donation

- Donation
- Donation report
- User-friendly interface

### 3. CRUD Donation

- Update donation
- Delete donation

## Setup Instructions

### Prerequisites

- Node.js 21 or later
- pnpm (recommended)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd donation-system-web
```

2. Install dependencies:

```bash
pnpm install
```

3. Create environment file:
   Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_BASE_URL="http://localhost:5004/api/v1/web"
```

4. Start the development server:

```bash
pnpm dev
```

Access the application at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── home
│   ├── auth/
│   ├── dashboard/
├── presentations/
│   ├── componensts/
│   ├── hooks/
    ├── libs/
│   └── services/
└── ENV.ts
```

## Available Scripts

```bash
# Development
pnpm dev

# Build
pnpm build

# Start production server
pnpm start
```

## Pages and Routes

- `/` - Auth page
- `/home` - Home page

## API Integration

The app connects to the backend API using:

- Base URL from environment variable
- JWT authentication
- Default fetch for for HTTP requests
- Shadcn UI framework

## Troubleshooting

### Common Issues and Solutions

1. API Connection Error

   - Verify .env file exists
   - Check NEXT_PUBLIC_BASE_URL value
   - Ensure backend server is running

2. Authentication Issues

   - Clear browser cache
   - Check token expiration
   - Verify credentials

3. Loading/Display Issues
   - Check console for errors
   - Verify data format
   - Clear browser cache

## Development Guidelines

1. Code Style
   - Use TypeScript
   - Follow ESLint rules
   - Format with Prettier
