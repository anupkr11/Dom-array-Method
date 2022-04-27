const main = document.getElementById('main');
const addUser = document.getElementById('add-user');
const double = document.getElementById('double');
const millionairies = document.getElementById('show-millionairies');
const sort = document.getElementById('sort');
const wealth = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const getdata = await res.json();

    const user = getdata.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random()*1000000)
    };
    addData(newUser);
}

//doubleMoney functiom
function doubleMoney(){
    data = data.map(user => {
        return {...user, money: user.money*2}
    });
    updateDOM();
}

//sorting by richest function
function sortRichest(){
    data.sort((a, b) => b.money - a.money)

    updateDOM();
}

//filter only millionarirs
function millionairiesonly() {
    data = data.filter(user => user.money > 1000000);
        
    updateDOM();
}

//total wealth function
function totalWealth(){
    const wealthis = data.reduce((acc, user) => (acc += user.money), 0);
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealthis)}</strong></h3>`;
    main.appendChild(wealthEl);
}

//Add new obj to data array
function addData(obj){
    data.push(obj);

    updateDOM();
}

//updtaeDom
function updateDOM(providedData = data){
    //clear main div
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
            item.money)}`;
        main.appendChild(element);
    });
}

function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }
  
  
addUser.addEventListener('click', getRandomUser);
double.addEventListener('click', doubleMoney);
sort.addEventListener('click', sortRichest);
millionairies.addEventListener('click', millionairiesonly);
wealth.addEventListener('click', totalWealth);
