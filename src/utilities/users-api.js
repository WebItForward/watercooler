import sendRequest from "./send-request";
const BASE_URL = "/api/users";

// Signup new user
export async function signUp(userData) {
  return sendRequest(BASE_URL, "POST", userData);
}

// Login exsisting user
export async function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, "POST", credentials);
}

// Get user from Token
export function getUserFromToken(token) {
  if (!token) return null;
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.user;
}

// Check if they have a valid token
export async function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}
