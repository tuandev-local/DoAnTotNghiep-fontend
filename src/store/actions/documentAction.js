import { toast } from "react-toastify";
import {
    handleGetDocumentsPagination,
    getDetailDocumentInfo, handleAddFavourDocument, handleGetFavourDocument, handleGetFaculty,
    handleGetMajor, handleGetDocumentByFaculty, handleGetDocumentByMajor, handleGetDocumentByKeyword,
    handleGetSuggestDocument
}
    from "../../services/documentServices";

export const uploadDocumentFail = () => ({
    type: 'UPLOAD_DOCUMENT_FAIL'
})

export const uploadDocumentSuccess = (documentInfo) => ({
    type: 'UPLOAD_DOCUMENT_SUCCESS',
    documentInfo: documentInfo,
})

export const getFile = (fileInput) => ({
    type: 'GET_FILE',
    file: fileInput,

})

export const getDocuments = (pageInput, tokenInput) => {
    return async (dispatch, getState) => {
        try {
            let limitInput = 5;
            let response = await handleGetDocumentsPagination(pageInput, limitInput, tokenInput);

            if (response && response.data && response.data.errCode === 0) {
                dispatch(getDocumentsSuccess(response.data));
            }
            else {
                dispatch(getDocumentsFail());
            }
        } catch (error) {
            console.log(error);
            dispatch(getDocumentsFail());
        }
    }


}

export const getDocumentsFail = () => ({
    type: 'GET_DOCUMENTS_PAGINATION_FAIL'
})

export const getDocumentsSuccess = (data) => ({
    type: 'GET_DOCUMENTS_PAGINATION_SUCCESS',
    documents: data.documents,
    totalPage: data.totalPage,
    currentPage: data.currentPage,
})

export const getDetailDocument = (idInput, tokenInput) => {
    return async (dispatch, getState) => {
        try {
            let response = await getDetailDocumentInfo(idInput, tokenInput);
            console.log('check res: ', response);
            if (response && response.data && response.data.errCode === 0) {
                dispatch(getDetailDocumentSuccess(response.data));
            }
            else {
                dispatch(getDetailDocumentFail());
            }
        } catch (error) {
            console.log(error);
            dispatch(getDetailDocumentFail());
        }
    }


}

export const getDetailDocumentFail = () => ({
    type: 'GET_DETAIL_DOCUMENT_FAIL'
})

export const getDetailDocumentSuccess = (data) => ({
    type: 'GET_DETAIL_DOCUMENT_SUCCESS',
    documentInfo: data,

})

export const addFavourDocumentRedux = (data, tokenInput) => {
    return async (dispatch, getState) => {
        try {
            let response = await handleAddFavourDocument(data, tokenInput);
            if (response && response.data && response.data.errCode === 0) {
                toast.success(response.data.errMessage);
                dispatch(addFavourDocumentSuccess());
            }
            else {
                toast.error(response.data.errMessage);
                dispatch(addFavourDocumentFail());
            }
        } catch (error) {
            console.log(error);
            dispatch(addFavourDocumentFail());
        }
    }


}

export const addFavourDocumentFail = () => ({
    type: 'ADD_FAVOUR_DOCUMENT_FAIL'
})

export const addFavourDocumentSuccess = () => ({
    type: 'ADD_FAVOUR_DOCUMENT_SUCCESS',

})

export const getFavourDocumentRedux = (userId, tokenInput) => {
    return async (dispatch, getState) => {
        try {
            let response = await handleGetFavourDocument(userId, tokenInput);
            if (response && response.data && response.data.errCode === 0) {
                dispatch(getFavourDocumentSuccess(response.data.doc));
            }
            else {
                dispatch(getFavourDocumentFail());
            }
        } catch (error) {
            console.log(error);
            dispatch(getFavourDocumentFail());
        }
    }


}

export const getFavourDocumentFail = () => ({
    type: 'GET_FAVOUR_DOCUMENT_FAIL'
})

export const getFavourDocumentSuccess = (data) => ({
    type: 'GET_FAVOUR_DOCUMENT_SUCCESS',
    favourDocuments: data
})

