// Globals
var headers = [];
var rows = [];

window.onload = () => {
    headers = localStorage.getObj("headers");
    rows = localStorage.getObj("rows");
   
    populate_table();

    init_modal();
    populate_modal();    
}

function populate_table() {
    var table = document.getElementById("table");

    //Clear html table
    table.innerHTML = "";

    if (headers != null) {
        var headerDiv = table.createTHead();
        for (let header of headers) {
            let headerCell = document.createElement("th");
            headerCell.innerHTML = header;
            headerDiv.appendChild(headerCell);
        }
    }

    if (rows != null) {
        var tbodyDiv = table.createTBody();
        tbodyDiv.id = "tBody";
        for (var i = 1; i < rows.length; i++) {
            let cols = rows[i].split(',');
            if (cols != null) {
                let tr = tbodyDiv.insertRow();
                for (let col of cols) {
                    let td = tr.insertCell();
                    td.innerHTML = col;
                }
            }
        }
    }
}

function init_modal() {
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("modalBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function populate_modal() {
    // Populate the manual entry modal
    var ul = document.getElementById("entries");
    if (headers != null) {
        for (let header of headers) {
            var li = document.createElement("li");

            var label = document.createElement("label");
            label.innerHTML = header;

            var input = document.createElement("input");
            input.setAttribute('type', 'text');

            var newLine = document.createElement("br");
            var newLine2 = document.createElement("br");

            li.appendChild(label);
            li.appendChild(newLine);
            li.appendChild(input);
            li.appendChild(newLine2);

            ul.appendChild(li);
        }
    }
}

function clearTable() {
    if(document.getElementById('tBody') == null) {
        return;
    }

    document.getElementById("tBody").innerHTML = '';
    localStorage.clear();
}

function postManualEntry(){
    // insert to the table
    var table = document.getElementById("table");
    var inputs = document.querySelectorAll('input');
    if (inputs != null) {
        let tr = table.insertRow();
        for (let input of inputs) {
            let td = tr.insertCell();
            td.innerHTML = input.value;

            input.value='';
        }
    }

    // close modal
    var modal = document.getElementById("myModal");
    modal.style.display = "none"; 
}

// Extended localStorage function to handle array and object, since localStorage could only handle strings
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}
