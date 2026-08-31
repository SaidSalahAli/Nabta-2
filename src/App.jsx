import React from 'react';
import { RouterProvider } from 'react-router-dom';

// project-imports
import router from 'routes';
import ThemeCustomization from 'themes';

import Locales from 'components/Locales';
import RTLLayout from 'components/RTLLayout';
import ScrollTop from 'components/ScrollTop';
import Snackbar from 'components/@extended/Snackbar';
import logoAnimation from 'assets/images/logoAnimation.json';

// auth-provider
import { JWTProvider as AuthProvider } from 'contexts/JWTContext';

// google oauth
import { GoogleOAuthProvider } from '@react-oauth/google';

// Simple ErrorBoundary to handle chunk loading failures
class ChunkErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error) {
    const errorMessage = error?.message || '';
    if (
      errorMessage.includes('Failed to fetch dynamically imported module') ||
      errorMessage.includes('Failed to fetch') ||
      errorMessage.includes('chunk') ||
      error?.name === 'TypeError'
    ) {
      const now = Date.now();
      const lastReload = sessionStorage.getItem('last_chunk_reload');
      if (!lastReload || now - Number(lastReload) > 10000) {
        sessionStorage.setItem('last_chunk_reload', String(now));
        window.location.reload();
      }
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          fontFamily: 'sans-serif',
          textAlign: 'center',
          padding: '20px',
          direction: 'rtl'
        }}>
          <h2 style={{ color: '#2E2A39', marginBottom: '10px' }}>حدث خطأ أثناء تحميل الصفحة</h2>
          <p style={{ color: '#666', marginBottom: '20px' }}>ربما تم تحديث الموقع أو هناك مشكلة مؤقتة في الاتصال بالشبكة.</p>
          <button 
            onClick={() => {
              sessionStorage.removeItem('last_chunk_reload');
              window.location.reload();
            }} 
            style={{
              padding: '12px 24px',
              backgroundColor: '#0088CC',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              boxShadow: '0 4px 12px rgba(0, 136, 204, 0.2)'
            }}
          >
            إعادة تحميل الصفحة
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

export default function App() {
  React.useEffect(() => {
    const handlePreloadError = (event) => {
      event?.preventDefault?.();
      const now = Date.now();
      const lastReload = sessionStorage.getItem('last_chunk_reload');
      if (!lastReload || now - Number(lastReload) > 10000) {
        sessionStorage.setItem('last_chunk_reload', String(now));
        window.location.reload();
      }
    };

    window.addEventListener('vite:preloadError', handlePreloadError);
    return () => {
      window.removeEventListener('vite:preloadError', handlePreloadError);
    };
  }, []);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ThemeCustomization>
        <RTLLayout>
          <Locales>
            <ScrollTop>
              <AuthProvider>
                <ChunkErrorBoundary>
                  <RouterProvider router={router} />
                  <Snackbar />
                </ChunkErrorBoundary>
              </AuthProvider>
            </ScrollTop>
          </Locales>
        </RTLLayout>
      </ThemeCustomization>
    </GoogleOAuthProvider>
  );
}
