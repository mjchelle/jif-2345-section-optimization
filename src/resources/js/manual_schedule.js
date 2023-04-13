function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
ev.dataTransfer.setData("text", ev.target.id);
ev.dataTransfer.setData("text1", ev.target.getElementsByTagName("td")[0].textContent);

ev.dataTransfer.setData("text2", ev.target.getElementsByTagName("td")[2].textContent);
}

function dragDiv(ev) {
    // ev.dataTransfer.setData("")
}

function drop(ev) {
ev.preventDefault();
var data = ev.dataTransfer.getData("text");
var data1 = ev.dataTransfer.getData("text1"); // TA Name
var data2 = ev.dataTransfer.getData("text2"); // TA GTID


// check if source is a div or a tr to see how we're gonna pull the info from it.

var entryText = data1 + "\nGTID: " + data2;

var taContainer = $('<div draggable="true" ondragstart="drag(event)">').addClass("each-TA");

var taName = $('<h3>').text(data1);
var taID = $('<h3>').text("GTID: " + data2);

taContainer.append(taName, taID);
const sourceDiv = ev.target.id;

$(`#${sourceDiv}`).append(taContainer);
}