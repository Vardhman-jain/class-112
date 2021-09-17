prediction_1="";
prediction_2="";

Webcam.set({
    width:350,
    height:300,
    img_format: 'png',
    png_quality:1080,
})
camera=document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML='<img id="preview_image" src="'+data_uri+'">';
    });
}
console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/8SCKz5ahS/model.json',modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!')
}

function check() {
    img= document.getElementById('preview_image');
    classifier.classify(img, gotResult); //here after classifing it we will run the gotResults();
}

function gotResult(error, results) {
if (error) {
    console.log(error);
} else {
    console.log(results);
    document.getElementById("results_emotion_name").innerHTML= results[0].label;
    document.getElementById("results_emotion_name2").innerHTML= results[1].label;
    prediction_1= results[0];
    prediction_2= results[1];
    speak();
    if (prediction_1=="happy") {
        document.getElementById("update_emoji").innerHTML='😀';
    }    
    if (prediction_1=="sad") {
        document.getElementById("update_emoji").innerHTML='😞';
    }
    if (prediction_1=="angry") {
        document.getElementById("update_emoji").innerHTML='😠';
    }

    if (prediction_2=="happy") {
        document.getElementById("update_emoji2").innerHTML='😀';
    }    
    if (prediction_2=="sad") {
        document.getElementById("update_emoji2").innerHTML='😞';
    }
    if (prediction_2=="angry") {
        document.getElementById("update_emoji2").innerHTML='😠';
    }
}    
}

function speak() {
    var synth = windows.speechSynthesis;
    speak_data_1="The first prediction is" + prediction_1;
    speak_data_2="And the second prediction is " + prediction_2;
    var utterThis= new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

