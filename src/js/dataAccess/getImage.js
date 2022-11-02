//get the camera image
import {checkToken} from "./getToken";
import {token} from "./getToken";

export async function getImage(ip)
{
    let image = document.getElementById('img');

    await checkToken(ip);

    let response = await fetch(`http://${ip}/api/images/live`, {
        headers: {
            'accept': 'image/bmp',
            'Authorization': `Bearer ${token.accessToken}`
        }
    })

    if (response.status === 200) {
        let blob = await response.blob();
        image.src = URL.createObjectURL(blob);

        //start new request after the previous one is done
        getImage(ip);
    }
}
