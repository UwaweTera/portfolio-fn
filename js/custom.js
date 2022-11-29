tinymce.init({
    selector: '#myTextarea'
});

var menu = document.getElementById("menu");
menu.addEventListener("click",function(){
    
    let nav = document.getElementById("navbar");
    let icon = document.getElementById("icon-2");


    if(nav.className === "links"){
        nav.className += " resp";
        icon.className = "las la-window-close";
    }else{
        nav.className = "links";
        icon.className = "las la-bars";
    }  
});

//form validation

let userName = document.getElementById("name");
let userEmail = document.getElementById("email");
let msg = document.getElementById("msg");
let form = document.getElementById("form");
if(form){
    form.addEventListener("submit",function(e){
        e.preventDefault();
        formValidation();
    });   
}

function setError(elm,messages){
    let input = elm.parentElement;
    const errorDis= input.querySelector(".error");
    errorDis.innerText = messages;
    input.classList.add('error');
    input.classList.remove('success');
}

function success(element){
    let input = element.parentElement;
    const successDis= input.querySelector(".error");

    successDis.innerText = '';
    input.classList.add('success');
    input.classList.remove('error');
}

const isValidEmail = (email)=>{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function formValidation(){
    const nameValue = userName.value.trim();
    const emailValue = email.value.trim();
    const textValue = msg.value.trim();
    if(nameValue === ""){
        setError(userName,"name is requered");
    }else{
        success(userName);
    }

    if(emailValue === ""){
        setError(userEmail,"email is requered");
    }else if(!isValidEmail(emailValue)){
        setError(userEmail,"Enter valid email");
        
    }else{
        success(userEmail);
    }

    if(textValue === ""){
        setError(msg,"message is requered");
    }else{
        success(msg);
    }
}



//login validation

let name = document.getElementById("userName");
let pin  = document.getElementById("pin");
let login_form = document.getElementById("login_form");

if(login_form){
    login_form.addEventListener("submit",function(e){
        e.preventDefault();
        login_validate();
    });
}

function setLogError(elm,msg){
    let input_control = elm.parentElement;
    let inputError = input_control.querySelector(".error");
    inputError.innerText = msg;
}

function successLog(elm){
    let input_control = elm.parentElement;
    let inputSuccess = input_control.querySelector(".error");
    inputSuccess.innerText = '';
    input_control.classList.add("success");
    input_control.classList.remove("error");
}

function login_validate(){
    let userValue = name.value.trim();
    let pinValue = pin.value.trim();

    if(userValue == ''){
        setLogError(name,"userName Requered");
    }else if(userValue != 'terah'){
        setLogError(name,"unknown Username");
    }else{
        successLog(name);
    }

    if(pinValue == ''){
        setLogError(pin,"Password Requered");
    }
}

//pin errors

function pinErr(elem,msg){
    let input = elem.parentElement;
    let inputSucc = input.querySelector('.error');


    inputSucc.innerText = msg;
} 

function pinSuccess(elem){
    let input = elem.parentElement;
    let inputSucc = input.querySelector('.error');
    inputSucc.innerText = "Strong password";
    input.classList.add("success");
    input.classList.remove("error");
}
pin.onkeyup = function(){

    let numbers = /[0-9]/g;
    let letters = /[a-zA-Z]/g;
    if(!pin.value.match(numbers)){
        pinErr(pin,"pin must contain numbers")
    }else if(!pin.value.match(letters)){
        pinErr(pin,"pin must contain the letters");
    }else if(pin.value.length < 8){
        pinErr(pin,"At least 8 characters");
    }else{
        pinSuccess(pin);
    }
}