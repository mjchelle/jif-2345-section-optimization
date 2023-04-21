var tas = [];

function TA(firstName, lastName, yearsExperience, hasCar) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearsExperience = yearsExperience;
    this.hasCar = hasCar;
}

function goToMainPage() {
    window.location.href="mainpage.html";
}

function getLength() {
    alert(tas.length);
}
function postRequest() {
    //alert("here");
    var gtID = document.getElementById("gtid").value;
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var yearsExperience = document.getElementById("yearsExperience").value;
    var hasCar = document.getElementById("hasCar").value;
    let newTA = new TA(firstName, lastName, yearsExperience, hasCar);
    tas.push(newTA);

    //alert(tas.length);
    if (gtID.length === 0 || firstName.length === 0 || lastName.length === 0 || yearsExperience.length === 0
     || newTA.length === 0) {
        alert("Please provide a value for all inputs.");
    }

    var table = document.getElementById("table-body");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = firstName;
    cell2.innerHTML = lastName;
    cell3.innerHTML = yearsExperience;
    cell4.innerHTML = hasCar;


    

    // else {
    //     // var settings = {
    //     //     "url": "/new",
    //     //     "method": "POST",
    //     //     "timeout": 0,
    //     //     "headers": {
    //     //         "Content-Type": "application/json"
    //     //     },
    //     //     "data": JSON.stringify({
    //     //         "gtID": gtID,
    //     //         "firstName": firstName,
    //     //         "lastName": "test",
    //     //         "yearsExperience": "test",
    //     //         "hasCar": "test"
    //     //     }),
    //     // };
    //     var search =  JSON.stringify({
    //                  "gtID": gtID,
    //                  "firstName": firstName,
    //                  "lastName": "test",
    //                  "yearsExperience": "test",
    //                  "hasCar": "test"
    //              });
    //
    //     var Success = false;
    //     alert(search);
    //     //alert("right before ajax");
    //     $.ajax({
    //         type: "POST",
    //         contentType: "application/json",
    //         url: "/new",
    //         data: JSON.stringify(search),
    //         dataType: 'json',
    //         cache: false,
    //         timeout: 10,
    //         success: function(response, textStatus, jqXHR) {
    //             Success = true;
    //         },
    //         error: function(jqXHR, textStatus, errorThrown){
    //             Success = false;
    //         }
    //         }
    //     );
    //
    //     alert("Success");
    // }
}
