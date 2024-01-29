/* ------- SCRIPT FOR SIDE MENU IN SMALL DEVICE VIEW ------- */
var sidemenu = document.getElementById("sidemenu");
   
function openmenu(){
    sidemenu.style.right = "0";
}
   
function closemenu(){
    sidemenu.style.right = "-200px";
}


/* ------- SCRIPT SHOWING/HIDING DESCRIPTION ------- */

var introduction = document.getElementById("introduction")
var learnButton = document.getElementById("learnBTN")

function introduce() {

console.log(introduction);

console.log(introduction.style.display);


    introduction.style.display = "block";
    learnButton.style.display = "none";
}

function hideIntro(){
    introduction.style.display = "none";
    learnButton.style.display= "block";
}


/* ------- SCRIPT FOR SUBMISSION FORM ------- */

const scriptURL = "https://script.google.com/macros/s/AKfycbySnCEqeTVqeLAVK6x6kWmzzrzUh2Aq4jtLVlHTBTFoZUOTKlN_qtD9hk8Hu25_yZVU/exec"
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")
     
form.addEventListener('submit', e =>{
        e.preventDefault();
        fetch(scriptURL, { method:'POST', body: new FormData(form)})
        .then( response=> {
        msg.innerHTML = " Message sent successfully "
        setTimeout( function(){msg.innerHTML = ""}, 5000)
        form.reset()
    })
     .catch(error => console.error('Error!', error.message))
})

