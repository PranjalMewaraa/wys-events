import { jwtDecode } from "jwt-decode";
export const decodeToken = (token) => {
  if (!token) return null;

  try {
    return jwtDecode(token); // Automatically decodes JWT payload
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

// Example usage

// Logged-in user's name
