import React, { createContext, useEffect, useReducer } from 'react';

// third-party
import { Chance } from 'chance';
import { jwtDecode } from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'contexts/auth-reducer/actions';
import authReducer from 'contexts/auth-reducer/auth';

// project-imports
import Loader from 'components/Loader';
import axios from 'utils/axios';

const chance = new Chance();

// constant
const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

const verifyToken = (serviceToken) => {
  if (!serviceToken) return false;
  try {
    const decoded = jwtDecode(serviceToken);
    // بعض التوكنات ما فيها exp — نعتبرها صالحة
    if (!decoded.exp) return true;
    return decoded.exp > Date.now() / 1000;
  } catch {
    return false;
  }
};

const setSession = (serviceToken) => {
  if (serviceToken) {
    localStorage.setItem('serviceToken', serviceToken);
    axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    localStorage.removeItem('serviceToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

// استخرج بيانات المستخدم من الـ token مباشرة
const getUserFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return {
      id: decoded.id || decoded.UserId,
      email: decoded.email || decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || '',
      firstName: decoded.firstName || '',
      lastName: decoded.lastName || '',
      role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || decoded.role || 'User'
    };
  } catch {
    return null;
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const init = async () => {
      const minDisplay = 1000;
      const start = Date.now();
      try {
        const serviceToken = localStorage.getItem('serviceToken');

        if (serviceToken && verifyToken(serviceToken)) {
          setSession(serviceToken);

          const user = getUserFromToken(serviceToken);

          const elapsed = Date.now() - start;
          if (elapsed < minDisplay) await new Promise((r) => setTimeout(r, minDisplay - elapsed));
          dispatch({
            type: LOGIN,
            payload: { isLoggedIn: true, user }
          });
        } else {
          const elapsed = Date.now() - start;
          if (elapsed < minDisplay) await new Promise((r) => setTimeout(r, minDisplay - elapsed));
          dispatch({ type: LOGOUT });
        }
      } catch (err) {
        console.error(err);
        const elapsed = Date.now() - start;
        if (elapsed < minDisplay) await new Promise((r) => setTimeout(r, minDisplay - elapsed));
        dispatch({ type: LOGOUT });
      }
    };

    init();
  }, []);

  const login = async (email, password) => {
    const response = await axios.post('api/AccountNabta/Login', { email, password });
    const data = response.data;
    const token = data.accessToken || data.token || data.serviceToken;
    setSession(token);

    const userFromToken = getUserFromToken(token);

    dispatch({
      type: LOGIN,
      payload: { isLoggedIn: true, user: userFromToken || data.user || data }
    });
  };

  const register = async (email, password, firstName, lastName, mobile) => {
    const payload = {
      email,
      password,
      firstName,
      lastName,
      mobail: mobile || ''
    };

    const response = await axios.post('api/AccountNabta/Rigester', payload);

    const data = response.data || response;
    const serviceToken = data.accessToken || data.serviceToken || data.token;
    if (serviceToken) setSession(serviceToken);

    return data;
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: LOGOUT });
  };

  const forgotPassword = async (email) => {
    const response = await axios.post('api/AccountNabta/ForgotPassword', { email });
    return response.data;
  };

  const verifyOtp = async (email, otp) => {
    const response = await axios.post('api/AccountNabta/VerifyOtp', { email, otp });
    return response.data;
  };

  const confirmResetPassword = async (email, otp, newPassword) => {
    const response = await axios.post('api/AccountNabta/ResetPassword', { email, otp, newPassword });
    return response.data;
  };

  const resetPassword = async (email) => {
    return await forgotPassword(email);
  };

  const updateProfile = () => {};

  const loginWithGoogle = async (credentialResponse) => {
    const { credential: googleAccessToken, userInfo } = credentialResponse;
    const response = await axios.post('api/AccountNabta/GoogleLogin', {
      accessToken: googleAccessToken,
      email: userInfo?.email,
      firstName: userInfo?.given_name || '',
      lastName: userInfo?.family_name || '',
      picture: userInfo?.picture || ''
    });
    const data = response.data;
    const token = data.accessToken || data.token || data.serviceToken;
    setSession(token);

    const userFromToken = getUserFromToken(token);

    dispatch({
      type: LOGIN,
      payload: { isLoggedIn: true, user: userFromToken || data.user || data }
    });
  };

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return (
    <JWTContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
        loginWithGoogle,
        resetPassword,
        forgotPassword,
        verifyOtp,
        confirmResetPassword,
        updateProfile
      }}
    >
      {children}
    </JWTContext.Provider>
  );
};

export default JWTContext;
