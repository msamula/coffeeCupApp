import {showAOI} from "./showAOI";


export function addEventListener() {
    document.getElementById('aoiBtn').addEventListener('click',()=>{
        showAOI('camImg');
    });
}

