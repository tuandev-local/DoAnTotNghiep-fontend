import axios from '../axios';

const handleUploadTheDocument = (formData, tokenInput) => {
    return axios.post('/api/upload-documents', formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${tokenInput}` },
    })
}

const handleGetFaculty = () => {
    return axios.get('/api/get-faculty')
}

const handleGetMajor = () => {
    return axios.get('/api/get-major')
}

const handleGetDocumentsPagination = (page, limit, tokenInput) => {
    return axios.get(`/api/get-documents?page=${page}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${tokenInput}` },
    })
}

const getDetailDocumentInfo = (idInput, tokenInput) => {

    return axios.get(`/api/get-detail-document-by-id?id=${idInput}`, {
        headers: { Authorization: `Bearer ${tokenInput}` }
    })
}

const getDownloadDocumentById = (idInput) => {
    return axios.get(`/api/download-document-by-id?id=${idInput}`)
}

const handleAddFavourDocument = (data, tokenInput) => {
    return axios.post('/api/add-favour-document', data, {
        headers: { Authorization: `Bearer ${tokenInput}` }
    })
}

const handleGetFavourDocument = (userId, tokenInput) => {
    return axios.get(`/api/get-favour-document?userId=${userId}`, {
        headers: { Authorization: `Bearer ${tokenInput}` }
    })
}

const handleGetPendingDocument = (statusInput, tokenInput) => {
    return axios.get(`/api/get-manage-document?status=${statusInput}`, {
        headers: { Authorization: `Bearer ${tokenInput}` }
    })
}

const handlePutRejectDocument = (documentId, tokenInput) => {
    return axios.put(`/api/reject-document?id=${documentId}`, {}, {
        headers: { Authorization: `Bearer ${tokenInput}` }
    })
}

const handlePutApproveDocument = (documentId, tokenInput) => {
    return axios.put(`/api/approve-document?id=${documentId}`, {}, {
        headers: { Authorization: `Bearer ${tokenInput}` }
    })
}

const handleGetDocumentByFaculty = (facultyId, tokenInput) => {
    return axios.get(`/api/get-document-facultyId?facultyId=${facultyId}`, {
        headers: { Authorization: `Bearer ${tokenInput}` }
    })
}

const handleGetDocumentByMajor = (majorId, tokenInput) => {
    return axios.get(`/api/get-document-majorId?majorId=${majorId}`, {
        headers: { Authorization: `Bearer ${tokenInput}` }
    })
}

const handleGetDocumentByKeyword = (keywordInput, tokenInput) => {
    return axios.get(`/api/search-document-by-keyword?keyword=${keywordInput}`, {
        headers: { Authorization: `Bearer ${tokenInput}` }
    })
}

const handleGetSuggestDocument = (documentId, tokenInput) => {
    return axios.get(`/api/suggest-document?id=${documentId}`, {
        headers: { Authorization: `Bearer ${tokenInput}` }
    })
}

export {
    handleUploadTheDocument,
    handleGetFaculty,
    handleGetMajor,
    handleGetDocumentsPagination,
    getDetailDocumentInfo,
    getDownloadDocumentById,
    handleAddFavourDocument,
    handleGetFavourDocument,
    handleGetPendingDocument,
    handlePutRejectDocument,
    handlePutApproveDocument,
    handleGetDocumentByFaculty,
    handleGetDocumentByMajor,
    handleGetDocumentByKeyword,
    handleGetSuggestDocument
}