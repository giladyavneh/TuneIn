function mailCheck(mail) {
    let regex = /^.+[@]\w+\..+$/;
    return regex.test(mail);
}

function usernameCheck(username){
    return username.length > 0
}

function passwordCheck(password){
    return password.length >= 6
}

module.exports = { mailCheck, usernameCheck, passwordCheck }