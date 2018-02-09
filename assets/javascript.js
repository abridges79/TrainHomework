
// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyCne0ATpPpuAoa-L7JygD7xHLeAbJO4Qcw",
  authDomain: "somehting-new.firebaseapp.com",
  databaseURL: "https://somehting-new.firebaseio.com",
  projectId: "somehting-new",
  storageBucket: "somehting-new.appspot.com",
  messagingSenderId: "220752121876"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var trainNAme = $("#train-name").val().trim();
  var destination = $("#destination").val().trim();
  var firstTrain = $("#first-train").val().trim();
  var frequency = $("#frequency").val().trim();
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Creates local "temporary" object for holding Train data
  var newTrain = {
    name: trainNAme,
    dest: destination,
    start: firstTrain,
    freq: frequency,
    // nextTrainFormatted: nextTrainFormatted,
    // minutesTillTrain: minutesTillTrain
  };

  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.start);
  console.log(newTrain.freq);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train").val("");
  $("#frequency").val("");

  return false;

});

database.ref().on("child_added", function (childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainNAme = childSnapshot.val().name;
  var destination = childSnapshot.val().dest;
  var firstTrain = childSnapshot.val().start;
  var frequency = childSnapshot.val().freq;
  // var nextTrainFormatted =  nextTrainFormatted.val().next;
  // var minutesTillTrain = minutesTillTrain.val().minutes;

  console.log(trainNAme);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);

  firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
  currentTime = moment();
  diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  tRemainder = diffTime % frequency;
  minutesTillTrain = frequency - tRemainder;
  nextTrain = moment().add(minutesTillTrain, "minutes").format('hh:mm');

  $("#train-table > tbody").append("<tr><td>" + trainNAme + "</td><td>" + destination + "</td><td>" +
    frequency + "</td><td>" + nextTrain + "</td><td>" + minutesTillTrain + "</td><td>");
});

