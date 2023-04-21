let addedSection = 1;

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.setData("text1", ev.target.getElementsByTagName("td")[0].textContent);

    ev.dataTransfer.setData("text2", ev.target.getElementsByTagName("td")[2].textContent);
}

var parent;
var target;

function dragDiv(ev) {
    // ev.dataTransfer.setData("")

    ev.dataTransfer.setData("type", "true");
    
    ev.dataTransfer.setData("text1", ev.target.getElementsByTagName("h3")[0].textContent);
    ev.dataTransfer.setData("text2", ev.target.getElementsByTagName("h3")[1].textContent.slice(5));

    parent = ev.target.parentNode;
    target = ev.target;

}

function drop(ev) {
    ev.preventDefault();
    var typeCheck = ev.dataTransfer.getData("type");

    var data1 = ev.dataTransfer.getData("text1"); // TA Name
    var data2 = ev.dataTransfer.getData("text2"); // TA GTID

    if (typeCheck == "true") {
        parent.removeChild(target);
    }

    var entryText = data1 + "\nGTID: " + data2;

    var taContainer = $('<div draggable="true" ondragstart="dragDiv(event)">').addClass("each-TA");

    var taName = $('<h3>').text(data1);
    var taID = $('<h3>').text("GTID: " + data2);

    taContainer.append(taName, taID);
    const sourceDiv = ev.target.id;

    $(`#${sourceDiv}`).append(taContainer);
}

function addSection() {
    //forgoing id's for these textareas currently, will reconsider later
    //id="text-s-1"
    // var newTextArea = $(`<textarea name="section-textarea" id="text-s-${addedSection}" rows="10" placeholder="Enter Section Name">`);
    // var newDiv = $(`<div id="section-${addedSection}" ondrop="drop(event)" ondragover="allowDrop(event)">`).addClass("enter-TA");
    // var newHolder = $('<div>').addClass("single-section");
    // newHolder.append(newTextArea, newDiv);
    // $('.schedule-right').append(newHolder);

    addedSection++;


    const newHolderArea = document.createElement("div");
    newHolderArea.className = "single-section";
    const textAreaNode = document.createElement("textarea");
    textAreaNode.name = "section-textarea";
    textAreaNode.id = `text-s-${addedSection}`;
    textAreaNode.placeholder = "Enter Section Name";
    textAreaNode.rows = "10";


    const newDivNode = document.createElement("div");
    newDivNode.className = "enter-TA";
    newDivNode.id = `section-${addedSection}`
    newDivNode.ondrop = function (ev) {
        ev.preventDefault();
        var typeCheck = ev.dataTransfer.getData("type");

        var data1 = ev.dataTransfer.getData("text1"); // TA Name
        var data2 = ev.dataTransfer.getData("text2"); // TA GTID

        if (typeCheck == "true") {
            parent.removeChild(target);
        }

        var entryText = data1 + "\nGTID: " + data2;

        var taContainer = $('<div draggable="true" ondragstart="dragDiv(event)">').addClass("each-TA");

        var taName = $('<h3>').text(data1);
        var taID = $('<h3>').text("GTID: " + data2);

        taContainer.append(taName, taID);
        const sourceDiv = ev.target.id;

        $(`#${sourceDiv}`).append(taContainer);
    };
    newDivNode.ondragover = function (ev) {
        ev.preventDefault();
    };

    newHolderArea.appendChild(textAreaNode);
    newHolderArea.appendChild(newDivNode);

    document.getElementById("right-schedule").appendChild(newHolderArea);    
}

function removeSection() {
    var select = document.getElementById('right-schedule');
    //I will need to code in handling of when there is only one section left
    select.removeChild(select.lastChild);
    addedSection--;
    console.log(document.getElementById('text-s-2').value);
}

let textBase = "";

function generateScheduleText() {

    

    for (i = 0; i < addedSection; i++) {
        textBase += document.getElementById('text-s-2').value + "\n"

    }

    return textBase;

}

var textFileUrl = null;

function generateTextFileUrl(txt) {
    let fileData = new Blob([txt], {type: 'text/plain'});
    // If a file has been previously generated, revoke the existing URL
    if (textFileUrl !== null) {
        window.URL.revokeObjectURL(textFile);
    }
    textFileUrl = window.URL.createObjectURL(fileData);
    // Returns a reference to the global variable holding the URL
    // Again, this is better than generating and returning the URL itself from the function as it will eat memory if the file contents are large or regularly changing
    return textFileUrl;
};
// Generate the file download URL and assign it to the link
// Wait until the page has loaded! Otherwise the download link element will not exist
window.addEventListener("load", function(){
    generateScheduleText();
    document.getElementById('downloadLink').href = generateTextFileUrl("Hello World");
});