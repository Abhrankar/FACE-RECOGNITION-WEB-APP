Webcam.set({
    width: 350,
    height: 300,
    image_format: 'jpeg',
    jpeg_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function capture() {
    Webcam.snap(function (data_uri) {
        document.getElementById("output").innerHTML = "<img id='captured_image' src="+data_uri+">";
    });
}

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/3QtlExeqi/model.json',modelLoaded);

function modelLoaded() {
    console.log("model Loaded");
}

function identify() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, result) {
    if (error) {
        //console.error(error);
    } else {
        console.log(result);
        document.getElementById("result_object_name").innerHTML = result[0].label;
        document.getElementById("result_object_accuracy").innerHTML = result[0].confidence.toFixed(2);
    }

}