import { useEffect, useState } from "react";
import User from "../utils/User";

export default function useApi() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const createNewUser = (firstName, lastName, userName, email, password) => {
    const newUser = new User(firstName, lastName, userName, email, password);
    setUser(newUser);
  };

  return { user, setUser, createNewUser };
}
