//selects the HTML element "canvas"
const canvas = document.querySelector("canvas");
//chooses to draw in 2d
const context= canvas.getContext("2d");
const toolButtons = document.querySelectorAll(".tool");
const sizeSlider = document.querySelector("#size-slider");
const colourButtons = document.querySelectorAll(".colours .option");
const colourPickerBlack = document.querySelector("#colour-picker-black");
const colourPickerWhite = document.querySelector("#colour-picker-white");
const colourPickerPink = document.querySelector("#colour-picker-pink");
const colourPickerGreen = document.querySelector("#colour-picker-green");
const clear = document.querySelector(".clear");
const save = document.querySelector(".save");

let isDrawing = false;
let brushWidth = 5;
let selectedColour = "#000";

window.addEventListener("load", () =>{
    // offsetWidth/Height returns viewable height and width of an element//
    //without setting the width/height on load the line will not follow the cursor properly//
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBackground();
});
const startDraw = () => {
    isDrawing = true;
    context.beginPath(); //creates new path when startDraw is called
    context.lineWidth = brushWidth;
    context.strokeStyle = selectedColour;
    context.fillStyle = selectedColour;
}
const drawing = (e)=>{
    if (!isDrawing) return;
    if (document.querySelector(".options .active").id === "brush 1") {
        context.lineTo(e.offsetX, e.offsetY); //creates line
        context.stroke(); //filling line with colour
    }
    else if (document.querySelector(".options .active").id === "brush 2"){
        context.lineTo(e.offsetX, e.offsetY); //creates line
        context.stroke(); //filling line with colour
    }
    else if (document.querySelector(".options .active").id === "brush 3"){
        context.lineTo(e.offsetX, e.offsetY); //creates line
        context.stroke(); //filling line with colour
    }
    else if (document.querySelector(".options .active").id === "eraser"){
        context.lineTo(e.offsetX, e.offsetY); //creates line
        context.stroke(); //filling line with colour
        context.strokeStyle = "#fff";
    }
}
toolButtons.forEach(button =>{
    button.addEventListener("click", () =>{
        //first the previous tool gets de-selected, then the current tool gets selected
        document.querySelector(".options .active").classList.remove("active");
        button.classList.add("active");
    });
});
colourButtons.forEach(button =>{
    button.addEventListener("click", () =>{
        //first the previous colour gets de-selected, then the current colour gets selected
        document.querySelector(".options .selected").classList.remove("selected");
        button.classList.add("selected");
        //passing selected button colour as "selectedColour" value in startDraw function
        selectedColour = window.getComputedStyle(button).getPropertyValue("background-color");
    });
});
colourPickerBlack.addEventListener("change", () =>{
    //changes colourPickerBlack value
    colourPickerBlack.parentElement.style.background = colourPickerBlack.value;
    colourPickerBlack.parentElement.click();
});
colourPickerWhite.addEventListener("change", () =>{
    colourPickerWhite.parentElement.style.background = colourPickerWhite.value;
    colourPickerWhite.parentElement.click();
});
colourPickerPink.addEventListener("change", () =>{
    colourPickerPink.parentElement.style.background = colourPickerPink.value;
    colourPickerPink.parentElement.click();
});
colourPickerGreen.addEventListener("change", () =>{
    colourPickerGreen.parentElement.style.background = colourPickerGreen.value;
    colourPickerGreen.parentElement.click();
});

clear.addEventListener("click", () =>{
    context.clearRect(0, 0, canvas.width, canvas.height);
    setCanvasBackground();
})
save.addEventListener("click", () =>{
    const link = document.createElement("a"); //creating <a> element
    link.download = `${Date.now()}.jpg`; //passing current date as link download value
    link.href = canvas.toDataURL(); //passing canvasData as link href value
    link.click(); //clicking link to download
})
const setCanvasBackground = () =>{
    //setting the canvas background to white, so downloaded image has a background
    context.fillStyle = "#fff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = selectedColour; //setting fillStyle back to be selectedColour
}

//passing slider value as brush size
sizeSlider.addEventListener("change", () => brushWidth = sizeSlider.value);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mousedown", startDraw);
//sets isDrawing to false when mouse is not clicked
canvas.addEventListener("mouseup", () => isDrawing = false);