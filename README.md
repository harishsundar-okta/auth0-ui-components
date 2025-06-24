# Auth0 Web UI Components

A comprehensive library of reusable UI components and utilities for Auth0 integrations, built with modern web technologies and designed for scalability.

## 📦 Packages Overview

This project uses a **monorepo architecture** with multiple packages located in the `packages/` folder. Each package serves a specific purpose and can be used independently or together:

### `packages/core/`

**@auth0-web-ui-components/core** - The foundational package containing core utilities and services.

**What it provides:**

- 🌐 **Internationalization (i18n)**: Translation functions and utilities for multi-language support
- 🔌 **API Services**: HTTP client utilities with error handling for Auth0 API interactions
- 🔐 **MFA Services**: Multi-factor authentication utilities including enrollment, confirmation, and factor management
- 🛠️ **Shared Types**: TypeScript type definitions used across all packages

### `packages/react/`

**@auth0-web-ui-components/react** - React-specific UI components and hooks for Auth0 integrations.

**What it provides:**

- ⚛️ **React Components**: Pre-built UI components for Auth0 features (MFA management, user profiles, etc.)
- 🎣 **Custom Hooks**: React hooks for Auth0 state management and API interactions
- 🎨 **Styled Components**: Beautiful, accessible components built with Radix UI and Tailwind CSS
- 🔄 **Providers**: React context providers for Auth0 state management

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- PNPM (recommended package manager)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/atko-cic/auth0-ui-components
   cd auth0-ui-components
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Build all packages:**
   ```bash
   pnpm run build
   ```

### Development

## 📖 Examples

The `examples/` folder contains sample applications demonstrating how to use the components:

- **`react-spa-npm/`**: React SPA showing UI Components Functionality using npm package
  - See [examples/react-spa-npm/README.md](examples/react-spa-npm/README.md) for setup and running instructions
- **`react-spa-shadcn/`**: React SPA showing UI Components Functionality using shadcn components
  - See [examples/react-spa-shadcn/README.md](examples/react-spa-shadcn/README.md) for setup and running instructions
