import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_STORE_DATA } from "@/core/constants/storage";

interface AuthContextType {
  isAuthenticated: boolean | null;
  setAuthrotized: () => void;
  setUnAuthrotized: () => void;
  user: {
    name: string;
    email: string;
    token: string;
  } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{
  children: ReactNode;
  userHasToken: boolean;
  isAppReady: boolean;
}> = ({ children, userHasToken, isAppReady }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<{
    name: string;
    email: string;
    token: string;
  } | null>(null);

  const getDataFromAsyncStorage = async () => {
    const userAndToken = await AsyncStorage.getItem(USER_STORE_DATA);

    const user = JSON.parse(userAndToken || "{}");

    if (user) {
      setUser(user);
    }
  };

  const setAuthrotized = () => {
    setIsAuthenticated(true);
    getDataFromAsyncStorage();
  };

  useEffect(() => {
    if (isAppReady && userHasToken) {
      return setAuthrotized();
    }

    if (isAppReady && !userHasToken) {
      return setIsAuthenticated(false);
    }
  }, [isAppReady, userHasToken]);

  const setUnAuthrotized = () => {
    setIsAuthenticated(false);
    setUser(null);
    AsyncStorage.removeItem(USER_STORE_DATA);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setAuthrotized, setUnAuthrotized, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
