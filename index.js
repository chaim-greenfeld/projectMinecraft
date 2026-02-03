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


const tailsList = ["grass", "sky", "dirt", "stone"];
const too = ['shears','shovel', 'pickaxe', 'axe']

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

const data = {
    dirt: 0,
    stone: 0
}
tools.append({data})
container.addEventListener("click", (e) => {

    if (e.target.className == 'sky' ) {
        e.target.className = choice 
        tool = null
    }
    else  if (e.target.className == 'dirt item' && tool == 'shovel'){
        e.target.className = 'sky'
        data[dirt] += 1
    }
    else if (e.target.className == 'grass item' && tool == 'shovel'){
        e.target.className = 'sky'
        data[dirt] += 1
    }
    else if (e.target.className == 'stone item' && tool == 'pickaxe') {
        e.target.className = 'sky'
        data[stone] += 1
    }
    else {
        
    }
});

tails.addEventListener("click", (e) => {
    console.log('choice', e.target.className)
  choice = e.target.className;
});

tools.addEventListener('click', e => {
    tool = e.target.className
    choice = null
})