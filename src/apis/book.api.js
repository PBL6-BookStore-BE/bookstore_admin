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
        console.log(item.files);
        formData.append("list_img", item.files)
    });
    return apiClient.post('/books', formData, {
        headers: {
          "content-Type": "multipart/form-data",
    }})
}

const updateBook = (data) => {
    let formData = new FormData();
    formData.append("Name", data.name);
    formData.append("Description", data.description);
    formData.append("IdCategory", data.idCategory);
    formData.append("IdPublisher", data.idPublisher);
    formData.append("Pages", data.pages);
    formData.append("Price", data.price);
    formData.append("PublicationDate", data.publicationDate);
    formData.append("Id", data.id);
    data.idAuthors.forEach((item) => {
        formData.append("IdAuthors[]", item)
    });
    if (data.list_img === null) {
        formData.append("list_img", null);
    } else {
        data.list_img.forEach((item) => {
            formData.append("list_img", item)
        });
    }
    return apiClient.put(`/book/${data.id}`, formData, {
        headers: {
            "content-Type": "multipart/form-data",
        }
    });
}

const deleteBook = (dataId) => {
    let formData = new FormData();
    formData.append("id", dataId);
    return apiClient.delete(`/book/${dataId}`, formData, {
        headers: {
            "content-Type": "multipart/form-data",
    }})
}
export {
    getListBook,
    getBookById,
    createBook,
    updateBook,
    deleteBook
}