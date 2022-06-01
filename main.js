input="";
stat=""
objects=[];
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
    if(stat!=""){

        ObjectDetector.detect(video,gotResults);

        for(i=0;i<objects.length;i++){

            document.getElementById("status").innerHTML="Status : Object(s) detected successfully";
            document.getElementById("NoOfObject(s)Detected").innerHTML="Number of objects = "+objects.length;

            fill("#00bfff");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            stroke("00bfff");
            noFill();
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].y)

            if(objects[0].label==input){

                video.stop();
                ObjectDetector.detect(gotResults);
                document.getElementById("InputObjectDetected").innerHTML=input+" has been detected";
                speak();
        
            }
            else{
    
                document.getElementById("InputObjectDetected").innerHTML=input+" has not been detected";
    
            }

        }

    }

}

function gotResults(error,results){

    if(error){

        console.log(error);
    }
    else{

        console.log(results);
        objects=results;

    }

}

function speak(){

    synth=window.speechSynthesis;
    speak_data=input+" has been detected";
    utter_this=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utter_this);

}