import React from 'react';
import { useRouteError } from 'react-router-dom';

export default function RouteErrorBoundary() {
  const error = useRouteError();
  console.error('React Router caught error during render:', error);

  const errorMessage = error?.message || error?.toString() || '';
  const isChunkError =
    errorMessage.includes('Failed to fetch dynamically imported module') ||
    errorMessage.includes('Failed to fetch') ||
    errorMessage.includes('chunk') ||
    errorMessage.includes('Importing a module script failed') ||
    error?.name === 'TypeError';

  if (isChunkError) {
    const now = Date.now();
    const lastReload = sessionStorage.getItem('last_chunk_reload');
    if (!lastReload || now - Number(lastReload) > 10000) {
      sessionStorage.setItem('last_chunk_reload', String(now));
      window.location.reload();
      return null;
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      padding: '20px',
      direction: 'rtl'
    }}>
      <h2 style={{ color: '#2E2A39', marginBottom: '10px' }}>حدث خطأ أثناء تحميل الصفحة</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        {isChunkError 
          ? 'تم تحديث الموقع. يرجى إعادة تحميل الصفحة للحصول على أحدث نسخة.' 
          : 'حدث خطأ غير متوقع في التطبيق.'}
      </p>
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
