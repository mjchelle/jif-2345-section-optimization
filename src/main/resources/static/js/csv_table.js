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

function sortTableByName() {
    var table, rows, switching, i, x, y, shouldSwitch;

    table = document.getElementById("table");
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 0; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
            shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[0];
            y = rows[i + 1].getElementsByTagName("TD")[0];
        // Check if the two rows should switch place:
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
         }
        }
        if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

function sortTableByYear() {
    var table, rows, switching, i, x, y, shouldSwitch;

    table = document.getElementById("table");
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 0; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
            shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[1];
            y = rows[i + 1].getElementsByTagName("TD")[1];
        // Check if the two rows should switch place:
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
         }
        }
        if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

/*
function findName() {
    var input, filter, table, tr, td, i, text;
    // get name input from type box
    input = document.getElementById("nameInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");

    // loop through table and keep only matches
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            text = td.textContent || td.innerText;
            if (text.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}


function findYear() {
    var input, filter, table, tr, td, i, text;
    // get name input from type box
    input = document.getElementById("yearInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");

    // loop through table and keep only matches
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            text = td.textContent || td.innerText;
            if (text.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
*/

/**
 * Function that finds matches between name and year text input to filter the table.
 * This can be extended in the future to add more constraints or to be more flexible
 * depending on the table that is submitted.
 */
function findMatch() {
    var nInput, yInput, table, tr, td0, td1, i, text0, text1;
    // get name and year from the text boxes
    nInput = document.getElementById("nameInput").value.toUpperCase();
    yInput = document.getElementById("yearInput").value.toUpperCase();
    // get table
    table = document.getElementById("table");
    // get table rows
    tr = table.getElementsByTagName("tr");

    // variable to decide if row is displayed or not
    var display = false;

    // this loop evalaute all rows
    for (i = 0; i < tr.length; i++) {
        var display = true;
        // get name from row
        td0 = tr[i].getElementsByTagName("td")[0];
        // get year from row
        td1 = tr[i].getElementsByTagName("td")[1];
        if (td0) {
            text0 = td0.textContent || td0.innerText;
            // set display to false if no match
            if (text0.toUpperCase().indexOf(nInput) <= -1) {
                display = false;
            }
        }

        if (td1) {
            text1 = td1.textContent || td1.innerText;
            // set display to false if no match
            if (text1.toUpperCase().indexOf(yInput) <= -1) {
                display = false;
            }
        }
        if (display) {
            // if there is match, show row
            tr[i].style.display = "";
        } else {
            // if there is no match, hide row
            tr[i].style.display = "none";
        }
        //This is to reset the variable for the next loop
        display = false;
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
