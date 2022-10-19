import 'bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/custom.css';
import {getToken} from "./dataAccess/token/getToken";
import {User} from "./dataAccess/userdata/userModel";
import * as image from "./dataAccess/cameraImage/getImage";
import {getCupInfo} from "./dataAccess/get/getCupInfo";
import {getJobInfo} from "./dataAccess/get/getJobInfo";
import {AOIisActive} from "./userInterface/showAOI";
import {addEventListener} from "./userInterface/eventListener";


let ipAddress = 'localhost:8080';     //'192.168.3.20'
let hertz = 9;

window.addEventListener('DOMContentLoaded', () => {
    addEventListener();
});

try {

    let user = new User(ipAddress,'irsxApp', 'MnrY2L86pEQr53%216' /*MnrY2L86pEQr53!6*/, 'administrator', 'administrator');
    let token = getToken(user.ip, user.clientID, user.clientSecret, user.userName, user.userPassword);

    let jobInfo = getJobInfo(user.ip,token.accessToken,'/jobs','Coffeecup');
    //console.log(jobInfo);

    const myInterval = setInterval(()=> {
        if(document.getElementById('img').width > 0){
            clearInterval(myInterval);
        }
        image.drawAOI('img', 'camImg', jobInfo[1]);
    },1);

    setInterval(function (){
        image.getImage(user.ip,token.accessToken, 'img');
        getCupInfo(user.ip ,token.accessToken,'/results',jobInfo[0][2]);
    }, 1000/hertz);
}
catch (err) {
    console.log(err);
}