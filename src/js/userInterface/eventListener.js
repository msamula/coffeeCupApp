import {showAOI} from "./aoi/showAOI";


export function addEventListener() {
    document.getElementById('aoiBtn').addEventListener('click',()=>{
        showAOI('imgCanvas', 'aoiBtn');
    });
}

