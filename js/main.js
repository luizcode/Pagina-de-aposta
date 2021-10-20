(function ($, doc, win) {
  "use strict";
  
  let gameTypeList = [];
  
  let gameTypeButtonList = [];
  
  let selectedGame = {
    "type": "",
    "description": "",
    "range": 0,
    "price": 0,
    "max-number": "", //Nao tem como pegar pelo push
    "color": ""
  }

  function init() {
    getGame();
    renderGameName();

  }
  
  function getGame() {
    const ajax = new win.XMLHttpRequest();
    ajax.open("GET", "./games.json", true);
    ajax.send();
    ajax.addEventListener("readystatechange", getInfo, false);
  }

  function getInfo() {
    if(!responseOk){
      return;
    }
  let data = JSON.parse(this.responseText);
  data.types.map((item)=>{
    gameTypeList.push(
      {
        type: item.type,
        description : item.description,
        range: item.range,
        price: item.price,
        maxNumber: item["max-number"],
        color: item.color
      }
    );
  })
}

  function responseOk(readyState, status) {
    let statusOK = 200;
    let completeState = 4;
    return readyState === completeState && status === statusOK;
  }
  function renderGameName() {
    const $buttonsGameGroup = $('[data-js="buttonsGame"]').get();
    const $fragment = doc.createDocumentFragment();
    console.log(gameTypeList);
    gameTypeList.map((item) => {
      console.log(item)
      })
  //   gameTypeList.forEach(
  //     function(gameTypeObject){
  //       const $div = doc.createElement('div');
  //         $div.classList.add('buttonsGame');
  //         $div.appendChild(createGameTypeButtonElement(gameTypeObject));
  //         $fragment.appendChild($div);
  // })
}
   
  function createGameTypeButtonElement(gameTypeObject){
    let $gameButton = doc.createElement('button');
    $gameButton.setAttribute('data-js', gameTypeObject.type);
    $gameButton.classList.add("cfgButton");
    $gameButton.style.setProperty("color", gameTypeObject.color);
    $gameButton.style.setProperty("border-color", gameTypeObject.color);
    $gameButton.textContent = gameTypeObject.type;
    $gameButton.addEventListener("click", handleGameButtonClick,false);
    $gameButton.addEventListener("mouseover", function(e){
      let gameButtonElement = e.target;
      setSelectStyleButton(
        gameButtonElement,
        getGameObjectByName(e.target.getAttribute("data-js")).color
      )
    })
    $gameButton.addEventListener('mouseout',function(e){
      let gameButtonElement = e.target;
      let gameObject = getGameObjectByName(e.target.getAttribute("data-js"));
      if (selectedGame.type === gameObject.type)return;
      setUnselectStyleToButton(gameButtonElement, gameObject.color);
    });
    gameTypeButtonList.push($gameButton);
    
    return $gameButton;
  }

  function setSelectStyleButton(buttonElement){
    buttonElement.style.background = buttonElement.style.borderColor;
    buttonElement.style.color = "#FFF";
    buttonElement.style.fontWeight = "bold";
  }

  function setUnselectStyleToButton(){
    buttonElement.style.background = "transparent";
    buttonElement.style.color = "buttonElement.style.borderColor";
    buttonElement.style.fontWeight = "normal";
  }
  // function handleGameButtonClick(){

  // }
  init();
})(window.dom, document, window);