

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







