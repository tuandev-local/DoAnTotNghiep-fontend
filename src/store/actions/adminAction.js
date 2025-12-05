import { getUserInfo, handleDeleteUser, sigUpUser, getAllCode, handlePutUpdateUser, } from '../../services/userServices';
import { handleGetPendingDocument, handlePutRejectDocument, handlePutApproveDocument } from '../../services/documentServices';
import { toast } from 'react-toastify';

export const getAllUser = (token) => {
    return async (dispatch, getState) => {
        try {
            let response = await getUserInfo('ALL', token);
            if (response && response.data) {
                dispatch(getUserSuccess(response.data));
            }
            else {
                dispatch(getUserFail());
            }
        } catch (error) {
            console.log(error);
            dispatch(getUserFail());
        }
    }


}

export const getUserFail = () => ({
    type: 'GET_USER_FAIL'
})

export const getUserSuccess = (userData) => ({
    type: 'GET_USER_SUCCESS',
    arrUser: userData,
})
//delete user
export const DeleteUserAction = (userId, token) => {
    return async (dispatch, getState) => {
        try {
            let response = await handleDeleteUser(userId, token);
            if (response && response.data.errCode === 0) {
                dispatch(DeleteUserActionSuccess());
                toast.success('Delete user success!');
                dispatch(getAllUser(token));
            }
            else {
                toast.error('Delete user fail!');
                dispatch(DeleteUserActionFail());
            }
        } catch (error) {
            console.log(error);
            toast.error('Delete user fail!');
            dispatch(DeleteUserActionFail());
        }
    }


}

export const DeleteUserActionFail = () => ({
    type: 'DELETE_USER_ACTION_FAIL'
})

export const DeleteUserActionSuccess = () => ({
    type: 'DELETE_USER_ACTION_SUCCESS',

})
//fetch role
export const fetchRoleUser = () => {
    return async (dispatch, getState) => {
        try {
            let response = await getAllCode('ROLE');
            if (response && response.data.errCode === 0) {
                let dataRole = response.data.datatype;
                dispatch(fetchRoleSuccess(dataRole))

            }
            else {
                dispatch(fetchRoleFail());
            }
        } catch (error) {
            console.log(error)
            dispatch(fetchRoleFail());
        }
    }


}

export const fetchRoleFail = () => ({
    type: 'FETCH_ROLE_FAIL'
})

export const fetchRoleSuccess = (roleArr) => ({
    type: 'FETCH_ROLE_SUCCESS',
    arrRole: roleArr,
})

//create user
export const createUserAction = (data, token) => {
    return async (dispatch, getState) => {
        try {
            let response = await sigUpUser(data);
            if (response && response.data.errCode === 0) {
                dispatch(createUserActionSuccess());
                toast.success('Create user success!');
                dispatch(getAllUser(token));
            }
            else {
                toast.error('Create user fail!');
                dispatch(createUserActionFail());
            }
        } catch (error) {
            console.log(error);
            toast.error('Create user fail!');
            dispatch(createUserActionFail());
        }
    }


}

export const createUserActionFail = () => ({
    type: 'CREATE_USER_ACTION_FAIL'
})

export const createUserActionSuccess = () => ({
    type: 'CREATE_USER_ACTION_SUCCESS',

})
//update user
export const updateUserAction = (data, token) => {
    return async (dispatch, getState) => {
        try {
            let response = await handlePutUpdateUser(data, token);
            if (response && response.data.errCode === 0) {
                dispatch(updateUserActionSuccess());
                toast.success('Update user success!');
                dispatch(getAllUser(token));
            }
            else {
                toast.error('Update user fail!');
                dispatch(updateUserActionFail());
            }
        } catch (error) {
            console.log(error);
            toast.error('Update user fail!');
            dispatch(updateUserActionFail());
        }
    }


}

export const updateUserActionFail = () => ({
    type: 'UPDATE_USER_ACTION_FAIL'
})

export const updateUserActionSuccess = () => ({
    type: 'UPDATE_USER_ACTION_SUCCESS',

})

//get pending document
export const getPendingDocument = (status, token) => {
    return async (dispatch, getState) => {
        try {
            let response = await handleGetPendingDocument(status, token);
            if (response && response.data && response.data.errCode === 0) {
                dispatch(getPendingDocumentSuccess(response.data.data));
            }
            else {
                dispatch(getPendingDocumentFail());
            }
        } catch (error) {
            console.log(error);
            dispatch(getPendingDocumentFail());
        }
    }


}

export const getPendingDocumentFail = () => ({
    type: 'GET_PENDING_DOCUMENT_FAIL'
})

export const getPendingDocumentSuccess = (data) => ({
    type: 'GET_PENDING_DOCUMENT_SUCCESS',
    manageDocuments: data,
})

//reject document
export const rejectDocument = (id, token, status) => {
    return async (dispatch, getState) => {
        try {
            let response = await handlePutRejectDocument(id, token);
            if (response && response.data && response.data.errCode === 0) {
                dispatch(rejectDocumentSuccess());
                dispatch(getPendingDocument(status, token));
            }
            else {
                dispatch(rejectDocumentFail());
            }
        } catch (error) {
            console.log(error);
            dispatch(rejectDocumentFail());
        }
    }


}

export const rejectDocumentFail = () => ({
    type: 'REJECT__DOCUMENT_FAIL'
})

export const rejectDocumentSuccess = () => ({
    type: 'REJECT_DOCUMENT_SUCCESS',
})

//approve document
export const approveDocument = (id, token, status) => {
    return async (dispatch, getState) => {
        try {
            let response = await handlePutApproveDocument(id, token);
            if (response && response.data && response.data.errCode === 0) {
                dispatch(approveDocumentSuccess());
                dispatch(getPendingDocument(status, token));
            }
            else {
                dispatch(approveDocumentFail());
            }
        } catch (error) {
            console.log(error);
            dispatch(approveDocumentFail());
        }
    }


}

export const approveDocumentFail = () => ({
    type: 'APPROVE__DOCUMENT_FAIL'
})

export const approveDocumentSuccess = () => ({
    type: 'APPROVE_DOCUMENT_SUCCESS',
})
