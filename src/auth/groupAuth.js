export const creategroup = (data) => {
  return fetch("http://localhost:8000/api/creategroup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log("then", response);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
