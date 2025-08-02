# Project Overview

## Overview
This is a modern full-stack web application built as a technology services company website. The application features a sleek, futuristic design with animations, a contact form system, and client statistics tracking. It combines a React-based frontend with an Express.js backend, utilizing PostgreSQL for data persistence and a comprehensive UI component library for consistent design.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and caching
- **UI Framework**: shadcn/ui components built on Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom design tokens and dark/light theme support
- **Animation**: Framer Motion for smooth animations and transitions
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

### Backend Architecture
- **Runtime**: Node.js with Express.js framework for RESTful API development
- **Database ORM**: Drizzle ORM for type-safe database operations and migrations
- **API Design**: RESTful endpoints for contact form submissions and statistics
- **Error Handling**: Centralized error middleware with proper HTTP status codes
- **Development**: Hot module replacement via Vite middleware in development mode

### Data Storage
- **Primary Database**: PostgreSQL with Neon serverless hosting
- **Schema Management**: Drizzle Kit for migrations and schema synchronization
- **Fallback Storage**: In-memory storage implementation for development/testing
- **Data Models**: Contact submissions with validation and timestamp tracking

### Design System
- **Component Library**: Comprehensive UI component system with consistent styling
- **Theme System**: CSS custom properties for light/dark mode theming
- **Color Palette**: Futuristic color scheme with electric blue and cyan accents
- **Typography**: Tailwind typography utilities with custom font configurations
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts

## External Dependencies

### Database Services
- **Neon Database**: PostgreSQL-compatible serverless database hosting
- **Connection**: Environment-based connection string configuration

### UI and Animation Libraries
- **Radix UI**: Unstyled, accessible component primitives for complex UI patterns
- **Framer Motion**: Production-ready animation library for React applications
- **Lucide React**: Consistent icon library for UI elements
- **React Icons**: Extended icon set including brand icons for social media

### Development Tools
- **TypeScript**: Static type checking and enhanced developer experience
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind and Autoprefixer plugins
- **TSX**: TypeScript execution for development server

### Form and Validation
- **Zod**: TypeScript-first schema validation library
- **React Hook Form**: Performant form library with minimal re-renders
- **Hookform Resolvers**: Integration between React Hook Form and Zod validation

### Utility Libraries
- **clsx/twMerge**: Conditional CSS class name utilities
- **date-fns**: Modern date utility library for JavaScript
- **nanoid**: URL-safe unique string ID generator