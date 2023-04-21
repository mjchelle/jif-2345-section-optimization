function validate() {
    if($('#ta_form').val() == '') {
        alert("Please choose a csv file");
        return false; 
    }

    return true;
}
