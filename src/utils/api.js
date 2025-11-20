// api.js
const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

function checkRequestResult(res) {
  return res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`));
}

// generic helper the reviewer mentioned
export function request(path, options = {}) {
  return fetch(`${baseUrl}${path}`, options).then(checkRequestResult);
}

// // --- User Authentication ---
// async function signup({ name, email, password, avatar }) {
//   const res = await fetch(`${baseUrl}/signup`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ name, email, password, avatar }),
//   });
//   return checkRequestResult(res);
// }

// async function login({ email, password }) {
//   const res = await fetch(`${baseUrl}/signin`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   });
//   return checkRequestResult(res);
// }

// async function getCurrentUser(token) {
//   const res = await fetch(`${baseUrl}/users/me`, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return checkRequestResult(res);
// }

// --- Clothing Items ---
async function getItems(token) {
  return request("/items", {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
}

async function postItems(item, token) {
  return request("/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(item),
  });
}

async function updateUser(data, token) {
  return request("/users/me", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

async function deleteItems(id, token) {
  return request(`/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
}

async function addCardLike(id, token) {
  return request(`/items/${id}/likes`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
}

async function removeCardLike(id, token) {
  return request(`/items/${id}/likes`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export {
  getItems,
  postItems,
  deleteItems,
  checkRequestResult,
  updateUser,
  addCardLike,
  removeCardLike,
};
