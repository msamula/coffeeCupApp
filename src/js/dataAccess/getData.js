
// get the actual temperature, fill level and show their values in html

import {token, expireTime} from "./getToken";

function awaitNewToken(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getData(ip, threshold) {

    if(expireTime < 60.3){
        await awaitNewToken(500);
    }

    //get html id's
    let fillLevel = document.getElementById('fillLevel');
    let cupTemp = document.getElementById('cupTemp');
    let fullCup = document.getElementById('fullCup');
    let hotCoffee = document.getElementById('hot');
    let coming = document.getElementById('coming');
    let ready = document.getElementById('ready');
    let low = document.getElementById('low');
    let cold = document.getElementById('cold');

    let maxTemp = threshold-273.15;


    //get and display data
    fetch(`http://${ip}/api/results`, {
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token.accessToken}`
        }
    })
        .then((response) => response.json())
        .then((json) => {

            let level = ((json.results[0].value[0]/json.results[2].value[0])*100).toFixed(1);
            let temperature = (json.results[4].value[0]-273.15).toFixed(1);

            // data to html

            fillLevel.innerHTML = `${level}%`;
            cupTemp.innerHTML   = `${temperature}°C`;

            if(level >= 98.8){
                fullCup.innerHTML='<img src="./media/check.png" style="padding-right: 15px">';
            }

            else if(level < 98.8){
                fullCup.innerHTML='<img src="./media/cancel.png" style="padding-right: 15px">';
            }

            if(temperature >= maxTemp){
                hotCoffee.innerHTML='<img src="./media/check.png" style="padding-right: 15px">';
            }

            else if(temperature < maxTemp){
                hotCoffee.innerHTML='<img src="./media/cancel.png" style="padding-right: 15px">';
            }

            if(level >= 98.8 && temperature >= maxTemp){
                ready.style.backgroundColor     = 'rgba(2, 181, 41,1)';
                coming.style.backgroundColor    = 'rgba(255, 255, 255,1)';
                low.style.backgroundColor       = 'rgba(255, 255, 255,1)';
                cold.style.backgroundColor      = 'rgba(255, 255, 255,1)';
            }

            else if(level < 98.8 && temperature >= maxTemp){
                ready.style.backgroundColor     = 'rgba(255, 255, 255,1)';
                coming.style.backgroundColor    = 'rgba(255, 255, 255,1)';
                low.style.backgroundColor       = 'rgba(217,   2,   2,1)';
                cold.style.backgroundColor      = 'rgba(255, 255, 255,1)';
            }
            else if(level < 75 && level >= 70 && temperature < 45){
                ready.style.backgroundColor     = 'rgba(255, 255, 255,1)';
                coming.style.backgroundColor    = 'rgba(255, 255, 255,1)';
                low.style.backgroundColor       = 'rgba(255, 255, 255,1)';
                cold.style.backgroundColor      = 'rgba(  0, 159, 245,1)';
            }
            else if(level < 98.8 && temperature < maxTemp){
                ready.style.backgroundColor     = 'rgba(255, 255, 255,1)';
                coming.style.backgroundColor    = 'rgba(252, 164,   0,1)';
                low.style.backgroundColor       = 'rgba(255, 255, 255,1)';
                cold.style.backgroundColor      = 'rgba(255, 255, 255,1)';
            }

            //start new request after the previous one is done
            getData(ip, threshold);
        })
        .catch(()=>{
            getData(ip, threshold);
        })
}