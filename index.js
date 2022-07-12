const sketch_container = document.querySelector(".sketch-container");
const grid_cust_color = document.querySelector(".grid-cust-color");
const grid_cust_reset = document.querySelector(".grid-cust-reset");
const grid_cust_size = document.querySelectorAll(".grid-cust-size");
const root = document.querySelector(':root');

// default setups
const t_o_p = 16;
const g_c = "black";

// dynamic setups
let times_of_pixels = t_o_p;
let grid_color = g_c;

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function createSketch() {
    sketch_container.innerHTML = "";

    root.style.setProperty("--times", times_of_pixels);
    
    for(let i=1; i<=times_of_pixels; i++) {
        for(let j=1; j<=times_of_pixels; j++) {
            let temp_div = document.createElement("div");
            
            temp_div.addEventListener("mouseover", hovered);
            temp_div.addEventListener("mousedown", hovered);
            
            sketch_container.append(temp_div);
        }
    }
}

function hovered(e) {
    if(e.type == "mouseover" && mouseDown) {
        this.setAttribute(`class`, `activated`);
        this.style.backgroundColor = grid_color;
    }
}

grid_cust_color.addEventListener("input", function(e) {
    let temp_color = e.target.value;

    grid_color = temp_color;

    let temp_div = sketch_container.querySelectorAll(".activated");
    temp_div.forEach(val => {
        val.style.backgroundColor = temp_color;
    })
})

grid_cust_size.forEach(b => {
    b.addEventListener("click", function(e) {
        temp_size = e.target.value;

        times_of_pixels = temp_size;

        createSketch();
    })
})

grid_cust_reset.addEventListener("click", function() {
    createSketch();
})

createSketch();