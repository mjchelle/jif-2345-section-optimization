/* !IMPORTANT! We no longer use this file. The logic is moved to php/csv.php. */
// Read csv file selected on the main page
/*
window.onload = () => {
    var headers = [],
    rows = [],
    reader = new FileReader(),
    picker = document.getElementById("picker");
    picker.onchange = () => reader.readAsText(picker.files[0]);
 
    reader.onloadend = () => {
        let csv = reader.result; 
        rows = csv.split("\r\n");
        headers = rows[0].match(/(?:\"([^\"]*(?:\"\"[^\"]*)*)\")|([^\",]+)/g); 

     
        localStorage.setObj("headers", headers);
        localStorage.setObj("rows", rows);
    }
}

// Extended localStorage function to handle array and object, since localStorage could only handle strings
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
*/