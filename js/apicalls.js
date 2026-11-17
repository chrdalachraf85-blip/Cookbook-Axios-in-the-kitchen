export const api = window.axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
});

export async function getdata() {
  const res = await api.get("/recipes", { params: { limit: 12 } });
  return res.data;
}
export async function searchdata(search) {
    const res = await api.get("/recipes/search", {params : {limit : 12 , q:search}})
    return res.data
}
