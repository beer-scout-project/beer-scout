import { useEffect, useState } from "react";
import User from "../utils/User";

export default function useApi() {
  const [user, setUser] = useState(null);

  // Store user in local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // Set user from local storage on mount
  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const createNewUser = (firstName, lastName, userName, email, password) => {
    const newUser = new User(firstName, lastName, userName, email, password);
    setUser(newUser);
  };

  return { user, setUser, createNewUser };
}
