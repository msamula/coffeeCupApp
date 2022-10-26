function showAOI(canvasID, aoibutton) {
    let canvas = document.getElementById(canvasID);
    let aoiBtn = document.getElementById(aoibutton);
    canvas.style.display === 'none' ? canvas.style.display = 'initial'  : canvas.style.display = 'none';
    canvas.style.display === 'none' ? aoiBtn.innerHTML = 'show  AOI'    : aoiBtn.innerHTML = 'hide AOI';
}

export function addEventListener() {
    document.getElementById('aoiBtn').addEventListener('click',()=>{
        showAOI('imgCanvas', 'aoiBtn');
    });
}

