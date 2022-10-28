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

//MAIN FUNCTION
try {
    //load function for button
    addEventListener();

    //get token
    let token = getToken(ipAddress, 'irsxApp', 'MnrY2L86pEQr53%216' /*MnrY2L86pEQr53!6*/, 'administrator', 'administrator');

    //get thresholds and coordinates for aoi from the COFFEE CUP JOB!
    let jobInfo = getJobInfo(ipAddress,token.accessToken,'/jobs','Coffeecup');

    //draw AOI's
    drawAOI('img', 'imgCanvas', jobInfo[1]);    // jobInfo[1] => coordinates of aoi

    //Image+Data loop
    getImage(ipAddress,token.accessToken, 'img');
    getTemp(ipAddress,token.accessToken,'/results',jobInfo[0][2]);      // jobInfo[0][2] => third threshold of the job (60°C)

    setInterval(async ()=>{

        //refresh the token
        token = await refreshToken(ipAddress,'irsxApp','MnrY2L86pEQr53%216',token.refreshToken);
        console.log('token wurde aktualisiert');

        //get image and temperature from camera
        getImage(ipAddress,token.accessToken, 'img');
        getTemp(ipAddress,token.accessToken,'/results',jobInfo[0][2]);

    },(token.expireSec/3.33)*1000)
}
catch (err)
{
    console.log(err);
}