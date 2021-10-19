(function (DOM, doc, win) {
  "use strict";

  function init() {
    getGame();
    renderGameName();

  }
  let gameTypeList = [];
  let gameTypeButtonList = [];

  function getGame() {
    const ajax = new win.XMLHttpRequest();
    ajax.open("GET", "./games.json", true);
    ajax.send();
    ajax.addEventListener("readystatechange", getInfo, false);
  }

  function getInfo() {
    return !responseOk(this.readyState, this.status);
  }

  function responseOk(readyState, status) {
    let statusOK = 200;
    let completeState = 4;
    return readyState === completeState && status === statusOK;
  }

  function renderGameName() {
    const $buttonsGameGroup = new DOM('[data-js="buttonsGame"]').get();
    const $fragment = doc.createDocumentFragment();
    gameTypeList.forEach(
      function(gameTypeObject){
        const $div = doc.createElement('div');
        $div.classList.add('buttonsGame');

        $div.appendChild(createGameTypeButtonElement(gameTypeObject));
        $fragment.appendChild($div);
      }
    );
    $buttonsGameGroup.appendChild($fragment);
  } 
  
  function createGameTypeButtonElement(gameTypeObject){
    let $gameButton = doc.createElement('button');
    $gameButton.setAttribute('data-js', gameTypeObject.type);
    $gameButton.classList.add("cfgButton");
    $gameButton.style.setProperty("color", gameTypeObject.color);
    $gameButton.style.setProperty("border-color", gameTypeObject.color);
    $gameButton.textContent = gameTypeObject.type;
    $gameButton.addEventListener("click", handleGameButtonClick);
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
  
  init();
})(window.dom, document, window);
