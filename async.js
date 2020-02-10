async function getNumber(num){
    numString = num.join(',');
    let resp = await axios.get(`http://numbersapi.com/${numString}?json&notfound=floor`)
    let output = '';
    for (item in resp.data) {
        
        output += resp.data[item].text + '<br>';
    }
    
    
    return output
}

function getNumberPromise(num){
    numString = num.join(',');
    let output = [];
    axios.get(`http://numbersapi.com/${numString}?json&notfound=floor`)
    .then(function(data){ 
        for (item in data.data) {
            
            document.getElementById('content').innerHTML+= (data.data[item].text+"<br>");
            console.log(output)
        }
        return output
    })
    //.then(function(){  });
    //console.log('output',output)
    
}

function getText(data){
    output = []
    
    for (num in data){
        output.push(data[num].text + "<br>")
        
    }
    
    document.getElementById('content').innerHTML = output;
    
}


function getNumberCallback(num){
    numString = num.join(',');
    
    $.ajax({url: `http://numbersapi.com/${numString}?json&notfound=floor`,success: data => getText(data)})
    // console.log("Output:", output )
    // return output
   
}
let counter = 1;
let deckId = 0;
function getNewDeck(){
    axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(response => response.data)
    .then(data => deckId = data.deck_id)
    .then(function(){
        let button = document.createElement('button');
        button.innerHTML = 'GIMME A CARD!';
        button.id = 'card-getter';
        document.getElementById('content').appendChild(button);
    });
}
function getCard(){
    axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    .then(resp => resp.data)
    .then(cardData => cardData.cards[0])
    .then(function(theCard) { 
        counter++; 
        let imageEl = document.createElement('img');
        imageEl.src = theCard.image;
        randomDegrees = Math.floor(Math.random() * Math.floor(45));
        randomDirection = Math.random() < .5 ? '-' : '';
        imageEl.style.transform = `rotate(${randomDirection}${randomDegrees}deg)`;
        document.getElementById('content').appendChild(imageEl)});
        console.log(counter);
        if (counter === 52) {
            document.getElementById('card-getter').style.display = 'none';
        }
    //console.log(deckid)
}
function getTwoCards(){
    axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(response => response.data)
    .then(data => data.deck_id)
    .then(deckid => axios.get(`https://deckofcardsapi.com/api/deck/${deckid}/draw/?count=2`))
    .then(resp => resp.data)
    .then(cardData => cardData.cards)
    .then(function(theCards) { for (card in theCards) { console.log(`${theCards[card].value} of ${theCards[card].suit}`)}});
    //console.log(deckid)
}

window.onload = function(){
    getNewDeck();
    document.getElementById('body').addEventListener('click', function(e){
        let target = e.target;
        if (e.target.id == 'card-getter') {
            getCard();
        }
    })
};