//get camera image
export function getImage(ip, token, imgID)
{
    let xmlHttp = new XMLHttpRequest();
    let image = document.getElementById(imgID);

    xmlHttp.open( 'GET', `http://${ip}/api/images/live`, true); // false for synchronous request
    xmlHttp.setRequestHeader('accept', 'image/bmp');
    xmlHttp.setRequestHeader('Authorization', `Bearer ${token}`);
    xmlHttp.responseType = 'blob';

    xmlHttp.onload = function (){

        if(this.status === 200){
            image.src =  URL.createObjectURL(this.response);
        }

        if(this.status !== 200){
            image.src = './pics/noImage.jpg';}
    }

    xmlHttp.send();
}
