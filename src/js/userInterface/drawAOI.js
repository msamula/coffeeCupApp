export function drawAOI(imgID, canvasID, pointsArray){
    let canvas = document.getElementById(canvasID);
    let img = document.getElementById(imgID);

    canvas.width = img.width;
    canvas.height = img.height;

    let ctx = canvas.getContext('2d');

    if(pointsArray.length > 0){
        for (let i = 0; i < pointsArray.length; i++) {
            if(pointsArray[i][0] === 'Polygon' ||  pointsArray[i][0] === 'Line' ||  pointsArray[i][0] === 'Rect'){
                ctx.beginPath();
                ctx.moveTo(pointsArray[i][1][0], pointsArray[i][1][1]);
                for (let j = 2; j < pointsArray[i].length; j++) {
                    ctx.lineTo(pointsArray[i][j][0], pointsArray[i][j][1]);
                }
                ctx.closePath();
                ctx.lineWidth   = 2;
                ctx.strokeStyle = "rgba(61, 168, 245, 0.8)";
                ctx.fillStyle   = "rgba(61, 168, 245, 0.2)";
                ctx.stroke();
                ctx.fill();
            }

            if(pointsArray[i][0] === 'PolyLine'){
                ctx.beginPath();
                ctx.moveTo(pointsArray[i][1][0], pointsArray[i][1][1]);
                for (let j = 2; j < pointsArray[i].length; j++) {
                    ctx.lineTo(pointsArray[i][j][0], pointsArray[i][j][1]);
                }
                ctx.lineWidth   = 2;
                ctx.strokeStyle = "rgba(61, 168, 245, 0.8)";
                ctx.stroke();
            }

            if(pointsArray[i][0] === 'Ellipse' ||  pointsArray[i][0] === 'EllipseLine'){
            }
        }
    }
}