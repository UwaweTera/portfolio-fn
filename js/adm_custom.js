
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
