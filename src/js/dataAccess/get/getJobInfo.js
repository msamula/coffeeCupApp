export function getJobInfo(ip, token, path, jobID){
    let request = new XMLHttpRequest();

    request.onload = async () => {
        let json = await request.response;
        console.log(json);
    };
    request.open('GET', `http://${ip}/api${path}/${jobID}`, true);
    request.responseType = 'json';
    request.setRequestHeader('Authorization', `Bearer ${token}`);
    request.setRequestHeader('Accept', 'application/json');
    request.send(jobID);
}