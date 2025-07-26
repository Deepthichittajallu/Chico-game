let data, chicoRow = 0, chicoCol = 0, fruitRow, fruitCol, startTime;

function Alert() {
  data = parseInt(prompt("Enter grid size:"));
  tab();
  loadControls();
}

function tab() {
  let table1 = document.createElement("table");
  table1.id = "tc";
  for (let j = 0; j < data; j++) {
    let trow = document.createElement("tr");
    for (let i = 0; i < data; i++) {
      let tcol = document.createElement("td");
      tcol.style.width = "80px";
      tcol.style.height = "80px";
      tcol.style.border = "1px solid black";
      tcol.style.background = "#f8c7cc"
      tcol.style.textAlign = "center";
      if (i === 0 && j === 0) {
        let lottieDiv = document.createElement("div");
        lottieDiv.id = "lottie-animation";
        lottieDiv.style.width = "80px";
        lottieDiv.style.height = "80px";
        tcol.appendChild(lottieDiv);
        tcol.classList.add("active-cell");
      }
      trow.appendChild(tcol);
    }
    table1.appendChild(trow);
  }
  document.body.appendChild(table1);
  loadLottieInTable();
  placeFruit();
  startTime = new Date(); 
  function updateTimer() {
  const now = new Date();
  const seconds = Math.floor((now - startTime) / 1000);
  document.getElementById("timer").innerText = `⏱️ Time: ${seconds}s`;
}
setInterval(updateTimer, 1000);

}

function loadLottieInTable() {
  lottie.loadAnimation({
    container: document.getElementById("lottie-animation"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "Dog walking.json" 
  });
}

function loadControls() {
  let box = document.createElement("div");
  box.id = "box1";
  box.style.width = "500px";
  box.style.height = "100px";
  box.style.backgroundColor = "#C5E1A5";
  box.style.border = "2px solid black";
  box.style.marginTop = "30px";
  box.style.borderRadius = "50px";
  box.style.display = "flex";
  box.style.alignItems = "center";
  box.style.justifyContent = "space-around";

  const directions = ["Top", "Bottom", "Left", "Right"];
  directions.forEach(dir => {
    let btn = document.createElement("button");
    btn.innerText = dir;
    btn.style.padding = "10px 20px";
    btn.style.fontSize = "16px";
    btn.style.borderRadius = "50px";
    btn.style.backgroundColor = "#FF6F61";
    btn.onclick = () => moveChico(dir.toLowerCase());
    box.appendChild(btn);
  });

  document.body.appendChild(box);
}

function moveChico(direction) {
  let table = document.getElementById("tc");
  let oldCell = table.rows[chicoRow].cells[chicoCol];
  oldCell.classList.remove("active-cell");
  let lottieDiv = document.getElementById("lottie-animation");
  oldCell.removeChild(lottieDiv);

  if (direction === "top" && chicoRow > 0) chicoRow--;
  else if (direction === "bottom" && chicoRow < data - 1) chicoRow++;
  else if (direction === "left" && chicoCol > 0) chicoCol--;
  else if (direction === "right" && chicoCol < data - 1) chicoCol++;
  else {
    alert("Chico reached limit");
    oldCell.appendChild(lottieDiv); 
    oldCell.classList.add("active-cell");
    return;
  }

  let newCell = table.rows[chicoRow].cells[chicoCol];
  newCell.appendChild(lottieDiv);
  newCell.classList.add("active-cell");
  if (chicoRow === fruitRow && chicoCol === fruitCol) {
    let endTime = new Date();
    let seconds = ((endTime - startTime) / 1000).toFixed(2);
   showResultBox(seconds);
  }
}
function placeFruit() {
     fruitRow = Math.floor(Math.random() * data);
    fruitCol = Math.floor(Math.random() * data);
    if (fruitRow === 0 && fruitCol === 0) {
        fruitRow = 1;
    }

    let fruitCell = document.querySelector(`#tc tr:nth-child(${fruitRow + 1}) td:nth-child(${fruitCol + 1})`);
    fruitCell.innerHTML = "🍎"; 
    fruitCell.id = "fruit-cell"; 
}
function showResultBox(timeTaken) {
    // Remove if already exists
    let oldBox = document.getElementById("resultBox");
    if (oldBox) oldBox.remove();

    // Create result box
    const box = document.createElement("div");
    box.id = "resultBox";
    box.style.position = "fixed";
    box.style.top = "50%";
    box.style.left = "50%";
    box.style.transform = "translate(-50%, -50%)";
    box.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
    box.style.border = "2px solid black";
    box.style.padding = "30px";
    box.style.borderRadius = "20px";
    box.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
    box.style.textAlign = "center";
    box.style.zIndex = "9999";

    const message = document.createElement("div");
    message.innerText = `🎉 Chico reached the fruit in ${timeTaken} seconds!`;
    message.style.fontSize = "20px";
    message.style.marginBottom = "20px";
    box.appendChild(message);

    const restartBtn = document.createElement("button");
    restartBtn.innerText = "🔁 Restart";
    restartBtn.style.padding = "10px 20px";
    restartBtn.style.fontSize = "16px";
    restartBtn.onclick = () => {
        location.reload(); // Reload the page
    };

    box.appendChild(restartBtn);
    document.body.appendChild(box);
}
