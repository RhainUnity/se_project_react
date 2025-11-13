// api.js
const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";
// // // const baseUrl = "http://localhost:3001";

// --- User Authentication ---
async function signup({ name, email, password, avatar }) {
  const res = await fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, avatar }),
  });
  return checkRequestResult(res);
}

async function login({ email, password }) {
  const res = await fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return checkRequestResult(res);
}

async function getCurrentUser(token) {
  const res = await fetch(`${baseUrl}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return checkRequestResult(res);
}

// --- Clothing Items ---
async function getItems(token) {
  const res = await fetch(`${baseUrl}/items`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return checkRequestResult(res);
}

async function postItems(item, token) {
  const res = await fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(item),
  });
  return checkRequestResult(res);
}

async function updateUser(data, token) {
  const res = await fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return checkRequestResult(res);
}

async function deleteItems(id, token) {
  const res = await fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

export async function addCardLike(id, token) {
  const res = await fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
  return checkRequestResult(res);
}

export async function removeCardLike(id, token) {
  const res = await fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return checkRequestResult(res);
}

function checkRequestResult(res) {
  return res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`));
}

export {
  getItems,
  postItems,
  deleteItems,
  checkRequestResult,
  signup,
  login,
  getCurrentUser,
  updateUser,
};
