
const initialState = {
    file: null,
    documents: [],
    totalPage: 1,
    currentPage: 1,
    documentInfo: null,
    favourDocuments: [],
    faculty: [],
    major: [],
    facultyDocument: [],
    majorDocument: [],
    searchDocument: [],
    suggestDocument: []
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPLOAD_DOCUMENT_SUCCESS':

            return {
                ...state,
                file: null,

            }

        case 'UPLOAD_DOCUMENT_FAIL':
            return {
                ...state,
                file: null,

            }
        case 'GET_FILE':
            return {
                ...state,
                file: action.file,

            }
        case 'GET_DOCUMENTS_PAGINATION_SUCCESS':

            return {
                ...state,
                documents: action.documents,
                totalPage: action.totalPage,
                currentPage: action.currentPage,
            }

        case 'GET_DOCUMENTS_PAGINATION_FAIL':
            return {
                ...state,
                file: null,
                documents: [],
                totalPage: 1,
                currentPage: 1

            }

        case 'GET_DETAIL_DOCUMENT_SUCCESS':

            return {
                ...state,
                documentInfo: action.documentInfo,
            }

        case 'GET_DETAIL_DOCUMENT_FAIL':
            return {
                ...state,
                documentInfo: null
            }
        case 'GET_FAVOUR_DOCUMENT_SUCCESS':

            return {
                ...state,
                favourDocuments: action.favourDocuments
            }

        case 'GET_FAVOUR_DOCUMENT_FAIL':
            return {
                ...state,
                favourDocuments: []
            }
        case 'GET_FACULTY_SUCCESS':

            return {
                ...state,
                faculty: action.faculty,
            }

        case 'GET_FACULTY_FAIL':
            return {
                ...state,
                faculty: []
            }
        case 'GET_MAJOR_SUCCESS':

            return {
                ...state,
                major: action.major,
            }

        case 'GET_MAJOR_FAIL':
            return {
                ...state,
                major: []
            }
        case 'FILLTER_FACULTY_SUCCESS':

            return {
                ...state,
                facultyDocument: action.facultyDocument,
            }

        case 'FILLTER_FACULTY_FAIL':
            return {
                ...state,
                facultyDocument: []
            }
        case 'FILLTER_MAJOR_SUCCESS':

            return {
                ...state,
                majorDocument: action.majorDocument,
            }

        case 'FILLTER_MAJOR_FAIL':
            return {
                ...state,
                majorDocument: []
            }
        case 'SEARCH_BY_KEYWORD_SUCCESS':

            return {
                ...state,
                searchDocument: action.searchDocument,
            }

        case 'SEARCH_BY_KEYWORD_FAIL':
            return {
                ...state,
                searchDocument: []
            }
        case 'GET_SUGGEST_DOCUMENT_SUCCESS':

            return {
                ...state,
                suggestDocument: action.suggestDocument,
            }

        case 'GET_SUGGEST_DOCUMENT_FAIL':
            return {
                ...state,
                suggestDocument: []
            }
        default:
            return state;
    }
}

export default appReducer;