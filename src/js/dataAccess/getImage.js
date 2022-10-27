//get the camera image
export async function getImage(ip, token, imgID)
{
    let start, end;
    start = new Date();

    let image = document.getElementById(imgID);

    let response = await fetch(`http://${ip}/api/images/live`, {
        headers: {
            'accept': 'image/bmp',
            'Authorization': `Bearer ${token}`
        }
    })

    if (response.status === 200) {
        let blob = await response.blob();
        image.src = URL.createObjectURL(blob);

        end = new Date();
        console.log(end.getTime() - start.getTime() + ' ms [Image]');
    }

    if (response.status !== 200) {
        image.src = './pics/noImage.jpg';
    }
}
