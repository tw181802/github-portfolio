/* function openWindow(appName) {
    const windowDiv = document.createElement('div');
    windowDiv.className = 'window';

    let contentHTML = `<div class="window-content">Content for ${appName.charAt(0).toUpperCase() + appName.slice(1)}</div>`;

    // Check for Notepad and create a text area
    if (appName === 'notepad') {
        contentHTML = `
            <textarea class="notepad-textarea" placeholder="Type your notes here..."></textarea>
        `;
    }

    windowDiv.innerHTML = `
        <div class="window-header" onmousedown="dragStart(event, this.parentElement)">
            ${appName.charAt(0).toUpperCase() + appName.slice(1)}
            <span class="close-btn" onclick="this.parentElement.parentElement.style.display='none'">X</span>
        </div>
        ${contentHTML}
    `;

    document.getElementById('windows-container').appendChild(windowDiv);
    windowDiv.style.display = 'block';

    // Center the window within the view
    windowDiv.style.left = `${(window.innerWidth - 400) / 2}px`;
    windowDiv.style.top = `${(window.innerHeight - 300) / 2}px`;
}


function openRecycleBin() {
    const windowDiv = document.createElement('div');
    windowDiv.className = 'window';
    windowDiv.innerHTML = `
        <div class="window-header" onmousedown="dragStart(event, this.parentElement)">
            Recycle Bin
            <span class="close-btn" onclick="this.parentElement.parentElement.style.display='none'">X</span>
        </div>
        <div class="window-content">
            Contents of Recycle Bin
        </div>
    `;
    document.getElementById('windows-container').appendChild(windowDiv);
    windowDiv.style.display = 'block';
}

function dragStart(event, element) {
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    document.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        document.onmouseup = null;
    };
}
*/

