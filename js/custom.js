

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


    let checkNum = /[0-9]/g;
    if(nameValue === ""){
        setError(userName,"name is required");
    }else if(nameValue.length < 3){
        setError(userName,"name should be between 3 to 20 characters long");
    }else if(nameValue.length > 30){
        setError(userName,"Your name is long");
    }else if(nameValue.match(checkNum)){
        setError(userName,"numbers not allowed");

    }else{
        success(userName);
    }

    if(emailValue === ""){
        setError(userEmail,"email is required");
    }else if(!isValidEmail(emailValue)){
        setError(userEmail,"Enter valid email");
        
    }else{
        success(userEmail);
    }

    if(textValue === ""){
        setError(msg,"message is required");
    }else if(textValue.length < 10){
        setError(msg,"Explain message briefly, at least 10 characters");

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
    input_control.classList.add("error");
    input_control.classList.remove("success");
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
        setLogError(name,"userName required");
    }else if(userValue != 'terah'){
        setLogError(name," Wrong Username");
    }else{
        successLog(name);
    }

    if(pinValue == ''){
        setLogError(pin,"Password required");
    }else if(pinValue != 'terah'){
        setLogError(pin,"Wrong Password");
    }else{
        successLog(pin);
    }

    if (userValue == 'terah' && pinValue == 'terah') {
        location.href = "admin.html";
    }
}

// subscribe validation

let sub_email = document.getElementById("sub-email");
let sub_form = document.getElementById("sub_form");

if(sub_form){
    sub_form.addEventListener("submit",function(e){
        e.preventDefault();
        subValidation();
    });
}

function subErr(element,msg){
    let box_form = element.parentElement;
    let ErrBox = box_form.querySelector(".error");

    ErrBox.innerText = msg;
    box_form.classList.add("error");
    box_form.classList.remove("success");
}
function subSucc(element){
    let box_form = element.parentElement;
    let succBox = box_form.querySelector(".error");

    succBox.innerText = '';
    box_form.classList.add("success");
    box_form.classList.remove("error");
}
function subValidation(){
    let emailVal = sub_email.value.trim();

    if(emailVal == ""){
        subErr(sub_email,"email required");
    }else if(!isValidEmail(emailVal)){
        setError(sub_email,"Enter valid email");
        
    }else{
        subSucc(sub_email);
    }
}
