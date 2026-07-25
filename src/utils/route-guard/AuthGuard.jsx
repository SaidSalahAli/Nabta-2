import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// project-imports
import useAuth from 'hooks/useAuth';

// ==============================|| AUTH GUARD ||============================== //

export default function AuthGuard({ children, requiredRole = null }) {
  const { isLoggedIn, isInitialized, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Wait until auth state is fully initialized before redirecting
    if (!isInitialized) return;

    if (!isLoggedIn) {
      navigate('/auth/login', {
        state: {
          from: location.pathname
        },
        replace: true
      });
    } else if (requiredRole && user?.role !== requiredRole) {
      // If a specific role is required and user doesn't have it, redirect to home
      navigate('/', { replace: true });
    }
  }, [isLoggedIn, isInitialized, user, navigate, location, requiredRole]);

  return children;
}

AuthGuard.propTypes = {
  children: PropTypes.any,
  requiredRole: PropTypes.string
};
