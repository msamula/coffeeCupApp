// get the actual temperature and the fill level and show their values in html

export function getTemp(ip, token, path, threshold) {
    let start, end;
    start = new Date();

    let fillLevel = document.getElementById('fillLevel');
    let cupTemp = document.getElementById('cupTemp');
    let fullCup = document.getElementById('fullCup');
    let hotCoffee = document.getElementById('hot');
    let sign = document.getElementById('sign');

    let maxTemp = threshold-273.15;

    let request = new XMLHttpRequest();
    request.open('GET', `http://${ip}/api${path}`, true);
    request.responseType = 'json';
    request.setRequestHeader('Authorization', `Bearer ${token}`);
    request.setRequestHeader('Accept', 'application/json');

    request.onload = () => {
                let json = request.response;

                let percantage = ((json.results[0].value[0]/json.results[2].value[0])*100).toFixed(1);
                let temperature = (json.results[4].value[0]-273.15).toFixed(1);

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

                end = new Date();
                console.log(end.getTime()-start.getTime() + 'ms [Data]');

    };

    request.send();
}