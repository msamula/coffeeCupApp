export function generalGet(ip, token, path){
    let xmlHttp = new XMLHttpRequest();

    xmlHttp.open( 'GET', `http://${ip}/api${path}`, false); // false for synchronous request
    xmlHttp.setRequestHeader('accept', 'application/json');
    xmlHttp.setRequestHeader('Authorization', `Bearer ${token}`);
    xmlHttp.send( null );

    return JSON.parse(xmlHttp.responseText);
}