// user model and token model

export class Token {
    constructor(accessToken, type, expireSec, scope, refreshToken, iat, exp) {
        this.accessToken = accessToken;
        this.type = type;
        this.expireSec = expireSec;
        this.scope = scope;
        this.refreshToken = refreshToken;
        this.iat = iat;
        this.exp = exp;
    }
}

export class User{
    constructor(ip, clientID, clientSecret, userName, userPassword) {
        this.ip = ip;
        this.clientID = clientID;
        this.clientSecret = clientSecret;
        this.userName = userName;
        this.userPassword = userPassword;
    }
}