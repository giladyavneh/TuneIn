function googleAuth(){
    const url = new URL("https://accounts.google.com/o/oauth2/v2/auth")
    const params = {
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: "https://www.googleapis.com/auth/userinfo.profile",
        include_granted_scopes: true,
        response_type: "token",
        redirect_uri: "http://localhost:3000/authCallback",
    }
    window.location.replace(url + "?" + new URLSearchParams(params).toString())
}

module.exports={googleAuth}