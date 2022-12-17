import apiClient from "../utils/apiClient"

async function getCategories(){
    return apiClient.get('/categories').then(res => res.data)
};

const createCate = (data) => {
    return apiClient.post('/categories', data)
}

const editCate = (data) => {
    return apiClient.put(`/category/${data.id}`, data)
}

const deleteCate = (dataId) => {
    return apiClient.delete(`/category/${dataId}`)
}
export {
    getCategories,
    createCate,
    editCate,
    deleteCate,
}