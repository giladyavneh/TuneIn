function mailCheck(mail) {
    let regex = /^.+[@]\w+\..+$/;
    return mail&&regex.test(mail);
}

function usernameCheck(username){
    return username&&username.length > 0
}

function passwordCheck(password){
    return password&&password.length >= 6
}

module.exports = { mailCheck, usernameCheck, passwordCheck }