export const getFacultyRedux = () => {
    return async (dispatch, getState) => {
        try {
            let response = await handleGetFaculty();
            if (response && response.data) {
                dispatch(getFacultySuccess(response.data));
            }
            else {
                dispatch(getFacultyFail());
            }
        } catch (error) {
            console.log(error);
            dispatch(getFacultyFail());
        }
    }


}

export const getFacultyFail = () => ({
    type: 'GET_FACULTY_FAIL'
})

export const getFacultySuccess = (data) => ({
    type: 'GET_FACULTY_SUCCESS',
    faculty: data,

})

export const getMajorRedux = () => {
    return async (dispatch, getState) => {
        try {
            let response = await handleGetMajor();
            if (response && response.data) {
                dispatch(getMajorSuccess(response.data));
            }
            else {
                dispatch(getMajorFail());
            }
        } catch (error) {
            console.log(error);
            dispatch(getMajorFail());
        }
    }


}

export const getMajorFail = () => ({
    type: 'GET_MAJOR_FAIL'
})

export const getMajorSuccess = (data) => ({
    type: 'GET_MAJOR_SUCCESS',
    major: data,

})

export const fillterFacultyRedux = (faculty, token) => {
    return async (dispatch, getState) => {
        try {
            let response = await handleGetDocumentByFaculty(faculty, token);
            if (response && response.data) {
                dispatch(fillterFacultySuccess(response.data.doc));
            }
            else {
                dispatch(fillterFacultyFail());
            }
        } catch (error) {
            console.log(error);
            dispatch(fillterFacultyFail());
        }
    }


}

export const fillterFacultyFail = () => ({
    type: 'FILLTER_FACULTY_FAIL'
})

export const fillterFacultySuccess = (data) => ({
    type: 'FILLTER_FACULTY_SUCCESS',
    facultyDocument: data
})

export const fillterMajorRedux = (major, token) => {
    return async (dispatch, getState) => {
        try {
            let response = await handleGetDocumentByMajor(major, token);
            if (response && response.data) {
                dispatch(fillterMajorSuccess(response.data.doc));
            }
            else {
                dispatch(fillterMajorFail());
            }
        } catch (error) {
            console.log(error);
            dispatch(fillterMajorFail());
        }
    }


}

export const fillterMajorFail = () => ({
    type: 'FILLTER_MAJOR_FAIL'
})

export const fillterMajorSuccess = (data) => ({
    type: 'FILLTER_MAJOR_SUCCESS',
    majorDocument: data
})

export const searchByKeywordRedux = (keyword, token) => {
    return async (dispatch, getState) => {
        try {
            let response = await handleGetDocumentByKeyword(keyword, token);
            if (response && response.data && response.data.errCode === 0) {
                dispatch(searchByKeywordSuccess(response.data.document));
            }
            else {
                toast.error(response.data.errMessage);
                dispatch(searchByKeywordFail());
            }
        } catch (error) {
            console.log(error);
            dispatch(searchByKeywordFail());
        }
    }


}

export const searchByKeywordFail = () => ({
    type: 'SEARCH_BY_KEYWORD_FAIL'
})

export const searchByKeywordSuccess = (data) => ({
    type: 'SEARCH_BY_KEYWORD_SUCCESS',
    searchDocument: data
})


export const getSuggestDocument = (idInput, tokenInput) => {
    return async (dispatch, getState) => {
        try {
            let response = await handleGetSuggestDocument(idInput, tokenInput);
            if (response && response.data && response.data.errCode === 0) {
                dispatch(getSuggestDocumentSuccess(response.data.results));
            }
            else {
                dispatch(getSuggestDocumentFail());
            }
        } catch (error) {
            console.log(error);
            dispatch(getSuggestDocumentFail());
        }
    }


}

export const getSuggestDocumentFail = () => ({
    type: 'GET_SUGGEST_DOCUMENT_FAIL'
})

export const getSuggestDocumentSuccess = (data) => ({
    type: 'GET_SUGGEST_DOCUMENT_SUCCESS',
    suggestDocument: data,

})