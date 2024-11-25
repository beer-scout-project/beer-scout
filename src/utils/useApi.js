const apiUrl =
  import.meta.env.MODE === "production"
    ? "https://beer-scout-backend-production.up.railway.app" // Production backend URL
    : "http://localhost:8787"; // Development backend URL

export async function addBarPrice(barData) {
  try {
    const response = await fetch(`${apiUrl}/newBarPrices/addBarPrice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(barData), // Send the form data as JSON
    });

    if (!response.ok) {
      const message = await response.json();
      console.error("Error response from server:", message);
      throw new Error(message.message);
    }

    const data = await response.json();
    console.log("Bar price added successfully:", data);
    return data;
  } catch (error) {
    console.error("Error adding bar price:", error);
    throw error;
  }
}

// Function to get bar prices by location
export async function getBarPricesByLocation(location) {
  try {
    const requestUrl = `${apiUrl}/barPrices/getBarPrices/${location}`;
    console.log("Request URL:", requestUrl); // log url

    const response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const message = await response.json();
      console.error("Error response from server:", message);
      throw new Error(message.message);
    }

    const data = await response.json();
    console.log("Bar prices fetched successfully:", data);
    return data.barPrices;
  } catch (error) {
    console.error("Error fetching bar prices:", error);
    throw error;
  }
}

// Function to get new bar prices by location
export async function getNewBarPricesByLocation(location) {
  try {
    const requestUrl = `${apiUrl}/newBarPrices/getBarPrices/${location}`;
    console.log("Request URL:", requestUrl); // log url (for debugging)

    const response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const message = await response.json();
      console.error("Error response from server:", message);
      throw new Error(message.message);
    }

    const data = await response.json();
    console.log("New bar prices fetched successfully:", data);
    return data.barPrices;
  } catch (error) {
    console.error("Error fetching new bar prices:", error);
    throw error;
  }
}

// Function to approve a new bar price
export async function approveNewBarPrice(priceId) {
  try {
    const response = await fetch(`${apiUrl}/newBarPrices/approvePrice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ priceId }),
    });

    if (!response.ok) {
      const message = await response.json();
      console.error("Error response from server:", message);
      throw new Error(message.message);
    }

    const data = await response.json();
    console.log("Price approved and moved to bar_prices:", data);
    sessionStorage.removeItem("barPrices");
    return data;
  } catch (error) {
    console.error("Error approving price:", error);
    throw error;
  }
}

// Function to decline a new bar price
export async function declineNewBarPrice(priceId) {
  try {
    const response = await fetch(`${apiUrl}/newBarPrices/declinePrice`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ priceId }),
    });

    if (!response.ok) {
      const message = await response.json();
      console.error("Error response from server:", message);
      throw new Error(message.message);
    }

    console.log("Price declined and removed from new_bar_prices.");
    return { success: true };
  } catch (error) {
    console.error("Error declining price:", error);
    throw error;
  }
}

// Function to log in
export async function loginUser(email, password) {
  try {
    const response = await fetch(`${apiUrl}/users/login`, {
      method: "POST",
      credentials: "include",
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
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

// Function to log out
export async function logoutUser() {
  try {
    const response = await fetch(`${apiUrl}/users/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      const message = await response.json();
      console.error("API: logoutUser error", message);
      throw new Error(message.message);
    }

    return response.json();
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
}

// Function to authenticate based on the session ID cookie
export async function authUser() {
  try {
    const response = await fetch(`${apiUrl}/users/profile`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const message = await response.json();
      console.error("API: authUser error", message);
      throw new Error(message.message);
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error("Error authenticating user:", error);
    return null; // Return null if authentication fails
  }
}

// Function to report a bar price
export async function reportBarPrice(barPriceId, reason) {
  try {
    const response = await fetch(`${apiUrl}/reportedBarPrices/report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ barPriceId, reason }),
    });

    if (!response.ok) {
      const message = await response.json();
      console.error("Error reporting bar price:", message);
      throw new Error(message.error);
    }

    const data = await response.json();
    console.log("Bar price reported successfully:", data);
    return data;
  } catch (error) {
    console.error("Error reporting bar price:", error);
    throw error;
  }
}

// Function to get reported bar prices (admin)
export async function getReportedBarPrices() {
  try {
    const response = await fetch(`${apiUrl}/reportedBarPrices/getReports`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include credentials if required
    });

    if (!response.ok) {
      const message = await response.json();
      console.error("Error fetching reported bar prices:", message);
      throw new Error(message.error);
    }

    const data = await response.json();
    console.log("Reported bar prices fetched successfully:", data);
    return data.reports;
  } catch (error) {
    console.error("Error fetching reported bar prices:", error);
    throw error;
  }
}

// Function to ignore reports (admin)
export async function ignoreReports(barPriceId) {
  try {
    const response = await fetch(`${apiUrl}/reportedBarPrices/ignoreReports`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include credentials if required
      body: JSON.stringify({ barPriceId }),
    });

    if (!response.ok) {
      const message = await response.json();
      console.error("Error ignoring reports:", message);
      throw new Error(message.error);
    }

    const data = await response.json();
    console.log("Reports ignored successfully:", data);
    return data;
  } catch (error) {
    console.error("Error ignoring reports:", error);
    throw error;
  }
}

// Function to remove bar price and reports (admin)
export async function removeBarPrice(barPriceId) {
  try {
    const response = await fetch(`${apiUrl}/reportedBarPrices/removeBarPrice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include credentials if required
      body: JSON.stringify({ barPriceId }),
    });

    if (!response.ok) {
      const message = await response.json();
      console.error("Error removing bar price:", message);
      throw new Error(message.error);
    }

    const data = await response.json();
    console.log("Bar price and reports removed successfully:", data);
    return data;
  } catch (error) {
    console.error("Error removing bar price:", error);
    throw error;
  }
}
