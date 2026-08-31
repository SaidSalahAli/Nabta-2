import { lazy } from 'react';

/**
 * Enhanced `lazy` wrapper that automatically handles missing chunk errors caused by
 * new deployments or network glitches by auto-refreshing the page once.
 */
export const lazyRetry = (componentImport) =>
  lazy(async () => {
    const pageHasAlreadyBeenReloaded = sessionStorage.getItem('last_chunk_reload');
    try {
      const component = await componentImport();
      return component;
    } catch (error) {
      const errorMessage = error?.message || error?.toString() || '';
      const isChunkError =
        errorMessage.includes('Failed to fetch dynamically imported module') ||
        errorMessage.includes('Failed to fetch') ||
        errorMessage.includes('chunk') ||
        errorMessage.includes('Importing a module script failed') ||
        error?.name === 'TypeError';

      const now = Date.now();
      const lastReload = pageHasAlreadyBeenReloaded ? Number(pageHasAlreadyBeenReloaded) : 0;

      if (isChunkError && (!lastReload || now - lastReload > 10000)) {
        sessionStorage.setItem('last_chunk_reload', String(now));
        window.location.reload();
        // Return a promise that never resolves while reloading
        return new Promise(() => {});
      }

      throw error;
    }
  });

export default lazyRetry;
