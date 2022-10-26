import {Token} from "./Models";

let xmlHttp = new XMLHttpRequest();

export function getToken(ip,cliId,cliSecret,user,password)
{
    let token;
    let url = `http://${ip}/api/oauth/token?client_id=${cliId}&client_secret=${cliSecret}&grant_type=password&username=${user}&password=${password}`;

    xmlHttp.open('POST', url, false);
    xmlHttp.setRequestHeader('accept', 'application/json');

    xmlHttp.onreadystatechange = function() {
        if(xmlHttp.readyState === 4 && xmlHttp.status === 200) {

            let response = JSON.parse(xmlHttp.responseText);
            token = new Token(response['access_token'],response['token_type'],response['expires_in'],response['scope'],response['refresh_token'],response['iat'],response['exp']);
        }
    }

    xmlHttp.send();
    return token;
}

export function refreshToken(ip,cliId,cliSecret,refreshtoken){
    let token;
    let url = `http://${ip}/api/oauth/token?client_id=${cliId}&client_secret=${cliSecret}&grant_type=refresh_token&refresh_token=${refreshtoken}`;

    xmlHttp.open('POST', url, false);
    xmlHttp.setRequestHeader('accept', 'application/json');

    xmlHttp.onreadystatechange = function() {
        if(xmlHttp.readyState === 4 && xmlHttp.status === 200) {

            let response = JSON.parse(xmlHttp.responseText);
            token = new Token(response['access_token'],response['token_type'],response['expires_in'],response['scope'],response['refresh_token'],response['iat'],response['exp']);
        }
    }

    xmlHttp.send();
    return token;
}