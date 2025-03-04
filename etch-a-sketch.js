// Ensure JavaScript runs only after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {

    // Variables
    const gridContainer = document.querySelector(".grid-container");
    const resetButton = document.querySelector("#reset");  
    const colorPicker = document.querySelector("#colour-picker"); 
    let mouseDown = false; // Track if the mouse is held down
    let selectedColor = "black"; // Default color

    // Debugging: Check if elements exist before adding event listeners
    if (!gridContainer) {
        console.error("Error: .grid-container not found in the HTML.");
        return;
    }
    if (!resetButton) {
        console.error("Error: Reset button not found! Check the HTML ID.");
        return;
    }
    if (!colorPicker) {
        console.error("Error: Color picker not found! Check the HTML ID.");
        return;
    }

    // Track mouse press and release to enable "dragging"
    document.body.addEventListener("mousedown", () => (mouseDown = true));
    document.body.addEventListener("mouseup", () => (mouseDown = false));

    // Function to create the grid dynamically
    function createGrid(size) {
        console.log(`Creating a ${size}x${size} grid`); // Debugging log

        gridContainer.innerHTML = ""; // Clears the existing grid

        gridContainer.style.display = "grid";
        gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

        for (let i = 0; i < size * size; i++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.style.border = "1px solid gray"; // Optional, for visible grid
            square.style.backgroundColor = "white"; // Ensures squares are visible

            // Add event listeners for drawing effect
            square.addEventListener("mouseover", draw);
            square.addEventListener("mousedown", draw);

            gridContainer.appendChild(square);
        }
    }

    const eraserButton = document.querySelector("#eraser");
    eraserButton.addEventListener("click", () => {
        selectedColor = "white";
    });
    // Function to change square color when drawing
    function draw(event) {
        console.log("Drawing on: ", event.target); // Debugging log
        if (event.type === "mouseover" && !mouseDown) return;  // Only draw when mouse is pressed
        event.target.style.backgroundColor = selectedColor;  // Change color
    }

    // Function to reset and get new grid size
    function resetGrid() {
        console.log("Reset button clicked!"); // Debugging log
        let newSize = prompt("Enter grid size (max: 64)", 16);

        if (newSize === null || newSize === "" || isNaN(newSize)) {
            alert("Invalid input! Please enter a number.");
            return;
        }

        newSize = parseInt(newSize);
        if (newSize > 64) {
            alert("Maximum size is 64. Setting to 64.");
            newSize = 64;
        } else if (newSize < 1) {
            alert("Minimum size is 1. Setting to 1.");
            newSize = 1;
        }

        createGrid(newSize);
    }

    // Event listener for color picker
    colorPicker.addEventListener("input", (event) => {
        selectedColor = event.target.value;
        console.log(`Color changed to: ${selectedColor}`); // Debugging log
    });

    // Add color button event listeners
    const colorButtons = document.querySelectorAll(".colour-option");

    colorButtons.forEach((button) => {
        button.addEventListener("click", () => {
            selectedColor = button.id; // Sets color to button's ID (e.g., "black" or "colours")
            console.log(`Selected color: ${selectedColor}`); // Debugging log
        });
    });

    // Add reset button event listener
    resetButton.addEventListener("click", resetGrid);

    // Initialize default grid
    createGrid(16);
});
