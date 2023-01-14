

var menu = document.getElementById("menu");
if(menu){
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
    
}

//Model section
let modal = document.getElementById("myModal");
let closeBtn = document.getElementById("myBtn");



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
    const emailValue = userEmail.value.trim();
    const textValue = msg.value.trim();

    let count = 0;

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
        count ++;
    }

    if(emailValue === ""){
        setError(userEmail,"email is required");
    }else if(!isValidEmail(emailValue)){
        setError(userEmail,"Enter valid email");
        
    }else{
        success(userEmail);
        count ++;
    }

    if(textValue === ""){
        setError(msg,"message is required");
    }else if(textValue.length < 10){
        setError(msg,"Explain message briefly, at least 10 characters");

    }else{
        success(msg);
        count ++;
    }


    if(nameValue && emailValue && textValue){
       if(count == 3){
            function contact(){
                let contactData = JSON.parse(localStorage.getItem('contactData')) || [];
                contactData.push({
                    name: nameValue,
                    email: emailValue,
                    message: textValue
                });
                localStorage.setItem("contactData",JSON.stringify(contactData));

                //popup part
                modal.style.display = "block";
                document.getElementById("popupMsg").innerHTML = "Message received";
                closeBtn.onclick = function() {
                    modal.style.display = "none";
                    location.reload();
                }
                  window.onclick = function(event) {
                    if (event.target == modal) {
                      modal.style.display = "none";
                      location.reload();
                    }
                  }
            }
            contact(); 
       }
        

      
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
    //counting success
    let count = 0;

    if(emailVal == ""){
        subErr(sub_email,"email required");
    }else if(!isValidEmail(emailVal)){
        setError(sub_email,"Enter valid email");
        
    }else{
        subSucc(sub_email);
        count++;
    }

    if(emailVal){
        if (count == 1) {
            function sub(){
                let subData = JSON.parse(localStorage.getItem('subData')) || [];
                subData.push(emailVal);
                localStorage.setItem("subData",JSON.stringify(subData));

                //popup part
                modal.style.display = "block";
                document.getElementById("popupMsg").innerHTML = "complite subscribe";
                closeBtn.onclick = function() {
                    modal.style.display = "none";
                    location.reload();
                }
                  window.onclick = function(event) {
                    if (event.target == modal) {
                      modal.style.display = "none";
                      location.reload();
                    }
                  }
            }
            sub(); 
        }
    }
}











    //validation to comment btn 
const commForm = document.getElementById("contact-form");

let CommName = document.querySelector(".commName");
let CommEmail = document.querySelector(".commEmail");
let CommMsg = document.querySelector(".commMsg");
if(commForm){
    commForm.addEventListener("submit",function(e){
        e.preventDefault();

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
        commentValidation()
        function commentValidation(){
            const nameValue = CommName.value.trim();
            const emailValue = CommEmail.value.trim();
            const textValue = CommMsg.value.trim();
        
            let count = 0;
            let checkNum = /[0-9]/g;
            if(nameValue === ""){
                setError(CommName,"name is required");
            }else if(nameValue.length < 3){
                setError(CommName,"name should be between 3 to 20 characters long");
            }else if(nameValue.length > 30){
                setError(CommName,"Your name is long");
            }else if(nameValue.match(checkNum)){
                setError(CommName,"numbers not allowed");
        
            }else{
                success(CommName);
                count++;
            }
        
            if(emailValue === ""){
                setError(CommEmail,"email is required");
            }else if(!isValidEmail(emailValue)){
                setError(CommEmail,"Enter valid email");
                
            }else{
                success(CommEmail);
                count++;
            }
        
            if(textValue === ""){
                setError(CommMsg,"message is required");
            }else if(textValue.length < 10){
                setError(CommMsg,"Explain message briefly, at least 10 characters");
        
            }else{
                success(CommMsg);
                count++;
            }
        
        
            if(nameValue && emailValue && textValue){

                if (count == 3) {
                    let articleId = location.href.split('=')[1];
                    function comments(){
                        let commentData = JSON.parse(localStorage.getItem('commentData')) || [];
                        commentData.push({
                            artId: articleId,
                            name: nameValue,
                            email: emailValue,
                            message: textValue
                        });
            
                        localStorage.setItem("commentData",JSON.stringify(commentData));
                        //commForm.reset();
                        //popup part
                        modal.style.display = "block";
                        document.getElementById("popupMsg").innerHTML = "Complite to commenting";
                        closeBtn.onclick = function() {
                            modal.style.display = "none";
                            location.reload();
                        }
                        window.onclick = function(event) {
                            if (event.target == modal) {
                            modal.style.display = "none";
                            location.reload();
                            }
                        }   
                    }
                    comments();
                    countComment();
                    commentDisplay();
                }
                
              
            }
        }
    });   
}


