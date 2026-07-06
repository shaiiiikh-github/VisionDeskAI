let startX = 0;
let startY = 0;

const box = document.createElement("div");

box.style.position = "absolute";
box.style.border = "2px solid #4da3ff";
box.style.background = "rgba(77,163,255,0.15)";
box.style.display = "none";

document.body.appendChild(box);

document.addEventListener("mousedown", (e) => {

    startX = e.clientX;
    startY = e.clientY;

    box.style.left = startX + "px";
    box.style.top = startY + "px";
    box.style.width = "0px";
    box.style.height = "0px";
    box.style.display = "block";

});

document.addEventListener("mousemove", (e) => {

    if (box.style.display === "none") return;

    const width = e.clientX - startX;
    const height = e.clientY - startY;

    box.style.width = Math.abs(width) + "px";
    box.style.height = Math.abs(height) + "px";

    box.style.left = Math.min(startX, e.clientX) + "px";
    box.style.top = Math.min(startY, e.clientY) + "px";

});

document.addEventListener("mouseup", (e) => {

    box.style.display = "none";

    window.electronAPI.regionSelected({

        x: Math.min(startX, e.clientX),

        y: Math.min(startY, e.clientY),

        width: Math.abs(e.clientX - startX),

        height: Math.abs(e.clientY - startY)

    });

});