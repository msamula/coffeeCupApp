export function imgToCanvas(imgID, canvasID, showAOI){
    let canvas = document.getElementById(canvasID);
    let img = document.getElementById(imgID);

    canvas.width = img.width;
    canvas.height = img.height;

    let ctx = canvas.getContext('2d');
/*    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img,0,0);*/

    //draw polygon

    if(showAOI){

        ctx.beginPath();
        ctx.moveTo(267, 241);
        ctx.lineTo(274, 327);
        ctx.lineTo(389, 327);
        ctx.lineTo(397, 244);
        ctx.lineTo(330, 230);
        ctx.closePath();

        ctx.lineWidth   = 2;
        ctx.strokeStyle = "rgba(61, 168, 245, 0.8)";
        ctx.fillStyle   = "rgba(61, 168, 245, 0.2)";

        ctx.stroke();
        ctx.fill();
    }
}

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
