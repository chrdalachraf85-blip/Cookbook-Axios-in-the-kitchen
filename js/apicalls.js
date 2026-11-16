export const api = window.axios.create({
    baseURL : 'https://dummyjson.com/recipes',
    timeout: 10000,
})
export function getdata(){
    return api.get("/" ,{ params: { limit: 12} })
        .then(({ data }) => {
            return data.recipes;
        })
        .catch((error) => {
            console.error( error);
        })
        .finally(()=> {console.log("placeholder")})
}
