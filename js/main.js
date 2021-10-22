(function ($, doc) {
  "use strict";
  var teste = "to aqui"
  
  let gameTypeList = [];
  
  let gameTypeButtonList = [];

  let $gameDescriptionText = $('[data-js="game-description"]').get();

  let selectedNumbersElementList = [];
  
  let $typeGameText = $('[data-js="game-name"]').get();
  
  const unSelectedNumberBackground = "#ADC0C4";
  
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
    initEvents();
  }
  
  function initEvents(){
    $('[data-js="clearButton"]').on('click', clickClearGame);
    $('[data-js="completeGame"]').on('click', clickCompleteGame);
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
    renderGameName(
      changeTypeGame("Lotofácil"),
      );
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
    $gameButton.addEventListener("click", GameButtonClick);
    $gameButton.addEventListener("mouseover", function(e){
      let gameButtonElement = e.target;
      setSelectStyleButton(
        gameButtonElement, 
        getGameObjectByName(e.target.getAttribute("data-js")).color
      );
    })
    $gameButton.addEventListener('mouseout',function(e){
      let gameButtonElement = e.target;
      let gameObject = (e.target.getAttribute("data-js"));
      if (selectedGame.type === gameObject.type)return;
      setUnselectStyleToButton(gameButtonElement, gameObject.color);
    });
    gameTypeButtonList.push($gameButton);
    
    return $gameButton;
  }

  function getGameObjectByName(gameName){
    return gameTypeList.filter(function(gameObject){
      return gameObject.type === gameName;
    })[0];
  }

  function setSelectStyleButton(buttonElement){
    buttonElement.style.background = buttonElement.style.borderColor;
    buttonElement.style.color = "#FFF";
    buttonElement.style.fontWeight = "bold";
  }

  function setUnselectStyleToButton(buttonElement){
    buttonElement.style.background = "transparent";
    buttonElement.style.color = buttonElement.style.borderColor;
    buttonElement.style.fontWeight = "normal";
  }

  function changeTypeGame(newTypeGame){
    selectedGame = getGameObjectByName(newTypeGame);

    $gameDescriptionText.textContent = selectedGame.description;
     $typeGameText.textContent = selectedGame.type.toUpperCase();

    selectedNumbersElementList = [];
    buildNumbersTypeGame(selectedGame.range)

    gameTypeButtonList.forEach(function(gameButtonElement){
      if(gameButtonElement.getAttribute("data-js") === selectedGame.type){
        setSelectStyleButton(gameButtonElement);
      }else{
        setUnselectStyleToButton(gameButtonElement);
      }
    });
  }

  function buildNumbersTypeGame(numbersQntd){
    const $numbersGame = $('[data-js="numbersGame"]').get();
    const $fragment = doc.createDocumentFragment();
    $numbersGame.innerText = '';
    for(let i = 1; i <= numbersQntd; i++){
      let $buttonNumber = doc.createElement('button');
      $buttonNumber.classList.add('buttonsNumbers');
      $buttonNumber.addEventListener('click', clickNumberButton) 
      $fragment.appendChild($buttonNumber);
      $buttonNumber.textContent = i;
    }
    $numbersGame.appendChild($fragment);
  }

  function clickNumberButton(e){
    e.preventDefault();
    let numberElement = e.target;
    
    if(
      selectedNumbersElementList.indexOf(numberElement) === -1 && selectedNumbersElementList.length === selectedGame["max-number"]
    ){
      window.alert(
        "Ja selecionou todos os números máximos permitidos para esse game :)"
      )
      return;
    }
    selectNumber(numberElement, true);
  }

  function selectNumber(numberElement, removeRepeated){
    let indexForSelectedElement = 
    selectedNumbersElementList.indexOf(numberElement);

    if(indexForSelectedElement !== -1){
      if(!removeRepeated) return;

      numberElement.style.backgroundColor = unSelectedNumberBackground;
      selectedNumbersElementList.splice(indexForSelectedElement , 1);

      return;
    }
    selectedNumbersElementList.push(numberElement);
    numberElement.style.backgroundColor = selectedGame.color;
  }

  function GameButtonClick(e){
    e.preventDefault();
    var newTypeGame = e.target.getAttribute("data-js");
    
    changeTypeGame(newTypeGame);
  }

  function removeAllSelectedElements(){
    selectedNumbersElementList.forEach(function(numberElement){
      numberElement.style.backgroundColor = unSelectedNumberBackground;
    })
    selectedNumbersElementList = [];
  }

  function clickClearGame(){
    removeAllSelectedElements();
  }

  function clickCompleteGame(){
    if(selectedNumbersElementList.length === selectedGame["max-number"]){
      removeAllSelectedElements();
    }
    randomlySelectNumbers();
  }

  function randomlySelectNumbers(){
    const numberOfGameArea = doc.querySelector('[data-js="numbersGame"]');
    while(selectedNumbersElementList.length < selectedGame["max-number"]){
      var index = Math.ceil(Math.random() * (selectedGame.range-1));
      var number = numberOfGameArea.childNodes[index];
      selectedNumber(number, false)
    }
  }

  function selectedNumber(numberElement, removeRepeated){
    var indexForSelectedElement =
    selectedNumbersElementList.indexOf(numberElement);

    if (indexForSelectedElement !== -1){
      if(!removeRepeated) return;

      numberElement.style.backgroundColor = unSelectedNumberBackground;
      selectedNumbersElementList.splice(indexForSelectedElement , 1);

      return;
    }
    selectedNumbersElementList.push(numberElement);
    numberElement.style.backgroundColor = selectedGame.color;
  }
  init();
})(window.dom, document, window);