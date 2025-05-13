# SpeakWise Frontend

SpeakWise is a modern, multi-page React application with a comprehensive authentication system and scalable architecture designed for enterprise usage.

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Authentication Flow](#authentication-flow)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Testing](#testing)

## 🛠 Tech Stack

- **React 19**: Core UI library
- **TypeScript**: Type-safe code
- **React Router**: Page routing and navigation
- **Axios**: API requests
- **JWT Authentication**: Secure authentication
- **React Hook Form + Zod**: Form handling with validation
- **Styled Components**: Component styling
- **TanStack React Query**: Data fetching and caching
- **Jest + React Testing Library**: Testing

## 🏗 Architecture Overview

The application follows a feature-based architecture with clear separation of concerns and modular components:

```
src/
├── assets/              # Static assets like images, fonts, etc.
├── components/          # Reusable UI components
│   ├── common/          # Truly reusable components across the entire app
│   ├── forms/           # Form-related components
│   ├── layout/          # Layout components like headers, footers, etc.
│   └── ui/              # UI library components (buttons, inputs, etc.)
├── config/              # Configuration files
├── constants/           # App constants and enums
├── features/            # Feature-specific modules
│   ├── auth/            # Authentication feature
│   ├── dashboard/       # Dashboard feature
│   ├── profile/         # User profile feature
│   └── ...              # Other features
├── hooks/               # Custom React hooks
├── pages/               # Page components that correspond to routes
├── routes/              # Routing configuration
├── services/            # API services and other service layers
│   ├── api/             # API client and endpoints
│   ├── auth/            # Authentication service
│   └── ...              # Other services
├── store/               # Global state management
│   ├── slices/          # Redux slices or context providers
│   └── index.ts         # Store configuration
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── App.tsx              # Main application component
```

## 💡 Key Features

### 1. Authentication System
- JWT-based authentication
- Protected routes
- Token management with auto-refresh
- Login and registration forms with validation

### 2. API Layer
- Centralized API client
- Request/response interceptors
- Automatic authorization header inclusion
- Error handling

### 3. Form Handling
- Robust form validation with Zod
- Elegant error reporting
- Type-safe form inputs

### 4. Routing
- Public vs. protected routes
- Redirect logic for unauthenticated users
- Not found handling

## 🔄 Authentication Flow

1. **Login/Registration**:
   - User inputs credentials
   - Credentials are validated
   - Request sent to backend
   - JWT token received and stored
   
2. **Token Management**:
   - Tokens stored in localStorage
   - Automatic inclusion in API requests
   - Validation checks for token expiry
   
3. **Protected Routes**:
   - Check for valid token before allowing access
   - Redirect to login if token is missing or expired
   
4. **Logout**:
   - Remove token
   - Redirect to login

## 🔍 Service Layer Details

### API Client (api.client.ts)
The API client is built with Axios and includes:
- Base configuration (URL, headers)
- Request interceptors to add authorization tokens
- Response interceptors to handle authentication errors
- Method wrappers for GET, POST, PUT, DELETE, PATCH

### Auth Service (auth.service.ts)
Handles all authentication operations:
- Login: Authenticates user and stores JWT
- Register: Creates new account with company details
- Logout: Clears authentication data

### Token Service (token.service.ts)
Manages JWT tokens:
- Storage and retrieval
- Validation and decoding
- User information extraction

## 📝 Component Architecture

Components follow a hierarchical structure:
- **Pages**: Top-level components representing routes
- **Features**: Domain-specific component collections
- **UI Components**: Reusable presentational components
- **Forms**: Input collection and validation
- **Layout**: Structure and organization components

## 🚀 Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/speakwise-fe.git
cd speakwise-fe
```

2. Install dependencies:
```bash
npm install
```

## 🏃‍♂️ Running the Application

```bash
# Development mode
npm start

# Build for production
npm run build

# Run tests
npm test
```

## 🧪 Testing

The application includes comprehensive tests:
- Unit tests for services
- Component tests for UI elements
- Integration tests for feature flows

Run the test suite with:
```bash
npm test
```

## 📱 Responsive Design

The application is fully responsive, adapting to different screen sizes:
- Mobile-first approach
- Flexible layouts
- Media queries for breakpoints
