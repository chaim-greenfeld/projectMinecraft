



const tools = document.createElement("nav");
tools.className = 'tools';
document.body.appendChild(tools)

const tails = document.createElement("div");
tails.className = 'tails'
document.body.appendChild(tails)

const container = document.createElement("div");
container.id = "container";
document.body.appendChild(container);


const reset = document.createElement("button");
reset.textContent = 'Reset Me'
reset.addEventListener('click', e => {
  window.location.href = "index.html"
})
tools.appendChild(reset)

for (let i = 0; i < 1025; i++) {
  const div = document.createElement("div");
  if (i < 492) {
    div.className = "sky";
  } else if (491 < i && i < 533) {
    div.className = "grass item";
  } else if (531 < i && i < 738) {
    div.className = "dirt item";
  } else {
    div.className = "stone item";
  }

  container.appendChild(div);
}


// ======================================================================================================================


const tailsList = ["grass", "dirt", "stone", 'wood', "leaves"];
const too = ['pickaxe', 'axe','shovel','shears']

let choice = "sky";
let tool = 'sky'


for (let i = 0; i < tailsList.length; i++) {
  const div = document.createElement("div");
  div.className = `${tailsList[i]} item` ;
  tails.appendChild(div);
}

for (let i = 0; i < too.length; i++) {
  const div = document.createElement("div");
  div.className = too[i];
  tools.appendChild(div);
}

const inventory = {
  dirt: 0,
  stone: 0,
  grass: 0,
  wood:0,
  person:0,
  leaves:0
};

const inv = document.createElement("div");
inv.className = "inventory";
inv.innerHTML = `grass:${inventory.grass}<br> dirt: ${inventory.dirt} <br> stone: ${inventory.stone} <br> wood: ${inventory.wood} <br> leaves: ${inventory.leaves}`;
tools.appendChild(inv);

function renderInv() {
  inv.textContent = `grass: ${inventory.grass} | dirt: ${inventory.dirt} | stone: ${inventory.stone} | wood: ${inventory.wood} | leaves: ${inventory.leaves}` ;
}

container.addEventListener("click", (e) => {

    if (e.target.className == 'sky' ) {
        if (!choice) return;

        const blockType = choice.split(" ")[0];

    if (blockType !== "sky") {
      if ((inventory[blockType] ?? 0) <= 0) return; 
      inventory[blockType] -= 1;           
      renderInv();
    }
        e.target.className = choice 
        tool = null
    }

    else  if (e.target.className == 'dirt item' && tool == 'shovel'){
        e.target.className = 'sky'
        inventory["dirt"] += 1
        renderInv()
    }

    else if (e.target.className == 'grass item' && tool == 'shovel'){
        e.target.className = 'sky'
        inventory["grass"] += 1
        renderInv()
    }

    else if (e.target.className == 'stone item' && tool == 'pickaxe') {
        e.target.className = 'sky'
         inventory["stone"] += 1
        renderInv()
    }
     else if (e.target.className === 'wood item' && tool === 'axe') {
        e.target.className = 'sky';
        inventory["wood"] += 1
        renderInv()
    }
    else if (e.target.className === 'leaves item' && tool === 'shears') {
      e.target.className = 'sky'
      inventory['leaves'] += 1
      renderInv()
    }

    else {
        
    }
});






function createTrees(column, rowStart) {
    const width = 41; 
    
    for (let row = rowStart; row < 12; row++) {
        let index = (row * width) + column;
        
        if (container.children[index]) {
            container.children[index].className = 'wood item';
        }
    }
}


function cell(row, col) {
    const width = 41;
    const index = (row * width) + col;
    return container.children[index];
}

function drawLeaves(col, topRow) {
    const halfWidths = [1, 1, 2, 2, 3, 3];
    for (let r = 0; r < halfWidths.length; r++) {
        const hw = halfWidths[r];

        for (let c = col - hw; c <= col + hw; c++) {
            const el = cell(topRow + r, c); 
            if (!el) continue;
            el.className = "leaves item";
        }
    }
}

function createRandomTrees() {
  const treesNum = Math.floor(Math.random() * 3) + 1;
  for (let i = 0 ; i< treesNum; i++){
    const Leaves = Math.floor(Math.random() * 50) + 3;
    const Trees = Math.floor(Math.random() * 6) +4;
;
    drawLeaves(Leaves, Trees -5)
    createTrees(Leaves, Trees)
  }
}

createRandomTrees()
// drawLeaves(6, 1)
// createTrees(6, 6)

// drawLeaves(16, -1)
// createTrees(16, 4)



// drawLeaves(30, 2)
// createTrees(30, 7)


tails.addEventListener("click", (e) => {
    console.log('choice', e.target.className)
  choice = e.target.className;
});

tools.addEventListener('click', e => {
    tool = e.target.className
    choice = null
})
