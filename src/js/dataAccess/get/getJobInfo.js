function getPoints(json) {
    let roisCount = json.rois.length;

    let result = [];

    for (let i = 0; i < roisCount; i++) {

        let pointsCount = json.rois[i].points.length;

        for (let j = 0; j < pointsCount; j++) {
            let push = [json.rois[i].points[j].x, json.rois[i].points[j].y];
            result.push(push);
        }
    }

    return result;
}

function getThresholds(json) {
    let thresholdsCount = json.thresholds.length;

    let result = [];

    for (let i = 0; i < thresholdsCount; i++) {
        result.push(json.thresholds[i].value);
    }
    return result;
}

export function getJobInfo(ip, token, path, jobID){

    let results =[];

    let request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if(request.readyState === 4 && request.status === 200) {

        let json = JSON.parse(request.response);
        results = [getThresholds(json), getPoints(json)];
        }
    };

    request.open('GET', `http://${ip}/api${path}/${jobID}`, false);
    request.setRequestHeader('Authorization', `Bearer ${token}`);
    request.setRequestHeader('Accept', 'application/json');
    request.send(jobID);

    return results;
}