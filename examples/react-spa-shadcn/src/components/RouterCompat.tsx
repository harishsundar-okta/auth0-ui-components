import { ReactNode, ComponentType } from 'react';
import { Routes as RouterRoutes, Route as RouterRoute } from 'react-router-dom';

// Import entire module and extract BrowserRouter
import * as ReactRouterDOM from 'react-router-dom';

interface BrowserRouterProps {
  children?: ReactNode;
}

// Export the actual React Router components directly with proper typing
export const BrowserRouter = (ReactRouterDOM as Record<string, ComponentType<BrowserRouterProps>>)
  .BrowserRouter;
export const Routes = RouterRoutes;
export const Route = RouterRoute;
