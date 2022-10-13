function imgToCanvas(imgID, canvasID){
    let canvas = document.getElementById(canvasID);
    let img = document.getElementById(imgID);

    canvas.width = img.width;
    canvas.height = img.height;

    let ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img,0,0);}

function getImage(ip, token, imgID)
{
    let xmlHttp = new XMLHttpRequest();
    let image = document.getElementById(imgID);

/*    xmlHttp.open( 'GET', `http://${ip}/api/images/live`, true); // false for synchronous request*/
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

    xmlHttp.send( null );
}

export function getImg(ip, token, imgID, canvasID, hertz) {
    setInterval(function (){
        getImage(ip,token, imgID);
        imgToCanvas(imgID, canvasID);
    }, 1000/hertz);
}