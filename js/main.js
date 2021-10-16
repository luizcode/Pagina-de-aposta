(function(DOM, doc, win){
    'use strict';
    function init() {
        getTypeGame();
	}

    
    function getTypeGame(){
        const ajax = new win.XMLHttpRequest();
        ajax.open('GET' , './games.json' , true);
        ajax.send();
        ajax.addEventListener('readystatechange', getInfo, false);
    }
    function getInfo(){
        if(!responseOk(this.readyState , this.status)) return;
        renderGameName(JSON.parse(this.responseText));
        renderDescription(JSON.parse(this.responseText));
        // console.log(this.responseText);
    }
    function responseOk(readyState, status) {
		let statusOK = 200;
		let completeState = 4;
		return readyState === completeState && status === statusOK;
	}
    function renderGameName(game){
        let $button1 = new DOM('[data-js="lotofacil"]');
        $button1.on('click', function(e){
            e.preventDefault();
            let el = doc.querySelector('[data-js="lotofacil"]');  
            el.style.cssText =
            'color:  #fff;' +
            'background-color: #7F3992;' 
        },false);
        let $button2 = new DOM('[data-js="megasena"]');
        $button2.on('click', function(e){
            e.preventDefault();
            let el = doc.querySelector('[data-js="megasena"]');  
            el.style.cssText =
            'color:  #fff;' +
            'background-color: #01AC66;' 
            
        },false);
        let $button3 = new DOM('[data-js="quina"]');
        $button3.on('click', function(e){
            e.preventDefault();
            let el = doc.querySelector('[data-js="quina"]');  
            el.style.cssText =
            'color:  #fff;' +
            'background-color: #F79C31;' 
        },false);
        $button1.get()[0].textContent = game.types[0].type;
        $button2.get()[0].textContent = game.types[1].type;
        $button3.get()[0].textContent = game.types[2].type;
    }
    function renderDescription(description) {
        let $span1 = new DOM('[data-js="game-description"]');
        let $span2 = new DOM('[data-js="game-description"]');
		$span1.get()[0].textContent = description.types[0].description;
        // $span2.get()[0].textContent = description.types[1].description;
        // $span3.get()[0].textContent = description.types[2].description;
	}

    init();
})(window.dom, document, window); 