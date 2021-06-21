
var GMvariables = {
    devil: false,
    interval: 2000,
    timerSecs: 2,
    live: 10,
    points: 0
}



$(document).ready( function () {
    let choice = confirm("can we start the game?");            // confirmation to start the game

    startUpBindings();                                          //click binding for body elemets                        
    if(choice){
        start("ok lets begin the game");                        //start the game with 2sec timer
    }

});


//click binding for body elemets

function startUpBindings(){
    $("body").bind("click", function(event){
        oldinterval = GMvariables.interval;
        GMvariables.interval = (GMvariables.interval<=400) ? 400 : (GMvariables.interval - 50);

        if((GMvariables.points == 0) || (GMvariables.devil == false)){
            deviElementHide();
            devilLoop();
            GMvariables.points++;
        }

        else if(event.target.id == "clickElement"){
            GMvariables.points++;
            deviElementHide();
            stopAndRestartDevilLoop()
        }
        else{
            deviElementHide();
            GMvariables.live--;
            stopAndRestartDevilLoop();
            $(".notification").show();
            setTimeout(() => {
                $(".notification").hide();
            }, 500);
        }
        if(GMvariables.points != 1 ){
            if(oldinterval != GMvariables.interval){
                stopAndRestartDevilLoop();
            }
        }

        if(event.target.id == "restart"){
            $("#restart").hide();
            $("#timer").text("Ahhh here we go again ...");
            startGameTimer();
        }
        console.log("clicked");
    });
}

//reset function to reset all the game variables
function reset(){
    GMvariables.devil = false;
    GMvariables.interval = 2000;
    GMvariables.timerSecs = 2; 
    GMvariables.points = 0;
    GMvariables.live = 10;
}

// to re initialize the devil loop with decreased interval value
function stopAndRestartDevilLoop(){
    clearInterval(GMvariables.devil);
    GMvariables.devil = false;
    devilLoop()
}

// to hide the devil element 
function deviElementHide(){
    $("#clickElement").hide();
}

// to show the devil element
function devilElementShow(){
    $("#clickElement").show();
}


// devil loop to display the devil after fixed interval
function  devilLoop(){
    GMvariables.devil = setInterval(() => {
        changePositionOfElement()
        if(GMvariables.live<1){
            deviElementHide();
            clearInterval(GMvariables.devil);
        }
    }, GMvariables.interval);
    // console.log("from loop = " + interval);
}


// start the game with the game timer
function start(data) {
    startGameTimer();
}

// function to get the desktop resolution
function getResolution(){
    var width = $(window).width() - 100;
    var height = $(window).height() - 100;
    return [width, height];
}

// change the position of the devil element after click or time expired
function changePositionOfElement(){
    var [width, height] = getRandomPosition();
    if($("#clickElement").is(":visible")){
        GMvariables.live--;
    }else{
        devilElementShow();
    }
    $("#clickElement").css({'top': height, 'left': width});
    // console.log(width, height);
}

// generate random position to display devil element
function getRandomPosition(){
    min = 0;
    var [width, height] = getResolution();
    a = Math.floor(Math.random()*(width-min+1)+min);
    b = Math.floor(Math.random()*(height-min+1)+min);
    return([a, b]);
}


// start the game counter then it will initillize depending game function
function startGameTimer(){
    var timer = setInterval(() => {
        console.log(GMvariables.timerSecs);
        $("#timer").text(GMvariables.timerSecs);
        if(GMvariables.timerSecs == 0){
            $("#timer").text("Go");
            clearInterval(timer);
            setTimeout(() => {
                $("#timer").css("display", "none");
                reset();
                changePositionOfElement();
                headerUpdater();
            }, 1000);
        }
        GMvariables.timerSecs -= 1;
    }, 1000);
    
}

// function to update the header value like points, lives, next time interval etc
function headerUpdater(){
    var timer = setInterval(() => {
        $("#nextDevil").text(GMvariables.interval/1000);
        $("#score").text(GMvariables.points);
        $("#live").text(GMvariables.live);
        if(GMvariables.live<1){
            $("#timer").show();
            $("#timer").text("Score = " + GMvariables.points);
            clearInterval(timer);
            $("#restart").show();
        }
    }, 1);
}





