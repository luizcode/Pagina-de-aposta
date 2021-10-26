(function ($, doc) {
  "use strict";

  let gameTypeList = [];

  let gameTypeButtonList = [];

  let $gameDescriptionText = $('[data-js="game-description"]').get();

  let selectedNumbersElementList = [];

  let $typeGameText = $('[data-js="game-name"]').get();
  
  const unSelectedNumberBackground = "#ADC0C4";

  let cartItens = [];

  let cartTotalPrice = 0;

  let selectedGame = {
    type: "",
    description: "",
    range: 0,
    price: 0,
    "max-number": 0,
    color: "",
    "min-cart-value": 0,
  };

  function init() {
    getGame();
    initEvents();
  }

  function initEvents() {
    $('[data-js="clearButton"]').on("click", clickClearGame);
    $('[data-js="completeGame"]').on("click", clickCompleteGame);
    $('[data-js="addCart"]').on("click", clickAddCart);
  }

  function getGame() {
    const ajax = new XMLHttpRequest();
    ajax.open("GET", "games.json", true);
    ajax.send();
    ajax.addEventListener("readystatechange", getInfo, false);
  }

  function getInfo() {
    if (!responseOk(this.readyState, this.status)) {
      return;
    }
    const data = JSON.parse(this.responseText);
    gameTypeList = data.types;
    renderGameName();
    NoElementsInCart();
    setSelectStyleButton(changeTypeGame("Lotofácil"))
  }

  function responseOk(readyState, status) {
    let statusOK = 200;
    let completeState = 4;
    return readyState === completeState && status === statusOK;
  }

  function renderGameName() {
    const $buttonsGameGroup = $('[data-js="buttonsGame"]').get();
    const $fragment = doc.createDocumentFragment();
    gameTypeList.forEach(function (gameTypeObject) {
      const $div = doc.createElement("div");
      $div.classList.add("buttonsGame");
      $div.appendChild(createGameTypeButtonElement(gameTypeObject));
      $fragment.appendChild($div);
    });
    $buttonsGameGroup.appendChild($fragment);
  }

  function createGameTypeButtonElement(gameTypeObject) {
    let $gameButton = doc.createElement("button");
    $gameButton.setAttribute("data-js", gameTypeObject.type);
    $gameButton.classList.add("cfgButton");

    $gameButton.style.setProperty("color", gameTypeObject.color);
    $gameButton.style.setProperty("border-color", gameTypeObject.color);

    $gameButton.textContent = gameTypeObject.type;

    $gameButton.addEventListener("click", GameButtonClick);

    $gameButton.addEventListener("mouseout", function (e) {
      let gameButtonElement = e.target;
      let gameObject = e.target.getAttribute("data-js");
      if (selectedGame.type === gameObject.type) 
      return setUnselectStyleToButton(gameButtonElement, gameObject.color);
    });
    gameTypeButtonList.push($gameButton);

    return $gameButton;
  }

  function getGameObjectByName(gameName) {
    return gameTypeList.filter(function (gameObject) {
      return gameObject.type === gameName;
    })[0];
  }
  
  function setSelectStyleButton(buttonElement) {
    buttonElement.style.backgroundColor = buttonElement.style.borderColor;
    buttonElement.style.color = "#FFF";
    buttonElement.style.fontWeight = "bold";
}
  
  function changeTypeGame(newTypeGame) {
    selectedGame = getGameObjectByName(newTypeGame);


    $gameDescriptionText.textContent = selectedGame.description;
    $typeGameText.textContent = selectedGame.type.toUpperCase();

    selectedNumbersElementList = [];
    buildNumbersTypeGame(selectedGame.range);

    gameTypeButtonList.forEach(function (gameButtonElement) {
      if (gameButtonElement.getAttribute("data-js") === selectedGame.type) {
        setSelectStyleButton(gameButtonElement);
      } else {
        setUnselectStyleToButton(gameButtonElement);
      }
        function setUnselectStyleToButton(buttonElement) {
          buttonElement.style.backgroundColor = "transparent";
          buttonElement.style.color = buttonElement.style.borderColor;
          buttonElement.style.fontWeight = "normal";
        }
      });
  }


  function buildNumbersTypeGame(numbersQntd) {
    const $numbersGame = $('[data-js="numbersGame"]').get();
    const $fragment = doc.createDocumentFragment();
    $numbersGame.innerText = "";
    for (let i = 1; i <= numbersQntd; i++) {
      if(numbersQntd < 10){

      }
      let $buttonNumber = doc.createElement("button");
      $buttonNumber.classList.add("buttonsNumbers");
      $buttonNumber.addEventListener("click", clickNumberButton);
      $fragment.appendChild($buttonNumber);
      $buttonNumber.textContent = i;
    }
    $numbersGame.appendChild($fragment);
  }

  function clickNumberButton(e) {
    e.preventDefault();
    let numberElement = e.target;

    if (
      selectedNumbersElementList.indexOf(numberElement) === -1 &&
      selectedNumbersElementList.length === selectedGame["max-number"]
    ) {
      window.alert(
        "Ja selecionou todos os números máximos permitidos para esse game :)"
      );
      return;
    }
    selectNumber(numberElement, true);
  }

  function selectNumber(numberElement, removeRepeated) {
    let indexForSelectedElement =
      selectedNumbersElementList.indexOf(numberElement);

    if (indexForSelectedElement !== -1) {
      if (!removeRepeated) return;

      numberElement.style.backgroundColor = unSelectedNumberBackground;
      selectedNumbersElementList.splice(indexForSelectedElement, 1);

      return;
    }
    selectedNumbersElementList.push(numberElement);
    numberElement.style.backgroundColor = selectedGame.color;
  }

  function GameButtonClick(e) {
    e.preventDefault();
    var newTypeGame = e.target.getAttribute("data-js");
    changeTypeGame(newTypeGame);
    setSelectStyleButton(newTypeGame);
  }

  function removeAllSelectedElements() {
    selectedNumbersElementList.forEach(function (numberElement) {
      numberElement.style.backgroundColor = unSelectedNumberBackground;
    });
    selectedNumbersElementList = [];
  }

  function clickClearGame() {
    removeAllSelectedElements();
  }

  function clickCompleteGame() {
    if (selectedNumbersElementList.length === selectedGame["max-number"]) {
      removeAllSelectedElements();
    }
    randomlySelectNumbers();
  }

  function randomlySelectNumbers() {
    const numberOfGameArea = doc.querySelector('[data-js="numbersGame"]');
    while (selectedNumbersElementList.length < selectedGame["max-number"]) {
      var index = Math.ceil(Math.random() * (selectedGame.range - 1));
      var number = numberOfGameArea.childNodes[index];
      selectedNumber(number, false);
    }
  }

  function selectedNumber(numberElement, removeRepeated) {
    var indexForSelectedElement =
      selectedNumbersElementList.indexOf(numberElement);

    if (indexForSelectedElement !== -1) {
      if (!removeRepeated) return;

      numberElement.style.backgroundColor = unSelectedNumberBackground;
      selectedNumbersElementList.splice(indexForSelectedElement, 1);

      return;
    }
    selectedNumbersElementList.push(numberElement);
    numberElement.style.backgroundColor = selectedGame.color;
  }

  function clickAddCart(e) {
    e.preventDefault();

    if (selectedNumbersElementList.length < selectedGame["max-number"]) {
      let restNumbers =
        Number(selectedGame["max-number"]) - selectedNumbersElementList.length;
      return window.alert(
        "Faltam " + restNumbers + " números para ser selecionados"
      );
    }
    if (cartItens.length === 0);

    addNumbersToCart();

    removeAllSelectedElements();
  }

  function addNumbersToCart() {
    let cartItemObject = {
      selectedGame: [],
      typeGame: "",
      price: 0.0,
    };

    let selectedNumbersList = selectedNumbersElementList.map(function (
      numberElement
    ) {
      return numberElement.textContent;
    });

    selectedNumbersList.sort((a,b)=> a-b);

    cartItemObject.selectedGame = selectedNumbersList.reduce(function (
      acumulado,
      number,
      index,
      array
    ) {
      if (index !== array.length - 1) {
        return acumulado + number + ", ";
      }
      return acumulado + number + ". ";
    },
    "");

    cartItemObject.typeGame = selectedGame.type;
    cartItemObject.price = selectedGame.price;

    cartTotalPrice += Number(cartItemObject.price);

    updateTotalPriceText();

    addItemCartElement(cartItemObject);
  }
  function handleRemoveCartButton(e) {
    e.preventDefault();
    var $rowOfCartItem;

    if (e.target.localName === "button") {
      $rowOfCartItem = e.target.parentElement.parentElement;
    } else {
      $rowOfCartItem = e.target.parentElement.parentElement.parentElement;
    }
    var typeGame = $rowOfCartItem.getAttribute("data-js");

    removeCartItemElement($rowOfCartItem);

    var game = getGameObjectByName(typeGame);

    cartTotalPrice -= Number(game.price);

    updateTotalPriceText();
   
    }
  function addItemCartElement(cartItemObject) {
    if(cartItens.length == 0) NoElementsInCart()

    var $fragment = doc.createDocumentFragment();
    var $cartItensArea = $('[data-js="itemCart"]').get();

    var $row = doc.createElement("div");
    var $firstCol = doc.createElement("div");
    var $secondCol = doc.createElement("div");

    var $itemCartContainer = doc.createElement("div");
    var $rowOfSelectedNumber = doc.createElement("div");
    var $spanOfSelectedNumbers = doc.createElement("span");

    var $deleteGameButton = doc.createElement("button");
    var $iconDelete = doc.createElement("i");

    $firstCol.classList.add("col-2");
    $secondCol.classList.add("col-10");

    $itemCartContainer.classList.add(
      "container",
      "border-start",
      "border-4",
      "rounded-start"
    );

    $itemCartContainer.setAttribute(
      "style",
      `border-color: ${selectedGame.color} !important`
    );

    $spanOfSelectedNumbers.classList.add("selectedNumbersTextStyle");
    $rowOfSelectedNumber.classList.add("row");
    $iconDelete.classList.add("bi", "bi-trash", "iconDeleteStyle");
    $deleteGameButton.classList.add("btn", "align-middle");
    $row.classList.add("row", "px-3", "align-items-center", "mb-2", "mt-2");

    $deleteGameButton.appendChild($iconDelete);
    $deleteGameButton.setAttribute("data-js", "deleteGameButton");
    $deleteGameButton.addEventListener("click", handleRemoveCartButton);

    $spanOfSelectedNumbers.setAttribute("data-js", "selectedNumbersText");
    $spanOfSelectedNumbers.textContent = cartItemObject.selectedNumber;
    $rowOfSelectedNumber.appendChild($spanOfSelectedNumbers);

    var $priceOfGameElement = doc.createElement("div");
    
    $priceOfGameElement.innerHTML = `
                <div class="row">
                    <div class="col">
                        <span data-js="numberGameText" class ="textNumberSelected"> ${cartItemObject.selectedGame} <br> </span>
                        <span data-js="typeGameText" class="gameTextStyle" style="color: ${
                          selectedGame.color}">
                            ${cartItemObject.typeGame}
                        </span>
                        <span class="gamePriceTextStyle"></span>
                        <span data-js="priceGame" class="gamePriceTextStyle">
                        ${cartItemObject.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </span>
                    </div>
                </div>
            `;

    $itemCartContainer.appendChild($rowOfSelectedNumber);
    $itemCartContainer.appendChild($priceOfGameElement);

    $firstCol.appendChild($deleteGameButton);
    $secondCol.appendChild($itemCartContainer);

    $row.appendChild($firstCol);
    $row.appendChild($secondCol);

    $row.setAttribute("data-js", cartItemObject.typeGame);

    cartItens.push($row);

    $fragment.appendChild($row);

    $cartItensArea.appendChild($fragment);
    
    NoElementsInCart();
  }
  
  function removeCartItemElement(rowOfCartItem) {
    var indexToRemove = cartItens.indexOf(rowOfCartItem);

    cartItens.splice(indexToRemove, 1);

    rowOfCartItem.remove();
   
    NoElementsInCart();

  }

  function updateTotalPriceText(){
    let $totalPriceCart = $('[data-js="priceTotalCart"]').get()
    
    var formatResult = cartTotalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    $totalPriceCart.textContent = formatResult;
  }

  function NoElementsInCart(){
    var $NocartItensArea = $('[data-js="carrovazio"]').get();
    if( cartItens.length <= 0){
      $NocartItensArea.innerText =  "Você não selecionou nenhum item :("
    }else{
      $NocartItensArea.innerText = ""    
    }
  }

  init();
})(window.dom, document, window);