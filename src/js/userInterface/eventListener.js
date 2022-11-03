// add eventlistener for button

function showAOI(canvasID, aoiButton) {
    let canvas = document.getElementById(canvasID);
    let aoiBtn = document.getElementById(aoiButton);
    canvas.style.display === 'none' ? canvas.style.display = 'initial'  : canvas.style.display = 'none';
    canvas.style.display === 'none' ? aoiBtn.innerHTML = 'show  AOI'    : aoiBtn.innerHTML = 'hide AOI';
}

export function btnEvents() {
    document.getElementById('aoiBtn').addEventListener('click',()=>{
        showAOI('imgCanvas', 'aoiBtn');
    });
}

