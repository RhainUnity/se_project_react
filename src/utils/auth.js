// src/utils/auth.js
import { request } from "./api.js";

// --- User Authentication ---
async function signup({ name, email, password, avatar }) {
  return request("/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, avatar }),
  });
}

async function login({ email, password }) {
  return request("/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
}

async function getCurrentUser(token) {
  return request("/users/me", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export { signup, login, getCurrentUser };
