import axios from '../axios';

const sigUpUser = (dataInput) => {

    return axios.post('/api/register', dataInput);
}

const loginUser = (emailInput, passwordInput) => {

    return axios.post('/api/login', { email: emailInput, password: passwordInput });
}

const userAth = (tokenInput) => {
    console.log('check token input', tokenInput);
    return axios.get('/api/auth', {
        headers: { Authorization: `Bearer ${tokenInput}` }
    });
}

const getAllCode = (typeInput) => {

    return axios.get(`/api/allcode?type=${typeInput}`)
}

const getUserInfo = (idInput, tokenInput) => {

    return axios.get(`/api/get-user?id=${idInput}`, {
        headers: { Authorization: `Bearer ${tokenInput}` }
    })
}

const handlePutUpdateUser = (dataInput, tokenInput) => {

    return axios.put('/api/update-user', dataInput, {
        headers: { Authorization: `Bearer ${tokenInput}` }
    })
}
export {
    sigUpUser,
    loginUser,
    userAth,
    getAllCode,
    getUserInfo,
    handlePutUpdateUser
}