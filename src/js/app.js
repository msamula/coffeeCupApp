import 'bootstrap';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/custom.css';
import {getToken} from "./dataAccess/token/getToken";
import {User} from "./dataAccess/userdata/userModel";
import {getImg} from "./dataAccess/cameraImage/getImage";

let hertz = 9;

try {

    let user = new User('localhost:8080','irsxApp', 'MnrY2L86pEQr53%216', 'administrator', 'administrator');  // MnrY2L86pEQr53!6
    let token = getToken(user.ip, user.clientID, user.clientSecret, user.userName, user.userPassword);

    getImg(user.ip, token.accessToken, 'img', 'camImg', hertz);

}
catch (err) {
    console.log(err);
}