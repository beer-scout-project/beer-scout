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

  const validateUser = (email, password) => {
    // check if user exists
    if (user) {
      // if yes, verify username and password
      if (email === user.email && password === user.password) {
        // if correct, return valid user
        return "valid";
      } else {
        // if not correct, return null
        return "invalid";
      }
    } else {
      // if no user, create new user
      return "user does not exist";
    }
  };

  const getStoredUser = () => {
    // get user from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    // check if user exists
    if (storedUser) {
      // if yes, set user
      setUser(
        new User(
          storedUser.firstName,
          storedUser.lastName,
          storedUser.userName,
          storedUser.email,
          storedUser.password,
        ),
      );
    } else {
      // if no user, return null
      return null;
    }
  };

  return { user, setUser, createNewUser, validateUser };
}