/*
let recycleBinItems = [];

function openWindow(appName) {
    const windowDiv = document.createElement('div');
    windowDiv.className = 'window';

    let contentHTML = `<div class="window-content">Content for ${appName.charAt(0).toUpperCase() + appName.slice(1)}</div>`;

    if (appName === 'notepad') {
        contentHTML = `
            <textarea class="notepad-textarea" placeholder="Type your notes here..."></textarea>
            <div class="notepad-controls">
                <button onclick="saveNotepad()">Save</button>
                <button onclick="deleteNotepad()">Delete</button>
            </div>
        `;
    } else if (appName === 'calculator') {
        contentHTML = `
            <div class="calculator">
                <input type="text" id="calculator-display" disabled>
                <button onclick="clearDisplay()">C</button>
                <button onclick="appendToDisplay('7')">7</button>
                <button onclick="appendToDisplay('8')">8</button>
                <button onclick="appendToDisplay('9')">9</button>
                <button onclick="appendToDisplay('/')">/</button>
                <button onclick="appendToDisplay('4')">4</button>
                <button onclick="appendToDisplay('5')">5</button>
                <button onclick="appendToDisplay('6')">6</button>
                <button onclick="appendToDisplay('*')">*</button>
                <button onclick="appendToDisplay('1')">1</button>
                <button onclick="appendToDisplay('2')">2</button>
                <button onclick="appendToDisplay('3')">3</button>
                <button onclick="appendToDisplay('-')">-</button>
                <button onclick="appendToDisplay('0')">0</button>
                <button onclick="calculateResult()">=</button>
                <button onclick="appendToDisplay('+')">+</button>
            </div>
        `;
    }

    windowDiv.innerHTML = `
        <div class="window-header" onmousedown="dragStart(event, this.parentElement)">
            ${appName.charAt(0).toUpperCase() + appName.slice(1)}
            <span class="close-btn" onclick="this.parentElement.parentElement.style.display='none'">X</span>
        </div>
        ${contentHTML}
    `;

    document.getElementById('windows-container').appendChild(windowDiv);
    windowDiv.style.display = 'block';

    // Center the window within the view
    windowDiv.style.left = `${(window.innerWidth - 400) / 2}px`;
    windowDiv.style.top = `${(window.innerHeight - 300) / 2}px`;
}

function saveNotepad() {
    const textArea = document.querySelector('.notepad-textarea');
    if (textArea) {
        const savedText = textArea.value;
        alert("Notes saved!"); // Replace this with actual saving logic if needed
        // Here you can implement logic to save to localStorage or other storage
    }
}

function deleteNotepad() {
    const textArea = document.querySelector('.notepad-textarea');
    if (textArea) {
        textArea.value = ''; // Clear the textarea
        alert("Notes deleted!"); // Replace this with actual deletion logic if needed
    }
}

function appendToDisplay(value) {
    const display = document.getElementById('calculator-display');
    display.value += value;
}

function calculateResult() {
    const display = document.getElementById('calculator-display');
    display.value = eval(display.value); // Evaluate the expression
}

function clearDisplay() {
    const display = document.getElementById('calculator-display');
    display.value = '';
}

function openRecycleBin() {
    const recycleBinContainer = document.getElementById('recycle-bin-container');
    const recycleBinItemsDiv = document.getElementById('recycle-bin-items');
    recycleBinItemsDiv.innerHTML = '';

    recycleBinItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = item;
        recycleBinItemsDiv.appendChild(itemDiv);
    });

    recycleBinContainer.classList.toggle('hidden');
}


// Make the desktop icons draggable
const icons = document.querySelectorAll('.desktop-icon');
icons.forEach(icon => {
    icon.setAttribute('draggable', 'true');
    icon.addEventListener('dragstart', dragStart);
});

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id); // Set the id of the dragged element
}

// Allow the recycle bin to accept drops
function openRecycleBin() {
    const recycleBinContainer = document.getElementById('recycle-bin-container');
    recycleBinContainer.classList.toggle('hidden');

    recycleBinContainer.addEventListener('dragover', dragOver);
    recycleBinContainer.addEventListener('drop', drop);
}

function dragOver(event) {
    event.preventDefault(); // Prevent default to allow drop
}

function drop(event) {
    event.preventDefault(); // Prevent default behavior
    const id = event.dataTransfer.getData('text/plain');
    const icon = document.getElementById(id);
    if (icon) {
        recycleBinItems.push(icon.querySelector('span').innerText); // Store the name of the icon
        icon.style.display = 'none'; // Hide the icon
        alert(`${icon.querySelector('span').innerText} has been moved to the recycle bin.`);
        updateRecycleBin();
    }
}

function updateRecycleBin() {
    const recycleBinItemsDiv = document.getElementById('recycle-bin-items');
    recycleBinItemsDiv.innerHTML = ''; // Clear previous items

    recycleBinItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = item;
        recycleBinItemsDiv.appendChild(itemDiv);
    });
}
*/

let recycleBinItems = [];

