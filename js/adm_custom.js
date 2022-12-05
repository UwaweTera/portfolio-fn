
tinymce.init({
    selector: '#myTextarea'
});

var menu = document.getElementById("adm-icon");
menu.addEventListener("click",function(){
    
    let left = document.getElementById("left");
    let icon = document.getElementById("adm-menu");

    if(left.className === "leftSide"){
        left.className += " show";
        icon.className = "las la-window-close";
    }

    icon.addEventListener("click",function(){
        left.classList = "leftSide";
        this.style.display = "none";
    })
});
//form validation
let title = document.getElementById("title");
let img = document.getElementById("img");
let content = document.getElementById("myTextarea");
let adm_form = document.getElementById("adm_form");
if(adm_form){
    adm_form.addEventListener("submit",function(e){
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



function formValidation(){
    const titleValue = title.value.trim();
    const contentValue = content.value.trim();

    let specialChar =/[^a-zA-Z]/g;
    if(titleValue === ""){
        setError(title,"title is required");
    }else if(titleValue.length < 3){
        setError(title,"Your name is Too row");
    }else if(titleValue.length > 50){
        setError(title,"Your name is long");
    }else if(titleValue.match(specialChar).length > 3){
        setError(title,"much special character not allowed");
    }else{
        success(title);
    }

    if(contentValue === ""){
        setError(content,"article content required");
    }else{
        success(content);
    }

    }
