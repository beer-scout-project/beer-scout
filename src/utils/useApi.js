import { useEffect, useState } from "react";
import User from "../utils/User";

//temp user functions
const apiUrl = "http://localhost:8787";

export async function registerUser(username, email, password) {
  try {
    const response = await fetch(`${apiUrl}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      const message = await response.json();
      console.error("Error response from server:", message);
      throw new Error(message.message);
    }

    const data = await response.json();
    console.log("User registered successfully:", data);
    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${apiUrl}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const message = await response.json();
      console.error("Error response from server:", message);
      throw new Error(message.message);
    }

    const data = await response.json();
    console.log("User logged in successfully:", data);
    console.log("Logged in user data:", data);
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

//end of temp user functions

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
        // if not correct, return invalid
        return "invalid";
      }
    } else {
      // if no user, return user does not exist
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
