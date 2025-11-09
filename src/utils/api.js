const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";
// // // const baseUrl = "http://localhost:3001";

// --- User Authentication ---
function signup({ name, email, password }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  }).then(checkRequestResult);
}

function login({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(checkRequestResult);
}

export function getCurrentUser(token) {
  return fetch(`${baseUrl}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkRequestResult);
}

// --- Clothing Items ---
function getItems() {
  return fetch(`${baseUrl}/items`).then(checkRequestResult);
}

function postItems(item) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(item),
  }).then(checkRequestResult);
}

async function deleteItems(id) {
  const res = await fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

function checkRequestResult(res) {
  return res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`));
}

export { getItems, postItems, deleteItems, checkRequestResult };
