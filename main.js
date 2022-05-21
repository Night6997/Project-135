input="";
stat=""
function setup(){

    canvas=createCanvas(500,400);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

}

function start(){

    ObjectDetector=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting object(s)";
    input=document.getElementById("input1").value;

}

function modelLoaded(){

    console.log("Model loaded");
    stat=true;

}

function draw(){

    image(video,0,0,500,400)

}