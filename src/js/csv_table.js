// Globals
var headers = [];

window.onload = () => {
    $("#table thead tr th").each(function(){
        headers.push($(this).text());
    });

    init_modal();
    populate_modal();    
}

function sortTableByName() {
    var table, rows, switching, i, x, y, shouldSwitch;

    table = $('#table'); 
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = $('#table tbody tr');
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 0; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
            shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
            x = rows[i].getElementsByTagName("td")[0];
            y = rows[i + 1].getElementsByTagName("td")[0];
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
        rows = $('#table tbody tr');
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 0; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
            shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
            x = rows[i].getElementsByTagName("td")[1];
            y = rows[i + 1].getElementsByTagName("td")[1];
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

//get list of section codes from the csv table, so it's not hardcoded a,b,c
function getSectionCodes() {
    var codes = [];
    var header = $('#table thead tr');
    var text = header[0].getElementsByTagName("th")[4].innerHTML;
    var arr = text.split("\n");

    let i;
    for (i = 1; i < arr.length; i++) {
        codes.push(arr[i].split(":")[0]);
    }

    return codes;
}

//populate section tables with section codes
function populateSectionTable() {
    const codes = getSectionCodes();
    const table = document.getElementById("sectiontable");
    for (i = 0; i < codes.length; i++) {
        let row = table.insertRow();
        let code = row.insertCell(0);
        code.innerHTML = codes[i];

        //hard-coded, needs changes if more than 2 columns

        //column for drivers needed
        let col1 = row.insertCell(1);
        let ele = document.createElement('input');
        ele.setAttribute('type', 'text');
        ele.setAttribute('value', '');
        col1.append(ele);

        //column for experience needed
        let col2 = row.insertCell(2);
        let ele2 = document.createElement('input');
        ele2.setAttribute('type', 'text');
        ele2.setAttribute('value', '');
        col2.append(ele2);
    }
}

function submitSectionData() {
    const map = new Map();
    const table = document.getElementById("sectiontable");

    for (r = 1; r < table.rows.length; r++) {
        if (table.rows.item(r).cells[1].getElementsByTagName('input')[0].value === ''
        || table.rows.item(r).cells[2].getElementsByTagName('input')[0].value === '') {
            alert("Please make sure all fields are filled.");
            break;
        }
        var temp = [table.rows.item(r).cells[1].getElementsByTagName('input')[0].value,
            table.rows.item(r).cells[2].getElementsByTagName('input')[0].value];
        map.set(table.rows.item(r).cells[0].innerHTML, temp);
    }

    //map of section code to [drivers needed, experience needed]
    return map;
}

// A function added by Nnamdi to handle Schedule generation
//TODO: use getSectionCodes to generalize the codes instead of just a,b,c
function getScheduleTimes() {
    let codes = getSectionCodes();
    let datamap = submitSectionData(); //section -> section data
    var mapOfSets = new Map();
    var finalMap = new Map();
    var alreadyUsedTAs = new Set();


    for (i = 0; i < codes.length; i++) {
        mapOfSets.set(codes[i], new Set());
        finalMap.set(codes[i], new Set());
    }

    //creates three sets to hold the students available for each section
    var aTimes = new Set();
    var bTimes = new Set();
    var cTimes = new Set();

    var table, rows, name, times;
    table = document.getElementById("table");
    rows = $('#table tbody tr');

    // Goes through and takes the name and availability of each TA
    for (i = 0; i < rows.length; i++) {
        name = rows[i].getElementsByTagName("td")[0].innerHTML;
        times = rows[i].getElementsByTagName("td")[4].innerHTML;
        canDrive = rows[i].getElementsByTagName("td")[3].innerHTML;

        //if a ta could only teach one section, they are automatically assigned to that section
        if (times.length === 1) {
            finalMap.get(times).add(name);
            alreadyUsedTAs.add(name);
            continue;
        }
        for (j = 0; j < codes.length; j++) {
            let code = codes[j];
            if (times.includes(code)) {
                if (datamap.get(code)[0] === '0' && canDrive === 'No') {
                    finalMap.get(code).add(name);
                    alreadyUsedTAs.add(name);
                    continue;
                }
                mapOfSets.get(code).add(name);
            }
        }
        // Adds each TA to the set corresponding to the sections they're available for
        if (times.includes("A")) {
            aTimes.add(name);
        }
        if (times.includes("B")) {
            bTimes.add(name);
        }
        if (times.includes("C")) {
            cTimes.add(name);
        }
    }


    for (i = 0; i < codes.length; i++) {
        code = codes[i];
        if (finalMap.get(code).size === 0) {
            a = Array.from(mapOfSets.get(code));
            for (j = 0; j < a.length; j++) {
                var name1 = a[j];
                if (!alreadyUsedTAs.has(name1)) {
                    finalMap.get(code).add(name1);
                    alreadyUsedTAs.add(name1);
                }
            }
        }
    }


    // const mapSort = new Map([...datamap.entries()].sort((a, b) => a[1][0] - b[1][0]));
    // //console.log(mapSort);
    //
    // //loop through sorted map
    // for (let[key, info] of mapSort) {
    //     if (info[0] === 0) {
    //
    //     }
    // }
// Map(4) {"c" => 4, "a" => 3, "d" => 2, "b" => 1}
    // Takes a pick for each section making sure there's no repetition.
    var firstPick = Array.from(aTimes)[0];

    if (bTimes.has(firstPick)) {
        bTimes.delete(firstPick);
    }

    var secondPick = Array.from(bTimes)[0];

    if (cTimes.has(secondPick)) {
        cTimes.delete(secondPick);
    }

    var thirdPick = Array.from(cTimes)[0];

    //Appends text to the traitspage with the schedule
    // var scheduleText1 = $('<h3>').text(`Section A: ${firstPick}`);
    // var scheduleText2 = $('<h3>').text(`Section B: ${secondPick}`);
    // var scheduleText3 = $('<h3>').text(`Section C: ${thirdPick}`);

    // $('.schedule-right').append(scheduleText1, scheduleText2, scheduleText3);

    for (i = 0; i < codes.length; i++) {
        code = codes[i];
        names = Array.from(finalMap.get(code)).join(', ');
        var temp = $('<h3>').text(`Section ${code}: ${names}`);
        $('.schedule-right').append(temp);
    }

    //firstPick, secondPick, and thirdPick are the names for the schedule output, currently they're being appended to the traitspage,
    //but we could also use the schedule page to show them.

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
    // inputs for columns 2-5
    var input2, input3, input4, input5;
    // checks elements in columns 2-5
    var td2, td3, td4, td5;
    // acts as filter
    var text2, text3, text4, text5;
    // get name and year from the text boxes
    nInput = document.getElementById("nameInput").value.toUpperCase();
    yInput = document.getElementById("yearInput").value.toUpperCase();
    input2 = document.getElementById("input2").value.toUpperCase();
    input3 = document.getElementById("input3").value.toUpperCase();
    input4 = document.getElementById("input4").value.toUpperCase();
    input5 = document.getElementById("input5").value.toUpperCase();
    
    // get table
    table = $('#table'); 
    // get table rows
    tr = $('#table tbody tr'); 

    // variable to decide if row is displayed or not
    var display = false;

    // this loop evalaute all rows
    for (i = 0; i < tr.length; i++) {
        var display = true;
        // get name from row
        td0 = tr[i].getElementsByTagName("td")[0];
        // get year from row
        td1 = tr[i].getElementsByTagName("td")[1];
        // column 2
        td2 = tr[i].getElementsByTagName("td")[2];
        // column 3
        td3 = tr[i].getElementsByTagName("td")[3];
        // column 4
        td4 = tr[i].getElementsByTagName("td")[4];
        // column 5
        td5 = tr[i].getElementsByTagName("td")[5];

        // if any of these do not match, display is set to false
        // this removes the row from table
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

        if (td2) {
            text2 = td2.textContent || td2.innerText;
            // set display to false if no match
            if (text2.toUpperCase().indexOf(input2) <= -1) {
                display = false;
            }
        }

        if (td3) {
            text3 = td3.textContent || td3.innerText;
            // set display to false if no match
            if (text3.toUpperCase().indexOf(input3) <= -1) {
                display = false;
            }
        }

        if (td4) {
            text4 = td4.textContent || td4.innerText;
            // set display to false if no match
            if (text4.toUpperCase().indexOf(input4) <= -1) {
                display = false;
            }
        }

        if (td5) {
            text5 = td5.textContent || td5.innerText;
            // set display to false if no match
            if (text5.toUpperCase().indexOf(input5) <= -1) {
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
    $('#table tbody tr').remove();

    // maybe delete the file using ajax
}

function postManualEntry(){
    // insert to the table
    var table = document.getElementById('table');
    var modal = document.querySelector('#entries');
    var inputs = modal.querySelectorAll('input');
    if (inputs != null) {
        let tr = table.insertRow();
        tr.setAttribute('draggable', 'true');
        tr.setAttribute('ondragstart', 'drag(event)');
        for (let input of inputs) {
            let td = tr.insertCell();
            td.innerHTML = input.value;

            input.value='';
        }
    }
    closeManualEntry();
}

function closeManualEntry() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

// // Extended localStorage function to handle array and object, since localStorage could only handle strings
// Storage.prototype.getObj = function(key) {
//     return JSON.parse(this.getItem(key))
// }
