var deck = [];
var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
     let cards = JSON.parse(this.response);

     for (let i = 0;i < cards.length; i++){
        let div = document.createElement('DIV');
        let img = document.createElement('IMG');
        let idName = cards[i].idName;

        img.style.height = 100 + "px";
        img.style.width = "auto";
        img.src = "http://www.clashapi.xyz/images/cards/"+idName+".png";

        if (cards[i].rarity == "Common") {
            img.classList.add('common')
        }else if (cards[i].rarity == "Rare") {
            img.classList.add('rare')
        }else if(cards[i].rarity == "Epic"){
            img.classList.add('epic')
        }else if (cards[i].rarity == "Legendary") {
            img.classList.add('legendary')
        }

        img.classList.add('cardsStyle')
        div.appendChild(img);
        div.id = cards[i].idName;
        document.querySelector('.cards').appendChild(div);
     }

     document.querySelector('.cards').addEventListener('click', (el)=>{
        if(el.target.classList.contains('cardsStyle') && deck.length < 8){
            deck.push(el.target);
            let div = document.createElement('DIV');
            let img = document.createElement('IMG');
            img.src = el.target.src

            div.appendChild(img);
            img.classList.add('cardsStyle')
            img.classList.add('cardDeck')
            document.querySelector('.deck').appendChild(div);
        }
     })
   }
 };
 xhttp.open("GET", "http://www.clashapi.xyz/api/cards", true);
 xhttp.send();


document.querySelector('#buttonRandomDeck').addEventListener('click', ()=>{
    deleteCard();
    deck.splice(0,8);
    var xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let randomDeck = JSON.parse(this.response);
        for (let i = 0; i < randomDeck.length; i++) {
            deck.push(randomDeck[i])
            let div = document.createElement('DIV');
            let img = document.createElement('IMG');
            if (randomDeck[i].rarity == "Common") {
                img.classList.add('common')
            }else if (randomDeck[i].rarity == "Rare") {
                img.classList.add('rare')
            }else if(randomDeck[i].rarity == "Epic"){
                img.classList.add('epic')
            }else if (randomDeck[i].rarity == "Legendary") {
                img.classList.add('legendary')
            }
            img.src = "http://www.clashapi.xyz/images/cards/"+randomDeck[i].idName+".png";
            div.appendChild(img);
            img.classList.add('cardsStyle')
            img.classList.add('cardDeck')
            document.querySelector('.cardsDeck').appendChild(div);
        }
        getElixirAverage()
      }
    };
    xhttp2.open("GET", "http://www.clashapi.xyz/api/random-deck", true);
    xhttp2.send();
})

function deleteCard(){
    var x = document.querySelectorAll('.cardDeck');
    for (y = 0; y < x.length; y++) {
        x[y].remove();
    }
}

function getElixirAverage(){
    var result = ((deck[0].elixirCost+deck[1].elixirCost+deck[2].elixirCost+deck[3].elixirCost+deck[4].elixirCost+deck[5].elixirCost+deck[6].elixirCost+deck[7].elixirCost)/8)
    document.querySelector('.AverageElixir').innerHTML = "Avergare elexir =" + result.toFixed(1);
}



 