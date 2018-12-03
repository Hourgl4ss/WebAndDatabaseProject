var main = function(){
    enableColorpickButton();
}

var enableColorpickButton = function(){
    $(".pickerButton").click(function(){
        $('body').css('cursor', 'url(../images/' +this.id+ '.png), auto');
        
        //$('guessButton').css('cursor', 'url(../images/' +this.id+ '.png), auto');
    });
}

$(document).ready(main);