import apiClient from "../utils/apiClient"

async function getPushlishers(){
    return apiClient.get('/publishers').then(res => res.data)
};

export {
    getPushlishers,
}