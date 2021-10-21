(function ($, doc, win) {
  "use strict";
  
  let gameTypeList = [];
  
  let gameTypeButtonList = [];

  let $gameDescriptionText = $('[data-js="game-description"]').get();

  let selectedNumbersElementList = [];
  
  let selectedGame = {
    "type": "",
    "description": "",
    "range": 0,
    "price": 0,
    "max-number": "",
    "color": ""
  }

  function init() {
    getGame();
  }
  
  function getGame() {
    const ajax = new XMLHttpRequest();
    ajax.open("GET", "games.json", true);
    ajax.send();
    ajax.addEventListener("readystatechange", getInfo, false);
  }

  function getInfo() {
    if(!responseOk(this.readyState,this.status)){
      return;
    }
    const data = JSON.parse(this.responseText);
    gameTypeList = data.types;
    renderGameName();
}

  function responseOk(readyState, status) {
    let statusOK = 200;
    let completeState = 4;
    return readyState === completeState && status === statusOK;
  }

  function renderGameName() {
    const $buttonsGameGroup = $('[data-js="buttonsGame"]').get();
    const $fragment = doc.createDocumentFragment();
    gameTypeList.forEach(
      function(gameTypeObject){
        const $div = doc.createElement('div');
        $div.classList.add('buttonsGame');
        $div.appendChild(createGameTypeButtonElement(gameTypeObject));
        $fragment.appendChild($div);
      })
      $buttonsGameGroup.appendChild($fragment);
    }

    function createGameTypeButtonElement(gameTypeObject){
      let $gameButton = doc.createElement('button');
      $gameButton.setAttribute('data-js', gameTypeObject.type);
      $gameButton.classList.add("cfgButton");
      $gameButton.style.setProperty("color", gameTypeObject.color);
      $gameButton.style.setProperty("border-color", gameTypeObject.color);
      $gameButton.textContent = gameTypeObject.type;
      $gameButton.addEventListener("click", GameButtonClick,false);
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
  function getGameObjectByName(){

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
  function changeTypeGame(newTypeGame){
    selectedGame = getGameObjectByName(newTypeGame);

    $gameDescriptionText.textContent = selectedGame.description;
    $typeGameText.textContent = selectedGame.type;

    selectedNumbersElementList = [];

    gameTypeButtonList.forEach(function(gameButtonElement){
      if(gameButtonElement.getAttribute("data-js")=== selectedGame.type){
        setSelectStyleButton(gameButtonElement);
      }else{
        setUnselectStyleToButton(gameButtonElement);
      }

    })
   }

  function GameButtonClick(e){
    e.preventDefault();
    var newTypeGame = e.target.getAttribute("data-js");
    
    changeTypeGame(newTypeGame);
  }

  init();
})(window.dom, document, window);