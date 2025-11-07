# Overview

This is a marketing agency website built with React and Express.js showcasing paid media services designed to convert visitors through clear service descriptions, social proof, and strategic CTAs. The site targets growth-minded founders managing $5k-$70k/month in ad spend. Features multiple conversion paths with case studies optimized for conversion using Clarity Engine voice.

# Recent Changes

**November 7, 2025**
- Installed Framer Motion for smooth scroll animations and hover effects
- Generated professional AI hero image: marketing strategist in modern office with cinematic lighting
- Transformed homepage hero section with MarketerHire-inspired design refinements:
  - Enhanced typography: larger heading sizes (text-5xl/6xl), improved line heights, tighter letter spacing
  - Increased whitespace: expanded padding (pt-20 pb-24 lg:pt-28 lg:pb-32)
  - Two-column layout: content left, professional image right (desktop)
  - Animated gradient background: subtle purple-to-green motion effect
  - Framer Motion animations: progressive fade-ins, slide-ups on content, image scale-in
  - Enhanced CTA buttons: purple-to-green gradient primary button with glow hover effect
  - Smooth hover microinteractions: buttons lift (-translate-y-0.5) with enhanced shadows
  - Professional hero image with decorative gradient glow and shadow
  - Left-aligned text on desktop for premium editorial look
- All existing functionality, links, and structure preserved (refinement-only approach)

**October 28, 2025**
- Completed Core40 case study CRO transformation to match optimized structure of Mandali, Hapi Art, and Lisa Nichols
- Updated hero intro with conversion-focused copy emphasizing partnership and measurable results
- Added StatStrip component with 4 key metrics: $2M+ revenue, 11K+ members, -38% CPL, +26% conversion rate
- Updated Key Results summary text to emphasize sustained growth through integrated campaigns
- Added MidPageCTA after Key Results with fitness-specific messaging
- Implemented Before vs After (Fitness Growth Framework) with 5-row comparison table
- Repositioned Core40 portfolio image to appear above Detailed Results section
- Updated Detailed Results to 4 factual blocks: Revenue Growth, Lead Quality, Member Acquisition, Brand Strength
- Removed fabricated testimonial quote (set to empty to prevent display)
- Added BottomCTA dark variant with fitness-focused conversion messaging
- All CRO components use verified metrics only: $2M+ revenue, 11K+ members, -38% CPL, +26% conversion

**October 27, 2025**
- Replaced homepage case study section with FeaturedCaseStudiesHome carousel component
- Carousel displays 2 featured case studies: Mandali Retreats and Lisa Nichols
- Each card includes: large image (h-72 sm:h-80), title, impact line, Problem/Solution block with aligned min-heights, and CTA
- Verified Mandali Retreats ROAS: +16.5× social, +29.06× search (updated sitewide)
- Arrow navigation buttons positioned next to "View all case studies →" link in header
- Flexbox layout ensures consistent card alignment with CTAs pushed to bottom
- All case study content uses verified metrics only

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