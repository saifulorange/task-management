
const checkEmailValidation = (value) => {
    let isValid = false;
    let reg = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

    if(reg.test(value)){
        isValid = true
    }

    return isValid
}

const setTokenLocalStorage = (token) => {
    let tokens = JSON.stringify(token);
    localStorage.setItem('token', tokens);
}

const getToken = () => {
    let userToken = localStorage.getItem('token');
    if(userToken){
        return true
    }else{
        return false
    }
}

const clearToken = () => {
   let  removeItem = localStorage.removeItem("token")
}

export {
    checkEmailValidation,
    setTokenLocalStorage,
    getToken,
    clearToken
}