//display comment
function commentDisplay(){
    const cont = document.querySelector(".comment-container");
    if (cont) {
        let articleId = location.href.split('=')[1];
    if (localStorage.getItem(("commentData"))) {
        let location = JSON.parse(localStorage.getItem("commentData"));
        
            cont.innerHTML = "";
            location.forEach((data) => {
                if(data.artId == articleId){
                    cont.innerHTML += `
                    <div class="user-comm">
                            
                        <div class="row">
                            <div class="col-img">
                                <img src="imgs/user-comm.png" alt="">
                            </div>
                            <div class="col-content">
                                <div class="head">
                                    <p class="time">LAST UPDATED ON: AUGUST 20, 2020</p>
                                </div>
                                <div class="body">
                                    <h2>${data.name}</h2>
                                </div>
                                <div class="comm-footer">
                                <p>${data.message} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                }

            }); 
        }else{
            cont.innerHTML = "0 blog";
        }
        

        
    }
}
commentDisplay(); 

//count comment 

function countComment(){
    let getComment = JSON.parse(localStorage.getItem("commentData"));
    let commElement = document.querySelectorAll("#commLength");
    let commLength = 0;
    let articleId = location.href.split('=')[1];
    if (getComment) {
        getComment.forEach(data=>{
            if (data.artId ==  articleId) {
                commLength++
            }
            
        });
        for (let i = 0; i < commElement.length; i++) {
            const elm = commElement[i];
            elm.innerHTML += commLength
        }
    }else{
        for (let i = 0; i < commElement.length; i++) {
            const elm = commElement[i];
            elm.innerHTML = 0;
        }
    }
    
}
countComment();


//adding like
const like = document.getElementById("like");
let likeQty = document.getElementById("likeQty");
if (like) {
    let articleId = location.href.split('=')[1];
    
    like.addEventListener("click",function(){
        this.classList.toggle("liking");
       
        if (this.classList.contains("liking")) {
            likeQty.value = parseInt(likeQty.value) + 1;  
            likeQtyVal = likeQty.value;
            let data = {
                articleId: articleId,
                likeCount : likeQtyVal
            }
            let locLike = getLike() || [];
            locLike.push(data);
            sendLike(locLike);
        }else{
            
            likeQty.value = parseInt(likeQty.value) - 1;  
            let locLike = getLike();
            if (locLike) {
                locLike.pop();
                sendLike(locLike);
            }
        }
    });
    //get like local storage  data
    function getLike(){
        let locLike = JSON.parse(localStorage.getItem('likes'));
        return locLike;
    }
    //send like local storage  data
    function sendLike(data){
        localStorage.setItem('likes',JSON.stringify(data));
    }
    
    let likeDisplay = ()=>{
        let articleId = location.href.split('=')[1];
        const likeLoc = getLike();
        let count = 0;
        if (likeLoc) {
            likeLoc.forEach((data,index)=>{
                if (data.articleId  == articleId) {
                    count++;
                }
            })
        
            likeQty.value = count;
            
        }else{
            likeQty.value = 0;
        }
    }
    likeDisplay();
}



    // blog detail

    function art_detailDisplay(){
        const cont = document.querySelector(".loc_blog");

        if (localStorage.getItem(("articleData"))) {
            let loc = JSON.parse(localStorage.getItem("articleData"));
            const cutStr = (val,size)=>{
                let newString = val.split(" ");
                let newArr = newString.slice(0, size);
                let txt = ""
                newArr.forEach((data)=>{
                  txt += data + " "
                })
                return txt;
            }
            if (cont) {
                cont.innerHTML = "";
                loc.forEach((data,index) => {
                    cont.innerHTML += `
                    <div class="art-item">
                        <div class="row">
                            <div class="col-img">
                                <img src="${data.image}" alt="">
                            </div>
                            <div class="col-content">
                                <div class="head">
                                    <h1 id='detail'>${data.head}</h1>
                                </div>
                                <div class="body">
                                    <p >${cutStr(data.data,13)}...</p>
                                </div>
                                <div class="art-footer">
                                    <a href="blog-2.html?id=${index}" id='viewMore'>view more</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                }); 
            }
            

            
        }else{
            cont.innerHTML = "0 blog";
        }
    }
    art_detailDisplay(); 


// display elements

let blog_id = location.href.split("=")[1];


//display blogs
function blogDisplay(){
    const cont = document.querySelector("#blog_display");
    cont.innerHTML  = "one";
    if (cont) {
    if (localStorage.getItem(("articleData"))) {
        let location = JSON.parse(localStorage.getItem("articleData"))[blog_id];
            cont.innerHTML = "";
                cont.innerHTML = `
                <div class="head">
                    <h1>${location.head}</h1>
                    <p> UPDATED ON: AUGUST 30, 2022
                    </p>
                </div>

                <div class="body">
                    <div class="body-img">
                        <img src="${location.image}" alt="">
                    </div>
                    <div class="body-content">
                       ${location.data}
                    </div>
                </div>
                `;
        }else{
            cont.innerHTML = "0 blog";
        }      

    }
    
}
blogDisplay(); 

