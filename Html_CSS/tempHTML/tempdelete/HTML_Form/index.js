
function checkValidationss(e){
    e.preventDefault();
    var x = document.getElementById('english');
    var y = document.getElementById('nonEnglish');
    if(x.checked || y.checked){
        console.log("submitted");
        return true;
    }
    else{
        console.log("not submitted");
        return false;
    }
}


// document.getElementById('inputForm').addEventListener("submit",checkValidations);