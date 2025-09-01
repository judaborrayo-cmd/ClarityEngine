# Overview

This is a full-stack web application built with React and Express.js featuring a modern tech stack. The application uses a monorepo structure with separate client and server directories, shared schema definitions, and a comprehensive UI component library built with Radix UI and Tailwind CSS. The project is configured for PostgreSQL database integration using Drizzle ORM and includes development tools for a smooth coding experience.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Comprehensive component library using Radix UI primitives with Tailwind CSS styling
- **State Management**: TanStack React Query for server state management
- **Styling**: Tailwind CSS with CSS custom properties for theming support
- **Form Handling**: React Hook Form with Zod validation through @hookform/resolvers

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Development**: Hot reload using tsx for TypeScript execution
- **Build**: ESBuild for production bundling
- **Storage Layer**: Abstracted storage interface with in-memory implementation for development

## Database Design
- **ORM**: Drizzle ORM with type-safe queries
- **Schema**: Centralized schema definitions in shared directory
- **Migrations**: Drizzle Kit for database migrations
- **Connection**: Neon serverless PostgreSQL driver
- **Validation**: Zod schemas generated from Drizzle schema definitions

## Development Setup
- **Monorepo Structure**: Client, server, and shared code in separate directories
- **Build System**: Vite for frontend, ESBuild for backend
- **Type Safety**: Full TypeScript coverage across frontend and backend
- **Path Aliases**: Configured aliases for clean imports (@/, @shared/)
- **Hot Reload**: Development server with automatic reloading

## Component System
- **Design System**: shadcn/ui components with "new-york" style variant
- **Base Components**: Built on Radix UI primitives for accessibility
- **Theming**: CSS custom properties with light/dark mode support
- **Styling**: Class Variance Authority for component variants
- **Icons**: Lucide React for consistent iconography

# External Dependencies

## Database & ORM
- **Neon Database**: Serverless PostgreSQL hosting (@neondatabase/serverless)
- **Drizzle ORM**: Type-safe database queries and migrations (drizzle-orm, drizzle-kit)
- **Zod**: Schema validation and type generation (zod, drizzle-zod)

## UI & Styling
- **Radix UI**: Accessible component primitives (@radix-ui/*)
- **Tailwind CSS**: Utility-first CSS framework
- **Class Variance Authority**: Component variant management
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel/slider functionality

## Frontend Framework
- **React**: UI library with TypeScript support
- **Vite**: Build tool and development server
- **Wouter**: Lightweight routing library
- **TanStack React Query**: Server state management

## Development Tools
- **TypeScript**: Static typing across the stack
- **ESBuild**: Fast JavaScript bundling
- **PostCSS**: CSS processing with Autoprefixer
- **Replit Integration**: Development environment plugins and error handling