(function (DOM, doc, win) {
  "use strict";

  function init() {
    getGame();
    renderNumbersButton();
  }

  let $button1 = new DOM('[data-js="lotofacil"]');
  let $button2 = new DOM('[data-js="megasena"]');
  let $button3 = new DOM('[data-js="quina"]');
  let $span1 = new DOM('[data-js="game-description"]');
  let $span2 = new DOM('[data-js="game-description"]');
  let $span3 = new DOM('[data-js="game-description"]');

  function getGame() {
    const ajax = new win.XMLHttpRequest();
    ajax.open("GET", "./games.json", true);
    ajax.send();
    ajax.addEventListener("readystatechange", getInfo, false);
  }
  function getInfo() {
    if (!responseOk(this.readyState, this.status)) return;
    renderGameName(JSON.parse(this.responseText));
    renderNumbersButton(JSON.parse(this.responseText));
  }

  function responseOk(readyState, status) {
    let statusOK = 200;
    let completeState = 4;
    return readyState === completeState && status === statusOK;
  }

  function renderGameName(game) {
    $button1.on(
      "click",
      function (e) {
        e.preventDefault();
        let el = doc.querySelector('[data-js="lotofacil"]');
        el.style.cssText = "color:  #fff;" + "background-color: #7F3992;";
        getButtonPressedB1()
      },
      true
    );
    $button2.on(
      "click",
      function (e) {
        e.preventDefault();
        let el = doc.querySelector('[data-js="megasena"]');
        el.style.cssText = "color:  #fff;" + "background-color: #01AC66;";
        getButtonPressedB2();
      },
      false
    );
    $button3.on(
      "click",
      function (e) {
        e.preventDefault();
        let el = doc.querySelector('[data-js="quina"]');
        el.style.cssText = "color:  #fff;" + "background-color: #F79C31;";
        getButtonPressed3()
      },
      false
    );
    $button1.get()[0].textContent = game.types[0].type;
    $button2.get()[0].textContent = game.types[1].type;
    $button3.get()[0].textContent = game.types[2].type;
  }


    function getButtonPressedB1(){
        if($button1.on() === $button1.on()){
            renderDescriptionB1(JSON.parse(this.responseText));
        }
    }

    function getButtonPressedB2(){
        if($button2.on() === $button2.on()){
            renderDescriptionB2(JSON.parse(this.responseText));

        }
    }
    function getButtonPressed3(){
        if($button3.on() === $button3.on()){
            renderDescriptionB3(JSON.parse(this.responseText));
        }
    }
    function renderDescriptionB1(description) {
        $span1.get()[0].textContent = description.types[0].description;
    }

    function renderDescriptionB2(description) {
        $span2.get()[0].textContent = description.types[1].description;
    }

    function renderDescriptionB3(description) {
        $span3.get()[0].textContent = description.types[2].description;
    }

  function renderNumbersButton(number) {
    let totNumbers = number.types[2].range;
    for (let i = 1; i <= totNumbers; i++) {
      let $button = doc.createElement("span");
      let textButton = document.createTextNode(`${i}`);
      $button.appendChild(textButton);
      $button.innerHTML = `<button class="buttonsNumbers" data-js="numButtons">${i}</button>`;
      doc.getElementById("nButton").appendChild($button);
    }
  }

  init();
})(window.dom, document, window);
