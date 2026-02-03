const tools = document.createElement("nav");
tools.className = 'tools'
document.body.appendChild(tools)

const container = document.createElement("div");
container.id = "container";
document.body.appendChild(container);

const tails = document.createElement("div");
tails.className = 'tails'
document.body.appendChild(tails)



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


const tailsList = ["grass", "sky", "dirt", "stone", 'wood', "leaves"];
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
});


const COLS = 41;

function cell(row, col) {
  return container.children[row * COLS + col];
}


function drawTrunk(col, startRow, height) {
  for (let r = startRow; r < startRow + height; r++) {
    const el = cell(r, col);
    if (!el) continue;
    el.className = "wood item";
  }
}
function drawLeaves(col, topRow) {
  // 5 שורות של עלים, רוחב משתנה: 5,7,9,7,5
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

drawLeaves(10, 3); 
drawTrunk(10, 8, 4);

drawLeaves(25, 1);  
drawTrunk(25, 6, 6);




tails.addEventListener("click", (e) => {
    console.log('choice', e.target.className)
  choice = e.target.className;
});

tools.addEventListener('click', e => {
    tool = e.target.className
    choice = null
})