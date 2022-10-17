export function getCupInfo(ip, token, path, threshold) {
    let fillLevel = document.getElementById('fillLevel');
    let cupTemp = document.getElementById('cupTemp');
    let fullCup = document.getElementById('fullCup');
    let hotCoffee = document.getElementById('hot');
    let sign = document.getElementById('sign');

    let max = threshold-273.15;

    let request = new XMLHttpRequest();

    request.onload = () => {
                let json = request.response;

                let percantage = ((json.results[0].value[0]/json.results[2].value[0])*100).toFixed(2);
                let temperature = (json.results[4].value[0]-273.15).toFixed(2);

                fillLevel.innerHTML = `${percantage}%`;
                cupTemp.innerHTML   = `${temperature}°C`;

                if(percantage == 100){
                    fullCup.innerHTML='YES';
                    fullCup.style.webkitTextFillColor = 'green';}

                else if(percantage < 100){
                    fullCup.innerHTML='NO';
                    fullCup.style.webkitTextFillColor = 'red';
                }

                if(temperature >= max){
                    hotCoffee.innerHTML='YES';
                    hotCoffee.style.webkitTextFillColor = 'green';}

                else if(temperature < max){
                    hotCoffee.innerHTML='NO';
                    hotCoffee.style.webkitTextFillColor = 'red';
                }

                if(percantage == 100 && temperature >= max){
                    sign.innerHTML = 'Coffee <br> READY';
                    sign.style.borderBlockColor = 'green';
                    sign.style.borderInlineColor = 'green';
                }

                else if(percantage < 100 && temperature >= max){
                    sign.innerHTML = 'Coffee <br>TOO LOW';
                    sign.style.borderBlockColor = 'red';
                    sign.style.borderInlineColor = 'red';
                }
                else if(percantage < 100 && temperature < max){
                    sign.innerHTML = 'Coffee <br> COMING';
                    sign.style.borderBlockColor = 'yellow';
                    sign.style.borderInlineColor = 'yellow';
                }

    };
    request.open('GET', `http://${ip}/api${path}`, true);
    request.responseType = 'json';
    request.setRequestHeader('Authorization', `Bearer ${token}`);
    request.setRequestHeader('Accept', 'application/json');
    request.send();
}