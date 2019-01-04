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

        img.classList.add('cardsStyle')
        div.appendChild(img);
        div.id = cards[i].idName;
        document.querySelector('.cards').appendChild(div);
     }
    //  document.querySelector('.deck').addEventListener('click', (el)=>{
    //      debugger;
    //     // deck.splice(, 1);
    //  })
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
            img.src = "http://www.clashapi.xyz/images/cards/"+randomDeck[i].idName+".png";
            div.appendChild(img);
            img.classList.add('cardsStyle')
            img.classList.add('cardDeck')
            document.querySelector('.deck').appendChild(div);
        }
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









 