// Function to open various windows
function openWindow(appName) {
    const windowDiv = document.createElement('div');
    windowDiv.className = 'window';
    windowDiv.setAttribute('draggable', 'true'); // Make window draggable

    let contentHTML = `<div class="window-content">Content for ${appName.charAt(0).toUpperCase() + appName.slice(1)}</div>`;

    if (appName === 'notepad') {
        contentHTML = `
            <textarea class="notepad-textarea" placeholder="Type your notes here..."></textarea>
            <div class="notepad-controls">
                <button onclick="saveNotepad()">Save</button>
                <button onclick="deleteNotepad()">Delete</button>
            </div>
        `;
    } else if (appName === 'calculator') {
        contentHTML = `
            <div class="calculator">
                <input type="text" id="calculator-display" disabled>
                <button onclick="clearDisplay()">C</button>
                <button onclick="appendToDisplay('7')">7</button>
                <button onclick="appendToDisplay('8')">8</button>
                <button onclick="appendToDisplay('9')">9</button>
                <button onclick="appendToDisplay('/')">/</button>
                <button onclick="appendToDisplay('4')">4</button>
                <button onclick="appendToDisplay('5')">5</button>
                <button onclick="appendToDisplay('6')">6</button>
                <button onclick="appendToDisplay('*')">*</button>
                <button onclick="appendToDisplay('1')">1</button>
                <button onclick="appendToDisplay('2')">2</button>
                <button onclick="appendToDisplay('3')">3</button>
                <button onclick="appendToDisplay('-')">-</button>
                <button onclick="appendToDisplay('0')">0</button>
                <button onclick="calculateResult()">=</button>
                <button onclick="appendToDisplay('+')">+</button>
            </div>
        `;
    }

    windowDiv.innerHTML = `
        <div class="window-header" onmousedown="dragStart(event, this.parentElement)" onmouseup="dragEnd(event, this.parentElement)">
            ${appName.charAt(0).toUpperCase() + appName.slice(1)}
            <span class="close-btn" onclick="this.parentElement.parentElement.style.display='none'">X</span>
        </div>
        ${contentHTML}
    `;

    document.getElementById('windows-container').appendChild(windowDiv);
    windowDiv.style.display = 'block';

    // Center the window within the view
    windowDiv.style.left = `${(window.innerWidth - 400) / 2}px`;
    windowDiv.style.top = `${(window.innerHeight - 300) / 2}px`;

    // Add dragging functionality
    windowDiv.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', `${windowDiv.style.left},${windowDiv.style.top}`);
        windowDiv.style.opacity = 0.5; // Optional: make it transparent while dragging
    });

    windowDiv.addEventListener('dragend', () => {
        windowDiv.style.opacity = 1; // Restore opacity after dragging
    });

    windowDiv.addEventListener('dragover', (event) => {
        event.preventDefault(); // Allow drop
    });

    windowDiv.addEventListener('drop', (event) => {
        const coords = event.dataTransfer.getData('text/plain').split(',');
        const newLeft = event.clientX - (windowDiv.offsetWidth / 2);
        const newTop = event.clientY - (windowDiv.offsetHeight / 2);
        windowDiv.style.left = `${newLeft}px`;
        windowDiv.style.top = `${newTop}px`;
    });
}

// Save notes from Notepad
function saveNotepad() {
    const textArea = document.querySelector('.notepad-textarea');
    if (textArea) {
        const savedText = textArea.value;
        alert("Notes saved!"); // Replace this with actual saving logic if needed
    }
}

// Delete notes from Notepad
function deleteNotepad() {
    const textArea = document.querySelector('.notepad-textarea');
    if (textArea) {
        textArea.value = ''; // Clear the textarea
        alert("Notes deleted!"); // Replace this with actual deletion logic if needed
    }
}

// Functions for the calculator
function appendToDisplay(value) {
    const display = document.getElementById('calculator-display');
    display.value += value;
}

function calculateResult() {
    const display = document.getElementById('calculator-display');
    try {
        display.value = eval(display.value); // Evaluate the expression
    } catch (error) {
        display.value = 'Error';
    }
}

function clearDisplay() {
    const display = document.getElementById('calculator-display');
    display.value = '';
}

// Make the desktop icons draggable
const icons = document.querySelectorAll('.desktop-icon');
icons.forEach(icon => {
    icon.setAttribute('draggable', 'true');
    icon.addEventListener('dragstart', dragStart);
});

// Handle drag start event for icons
function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id); // Set the id of the dragged element
}

// Open recycle bin and allow drops
function openRecycleBin() {
    const recycleBinContainer = document.getElementById('recycle-bin-container');
    recycleBinContainer.classList.toggle('hidden');

    recycleBinContainer.addEventListener('dragover', dragOver);
    recycleBinContainer.addEventListener('drop', drop);
}

// Allow the recycle bin to accept drops
function dragOver(event) {
    event.preventDefault(); // Prevent default to allow drop
}

function drop(event) {
    event.preventDefault(); // Prevent default behavior
    const id = event.dataTransfer.getData('text/plain');
    const icon = document.getElementById(id);
    if (icon) {
        recycleBinItems.push(icon.querySelector('span').innerText); // Store the name of the icon
        icon.style.display = 'none'; // Hide the icon
        alert(`${icon.querySelector('span').innerText} has been moved to the recycle bin.`);
        updateRecycleBin();
    }
}

// Update recycle bin display
function updateRecycleBin() {
    const recycleBinItemsDiv = document.getElementById('recycle-bin-items');
    recycleBinItemsDiv.innerHTML = ''; // Clear previous items

    recycleBinItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = item;
        recycleBinItemsDiv.appendChild(itemDiv);
    });
}
