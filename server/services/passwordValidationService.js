

function validatePassword(password){
    const uppercaseRegex = /[A-Z]/;
    const specialCharRegex = /[!@#$%^&*()_+[\]{};':"\\|,.<>?]/;
    const minLength = 8;


    if(!password){
        return false;
    }

    if(password.length < minLength){
        return false;
    }

    if(!uppercaseRegex.test(password)){
        return false;
    }

    if(!specialCharRegex.test(password)){
        return false;
    }

    return true;
}

module.exports = validatePassword;