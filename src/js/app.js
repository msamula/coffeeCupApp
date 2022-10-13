import 'bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/custom.css';
import {getToken} from "./dataAccess/token/getToken";
import {User} from "./dataAccess/userdata/userModel";
import * as image from "./dataAccess/cameraImage/getImage";
import {generalGet} from "./dataAccess/get/generalGet";

let hertz = 5;

try {

    let user = new User('localhost:8080','irsxApp', 'MnrY2L86pEQr53%216', 'administrator', 'administrator');  // MnrY2L86pEQr53!6
    let token = getToken(user.ip, user.clientID, user.clientSecret, user.userName, user.userPassword);

    setInterval(function (){
        image.getImage(user.ip,token.accessToken, 'img');
        image.imgToCanvas('img', 'camImg');
        console.log(generalGet('localhost:8080',token.accessToken,'/results'));
    }, 1000/hertz);
}
catch (err) {
    console.log(err);
}