"use strict"; 
let map;

function initMap(_lat, _lng) {
    console.log('Map init');
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: _lat,
      lng: _lng
    },
    zoom: 8
  });
}

var addListItem = function(obj){
    var html, newHtml, element;
    // Create HTML string with placeholder text    
        element = '.income__list';
        html = `<div class="item clearfix" id="income-%id%"> 
                    <div class="item__description">%description%</div>                    
                </div>`;

    // Replace the placeholder text with some actual data
    newHtml = html.replace('%description%', obj.description);   

    // Insert the HTML into the DOM
    // https://developer.mozilla.org/en-US/docs/Web/API/element/insertAdjacentHTML
    document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);  

};

function getClientIP(){
    $(function(){
        $.getJSON("https://ip.seeip.org/geoip").done(function(data) {                 
                startUI(data);              
        });
});
}





function startUI(data){      
    delete data['continent_code'];
    delete data['country_code'];
    delete data['country_code3'];
    delete data['region_code'];
    document.querySelector('.budget__income--value').innerHTML = data['city']+', '+data['region'];
    for(var key in data){
        var obj = {
            description: key.toUpperCase() + ' - ' + data[key]
        }
        addListItem(obj)    
    }
    initMap(data['latitude'], data['longitude']);
}


var dispayHiddenElements = function(){
    document.querySelectorAll(".uiDisplay").forEach((el) => {
        el.style.visibility = "visible";
      });
      document.querySelector('.add__btn').style.visibility = 'hidden';      
}

var controller = (function(){

    var setupEventListeners = function(){
        document.querySelector('.add__btn').addEventListener('click', dispayHiddenElements);

        document.querySelector('.add__btn').addEventListener('click', getClientIP); //https://developer.mozilla.org/en-US/docs/Web/Events

        document.addEventListener('keypress', function(event){
            // older browsers uses 'which' property. It is a good practice to include both conditions
            if(event.keyCode === 13 || event.which === 13){ //http://keycodes.atjayjo.com/
                getClientIP();
            }            
        });
    };   

    return{
        init: function(){
            console.log('App has started');
            
            window.onload=function(){
                
                setupEventListeners();
            };
        }
    }
})();

controller.init();