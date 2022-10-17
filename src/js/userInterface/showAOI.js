export function showAOI(canvasID) {
    let canvas = document.getElementById(canvasID);
    canvas.style.display === 'none' ? canvas.style.display = 'initial' : canvas.style.display = 'none';
}