import lazyRetry from 'utils/lazyRetry';

// project-imports
import AuthLayout from 'layout/Auth';
import Loadable from 'components/Loadable';
import RouteErrorBoundary from 'components/RouteErrorBoundary';

// render - login
const AuthLogin = Loadable(lazyRetry(() => import('pages/auth/auth1/login')));
const AuthRegister = Loadable(lazyRetry(() => import('pages/auth/auth1/register')));
const AuthForgotPassword = Loadable(lazyRetry(() => import('pages/auth/auth1/forgot-password')));
const AuthCheckMail = Loadable(lazyRetry(() => import('pages/auth/auth1/check-mail')));
const AuthResetPassword = Loadable(lazyRetry(() => import('pages/auth/auth1/reset-password')));
const AuthCodeVerification = Loadable(lazyRetry(() => import('pages/auth/auth1/code-verification')));

// ==============================|| AUTH ROUTES ||============================== //

const LoginRoutes = {
  path: '/auth',
  element: <AuthLayout />,
  errorElement: <RouteErrorBoundary />,
  children: [
    {
      index: true,
      element: <AuthLogin />
    },
    {
      path: 'login',
      element: <AuthLogin />
    },
    {
      path: 'register',
      element: <AuthRegister />
    },
    {
      path: 'forgot-password',
      element: <AuthForgotPassword />
    },
    {
      path: 'check-mail',
      element: <AuthCheckMail />
    },
    {
      path: 'reset-password',
      element: <AuthResetPassword />
    },
    {
      path: 'code-verification',
      element: <AuthCodeVerification />
    }
  ]
};

export default LoginRoutes;
