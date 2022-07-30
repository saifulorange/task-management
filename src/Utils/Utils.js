

const checkEmailValidation = (value) => {
    console.log(value,"plll")
    let isValid = false;
    let reg = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

    if(reg.test(value)){
        isValid = true
    }

    return isValid
}

export {
    checkEmailValidation
}