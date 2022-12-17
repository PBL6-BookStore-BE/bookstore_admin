import apiClient from "../utils/apiClient"

async function getAuthors(){
    return apiClient.get('/authors').then(res => res.data)
};

const createAuthor = (data) => {
    return apiClient.post('/authors', data)
}

const editAuthor = (data) => {
    return apiClient.put(`/author/${data.id}`, data)
}

const deleteAuthor = (dataId) => {
    return apiClient.delete(`/author/${dataId}`)
}
export {
    getAuthors,
    createAuthor,
    editAuthor,
    deleteAuthor,
}