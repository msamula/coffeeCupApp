//get the camera image
import {refreshToken} from "./getToken";
import {token} from "./getToken";

let now, end;
let expireTime;

export async function getImage(ip)
{
    let image = document.getElementById('img');

    now = new Date();
    expireTime = token.exp*1000;

    console.log((expireTime - now)/1000);

    if( ((expireTime - now)/1000) < 100){
        await refreshToken(ip, 'irsxApp', 'MnrY2L86pEQr53!6', token.refreshToken);
    }

    let response = await fetch(`http://${ip}/api/images/live`, {
        headers: {
            'accept': 'image/bmp',
            'Authorization': `Bearer ${token.accessToken}`
        }
    })

    if (response.status === 200) {
        let blob = await response.blob();
        image.src = URL.createObjectURL(blob);

        end = new Date();
        console.log(end.getTime() - now.getTime() + ' ms [Image]');

        //start new request after the previous one is done
        getImage(ip);
    }
}
