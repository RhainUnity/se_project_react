const baseUrl = "http://localhost:3002";

function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

function postItems(item) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))
  );
}

// function deleteItems(item) {
//   return fetch(`${baseUrl}/items/`, {
//     method: "DELETE",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(item),
//   }).then((res) =>
//     res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))
//   );
// }

async function deleteItems(id) {
  // id === the _id value
  const res = await fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return true;
}

export { getItems, postItems, deleteItems };
