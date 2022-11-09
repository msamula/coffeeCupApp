
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
                fullCup.innerHTML='YES';
                fullCup.style.webkitTextFillColor = 'green';}

            else if(level < 98.8){
                fullCup.innerHTML='NO';
                fullCup.style.webkitTextFillColor = 'red';
            }

            if(temperature >= maxTemp){
                hotCoffee.innerHTML='YES';
                hotCoffee.style.webkitTextFillColor = 'green';}

            else if(temperature < maxTemp){
                hotCoffee.innerHTML='NO';
                hotCoffee.style.webkitTextFillColor = 'red';
            }

            if(level >= 98.8 && temperature >= maxTemp){
                ready.className = 'alert sign blink-green';
                coming.className = 'alert sign';
                low.className = 'alert sign';
                cold.className = 'alert sign';
            }

            else if(level < 98.8 && temperature >= maxTemp){
                ready.className = 'alert sign';
                coming.className = 'alert sign';
                low.className = 'alert sign blink-red';
                cold.className = 'alert sign';
            }
            else if(level < 75 && level >= 70 && temperature < 45){
                ready.className = 'alert sign';
                coming.className = 'alert sign';
                low.className = 'alert sign';
                cold.className = 'alert sign blink-blue';
            }
            else if(level < 98.8 && temperature < maxTemp){
                ready.className = 'alert sign';
                coming.className = 'alert sign blink';
                low.className  = 'alert sign';
                cold.className = 'alert sign';
            }

            //start new request after the previous one is done
            getData(ip, threshold);
        })
        .catch(()=>{
            getData(ip, threshold);
        })
}