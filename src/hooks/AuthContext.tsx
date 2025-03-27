import React, { createContext, useState, useContext, ReactNode } from 'react';
import StorageService from '../services/storage.service';
import { generateCsrfToken } from '../services/tokens.service';
import { setCsrfToken } from '../services/axios-client';

interface LoggedInUser {
  loggedInId: string | null;
  loggedInUsing: string | null;
}

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  loggedInUser: LoggedInUser;
  setLoggedInUser: React.Dispatch<React.SetStateAction<LoggedInUser>>;
  login: () => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser>({
    loggedInId: null,
    loggedInUsing: null,
  });

  const login = () => {
    setIsAuthenticated(true);
    generateCsrfToken()
      .then((response: any) => {
        const token = response?.data?.token;
        if (token) {
          setCsrfToken(token);
          StorageService.lStorage.setTokenCsrf(token);
        } else {
          console.error('No token received from generateCsrfToken');
        }
      })
      .catch((error: any) => {
        console.error('Error generating CSRF token:', error);
      });
  };

  const logout = () => {
    setIsAuthenticated(false);
    // Assuming setCsrfToken accepts an empty string to clear the token
    setCsrfToken('');
    StorageService.lStorage.clearAll();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loggedInUser,
        setLoggedInUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
