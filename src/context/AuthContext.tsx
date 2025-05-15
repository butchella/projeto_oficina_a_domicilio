import React, { createContext, useState, useContext, useEffect } from 'react';

type UserRole = 'gestor' | 'mecanico';

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string, role: UserRole) => boolean;
  logout: () => void;
};

type User = {
  name: string;
  email: string;
  role: UserRole;
  displayRole: string;
};

const MOCK_USERS = {
  gestor: {
    email: 'rafael@velox.com',
    password: 'admin123',
    name: 'Eng. Rafael Lima',
    displayRole: 'Gestor de Frota',
  },
  mecanico: {
    email: 'carlos@velox.com',
    password: 'tech123',
    name: 'Carlos Silva',
    displayRole: 'Mecânico Especialista',
  },
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email: string, password: string, role: UserRole): boolean => {
    const mockUser = MOCK_USERS[role];
    if (email === mockUser.email && password === mockUser.password) {
      const userData = {
        name: mockUser.name,
        email: mockUser.email,
        role: role,
        displayRole: mockUser.displayRole,
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};