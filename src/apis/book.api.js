import apiClient from "../utils/apiClient"
async function getListBook() {
    return apiClient.get('/books').then(res => res.data)
};

async function getBookById(id) {
    return apiClient.get(`/book/${id}`).then(res => res.data)
};

const createBook = (data) => {
    let formData = new FormData();
    formData.append("Name", data.Name);
    formData.append("Description", data.Description);
    formData.append("IdCategory", data.IdCategory);
    formData.append("IdPublisher", data.IdPublisher);
    formData.append("Pages", data.Pages);
    formData.append("Price", data.Price);
    formData.append("PublicationDate", data.PublicationDate);
    data.IdAuthors.forEach((item) => {
        formData.append("IdAuthors[]", item)
    });
    data.list_img.forEach((item) => {
        formData.append("list_img", item.files)
    });
    return apiClient.post('/books', formData, {
        headers: {
          "content-Type": "multipart/form-data",
    }})
}

const updateBook = (data) => {
    return apiClient.put(`/book/${data.id}`, data);
}
export {
    getListBook,
    getBookById,
    createBook,
    updateBook
}