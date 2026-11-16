export const api = window.axios.create({
  baseURL: "https://dummyjson.com/recipes",
  timeout: 10000,
});

export async function getdata() {
  const res = await api.get("/", { params: { limit: 12 } });
  return res.data;
}

