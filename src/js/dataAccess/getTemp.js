// get the actual temperature, fill level and show their values in html

import {token} from "./getToken";

/*let start, end;*/

export function getData(ip, threshold) {
    //start = new Date();

    //get html id's

    let fillLevel = document.getElementById('fillLevel');
    let cupTemp = document.getElementById('cupTemp');
    let fullCup = document.getElementById('fullCup');
    let hotCoffee = document.getElementById('hot');
    let sign = document.getElementById('sign');

    let maxTemp = threshold-273.15;

    //get request

    fetch(`http://${ip}/api/results`, {
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token.accessToken}`
        }
    })
        .then((response) => response.json())
        .then((json) => {

            let percantage = ((json.results[0].value[0]/json.results[2].value[0])*100).toFixed(1);
            let temperature = (json.results[4].value[0]-273.15).toFixed(1);

            // data to html

            fillLevel.innerHTML = `${percantage}%`;
            cupTemp.innerHTML   = `${temperature}°C`;

            if(percantage == 100){
                fullCup.innerHTML='YES';
                fullCup.style.webkitTextFillColor = 'green';}

            else if(percantage < 100){
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

            if(percantage >= 98.8 && temperature >= maxTemp){
                sign.innerHTML = 'Coffee <br> READY';
                sign.className = 'alert';
                sign.style.backgroundColor = 'rgba(2, 181, 41,1)';
            }

            else if(percantage < 98.8 && temperature >= maxTemp){
                sign.innerHTML = 'Coffee <br>TOO LOW';
                sign.className = 'alert';
                sign.style.backgroundColor = 'rgba(217, 2, 2,1)';
            }
            else if(percantage < 75 && percantage >= 70 && temperature < 45){
                sign.innerHTML = 'Coffee <br>COLD';
                sign.className = 'alert';
                sign.style.backgroundColor = 'rgba(0, 159, 245,1)';
            }
            else if(percantage < 100 && temperature < maxTemp){
                sign.innerHTML = 'Coffee <br> COMING';
                sign.className = 'alert blink';
            }

/*            end = new Date();
            console.log(end.getTime()-start.getTime() + 'ms [Data]');*/

            //start new request after the previous one is done
            getData(ip, threshold);
        })
        .catch(()=>{
            getData(ip, threshold);
        })
}