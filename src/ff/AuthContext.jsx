
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const register = async (formData) => {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      }),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    return await response.json();
  };

  const login = async (email, password) => {
    const response = await fetch("http://localhost:3000/users");

    if (!response.ok) {
      throw new Error("Unable to load users");
    }

    const users = await response.json();

    const foundUser = users.find(
      (item) =>
        item.email === email &&
        item.password === password
    );

    if (foundUser) {
      setUser({
        id: foundUser.id,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        email: foundUser.email,
      });
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);