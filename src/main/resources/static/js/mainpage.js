// Goes to the csv parser traits page.
function tmp() {
    var picker = document.getElementById("picker");
    if (picker.files.length == 0) {
        alert("Please choose a csv file");
        return;
    }
    
    window.location.href = "traitspage_csv.html";
}

