import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/custom.css';

import {getToken, refreshToken} from "./dataAccess/getToken";
import {getImage} from "./dataAccess/getImage";
import {getTemp} from "./dataAccess/getTemp";
import {getJobInfo} from "./dataAccess/getJobInfo";
import {addEventListener} from "./userInterface/eventListener";
import {drawAOI} from "./userInterface/drawAOI";

//camera settings
let ipAddress = 'localhost:8080';
let clientID = 'irsxApp';
let clientSecret = 'MnrY2L86pEQr53!6';
let user = 'administrator';
let password = 'administrator';

//MAIN FUNCTION
try {
    //load function for button
    addEventListener();

    //get token
    getToken(ipAddress, clientID, clientSecret, user, password);

    //get thresholds and coordinates for aoi from the COFFEE CUP JOB!
    let jobInfo = getJobInfo(ipAddress,'/jobs','Coffeecup');

    //draw AOI's
    drawAOI('img', 'imgCanvas', jobInfo[1]);    // jobInfo[1] => coordinates of aoi

    //get image and temperature from camera
    getImage(ipAddress);
    getTemp(ipAddress,'/results',jobInfo[0][2]);
}
catch (err)
{
    console.log(err);
}