import 'bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/custom.css';
import {getToken, refreshToken} from "./dataAccess/token/getToken";
import {User} from "./dataAccess/userdata/userModel";
import {getImage} from "./dataAccess/cameraImage/getImage";
import {getTemp} from "./dataAccess/get/getTemp";
import {getJobInfo} from "./dataAccess/get/getJobInfo";
import {addEventListener} from "./userInterface/eventListener";
import {drawAOI} from "./userInterface/aoi/drawAOI";

//camera settings
let ipAddress = 'localhost:8080';     //'192.168.3.20'
let hertz = 9;

//MAIN
//load function for buttons
window.addEventListener('DOMContentLoaded', () => {
    addEventListener();
});

try {
    //user + token
    let user = new User(ipAddress,'irsxApp', 'MnrY2L86pEQr53%216' /*MnrY2L86pEQr53!6*/, 'administrator', 'administrator');
    let token = getToken(user.ip, user.clientID, user.clientSecret, user.userName, user.userPassword);

    setTimeout(()=>{
        setInterval(()=>{
            token = refreshToken(user.ip,user.clientID,user.clientSecret,token.refreshToken);
            console.log('token wurde aktualisiert');
        },(token.expireSec-10)*1000)
    },(token.expireSec-10)*1000);

    //thresholds und aoi x,y-koordinaten
    let jobInfo = getJobInfo(user.ip,token.accessToken,'/jobs','Coffeecup');

    //draw AOI's
    const myInterval = setInterval(()=> {
        if(document.getElementById('img').width > 0){
            clearInterval(myInterval);
        }
        drawAOI('img', 'imgCanvas', jobInfo[1]);
    },1);

    //get image and temp from camera
    setInterval(function (){
        getImage(user.ip,token.accessToken, 'img');
        getTemp(user.ip ,token.accessToken,'/results',jobInfo[0][2]);
    }, 1000/hertz);
}
catch (err) {
    console.log(err);
}