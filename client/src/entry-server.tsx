import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { Router as LegacyRouter } from 'wouter';

// Render the same public UI as the browser; never render private assessment data.
export function render(pathname: string) {
  return renderToString(<StaticRouter location={pathname}><LegacyRouter ssrPath={pathname}><App /></LegacyRouter></StaticRouter>);
}
