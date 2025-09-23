const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`).then(checkRequestResult);
}

function postItems(item) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  }).then(checkRequestResult);
}

async function deleteItems(id) {
  const res = await fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

function checkRequestResult(res) {
  return res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`));
}

export { getItems, postItems, deleteItems, checkRequestResult };
