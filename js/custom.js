// Gloabal variables and functions

//get token and set to header
const userToken = localStorage.getItem('userToken');
const header = new Headers();
header.append('Content-Type', 'application/json');
header.append('Authorization', `Bearer ${userToken}`)


// main backend url 
const mainUrl = "https://terah-portifolio-bn.onrender.com";

//Getting all database blogs
const getBlogs = async()=>{
    const response = await fetch(`${mainUrl}/blogs`);
    const blogs =  await response.json();
    return blogs
}

//popup message error
 const popup = (msg)=>{
    //Model section
    let modal = document.getElementById("myModal");
    let closeBtn = document.getElementById("myBtn");
    //popup part
    modal.style.display = "block";
    document.getElementById("popupMsg").innerHTML = msg;

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
 //menu bar
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

//display user account box in navigation header
const userImg = document.getElementById('userImg');
const accountBox = document.getElementById('accountBlock');
if (userImg) {
    userImg.addEventListener('click', ()=>{
        const accountBox = document.getElementById('accountBlock');
        accountBox.classList.toggle('show');
    })
}

//experience
const d = new Date();
const year = d.getFullYear();
const month = d.getMonth() + 1;
const day = d.getDate();

const experience = document.getElementById('experience')
if (experience) {
    experience.innerHTML = year - 2019;
}


//contact form validation
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

function setError(messages){
    const errorDis= document.querySelector(".error");
    errorDis.innerText = messages;
    errorDis.style.color = 'red';
}

async function formValidation(){
    const nameValue = userName.value.trim();
    const emailValue = userEmail.value.trim();
    const textValue = msg.value.trim();
    const click_loader = document.querySelector('.click_loader');
    click_loader.className += " show";
try {
    console.log('data url ', mainUrl);
    const response = await fetch(`${mainUrl}/messages`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nameValue,
            email: emailValue,
            message: textValue
        })
    })
    const res = await response.json();
    
    if(res == 'message received'){
        click_loader.className += " hide";
        const successMsg = "Message received";
        popup(successMsg)
    }else{
        click_loader.className += " hide";  
        setError(res)
    }
    
} catch (error) {
// console.log(error)
    setError(error)
}
}




//login form validation

let name = document.getElementById("userName");
let pin  = document.getElementById("pin");
let login_form = document.getElementById("login_form");

if(login_form){
    login_form.addEventListener("submit",function(e){
        e.preventDefault();
        login_validate();
    });
}

async function login_validate(){
    let userValue = name.value.trim();
    let pinValue = pin.value.trim();

    try {
        const response = await fetch(`${mainUrl}/user/login`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userValue,
                password: pinValue
            })
        })
        const res = await response.json();
        console.log(res)
        if(res){
            if (res.role == 'Guest') {
                const userToken = res.token;
                localStorage.setItem('userToken', userToken);
                const successMsg = 'Now You can add comment and likes';
                popup(successMsg)
            }else{
                const userData = {
                    name: res.name,
                    token: res.token
                }
                localStorage.setItem('token', JSON.stringify(userData));
                location.href = "admin.html";
            }
            
        }
        
    } catch (error) {
        setError('Wrong input email or password')
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
    popup('Complite Subscribing')
}

const isValidEmail = (email)=>{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function subValidation(){
    let emailVal = sub_email.value.trim();
    //counting success
    let count = 0;

    if(emailVal == ""){
        subErr(sub_email,"email required");
    }else if(!isValidEmail(emailVal)){
        subErr(sub_email, "Enter valid email");
    }else{
        subSucc(sub_email);
        count++;
    }

/*     if(emailVal){
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
    } */
}



//validation to comment form
const commForm = document.getElementById("comment-form");

let CommName = document.querySelector(".commName");
let CommEmail = document.querySelector(".commEmail");
let CommMsg = document.querySelector(".commMsg");
if(commForm){
    commForm.addEventListener("submit",async(e)=>{
        e.preventDefault();
        
        function setCommError(messages){
            const errorDis= document.querySelector("#commErr");
            errorDis.innerHTML = messages;
            errorDis.style.color = 'red';
        }
            if(userToken === null){
            const coreMsg = 'login before commenting'
            popup(coreMsg)
        }
        const textValue = CommMsg.value.trim();
        try {
            let blogId = location.href.split('=')[1];
            const response = await fetch(`${mainUrl}/blogs/${blogId}/comment`,{
                method: 'POST',
                headers: header,
                body: JSON.stringify({
                    comment: textValue
                })
            });
            const res =  await response.json();
            if (res.comment == textValue) {
                const successMsg = "Complite to commenting";
                popup(successMsg) 
            }else{
                setCommError(res)
            }
        } catch (error) {
            if (localStorage.getItem('userToken')) {
                localStorage.removeItem('userToken');
                location.reload()  
            }
        }
            
    });   
}


//display comment
async function commentDisplay(){
    const cont = document.querySelector(".comment-container");
    if (cont) {
        let blogId = location.href.split("=")[1];
        const response = await fetch(`${mainUrl}/blogs/${blogId}`);
        const currentBlog =  await response.json();
    if (currentBlog) {
            const allComments = currentBlog.comments;
            cont.innerHTML = "";
            for (let index =  allComments.length -1; index >= 0; index--) {
                const data = allComments[index];
                cont.innerHTML += `
                    <div class="user-comm">
                            
                        <div class="row">
                            <div class="col-img">
                                <img src="imgs/user-comm.png" alt="">
                            </div>
                            <div class="col-content">
                                <div class="head">
                                    <p class="time">LAST UPDATED ON: ${data.date}</p>
                                </div>
                                <div class="body">
                                    <h2>${data.name}</h2>
                                </div>
                                <div class="comm-footer">
                                <p>${data.comment} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }else{
            cont.innerHTML = "0 blog";
        }
        

        
    }
}
commentDisplay(); 

//count comment 

async function countComment(){
    let blog_id = location.href.split("=")[1];
    const response = await fetch(`${mainUrl}/blogs/${blog_id}`);
    const currentBlog =  await response.json();

    let commElement = document.querySelectorAll("#commLength");
    //get all element have commLength id adding comment length
    for (let i = 0; i < commElement.length; i++) {
        const elm = commElement[i];
        elm.innerHTML += currentBlog.comments.length
    }
}
countComment();

// Like staff
const like = document.getElementById("like");
let likeQty = document.getElementById("likeQty");
let like_blog_id = location.href.split('=')[1];
if (like) {
    like.addEventListener("click",async()=>{
        if(userToken === null){
            const coreMsg = 'login before liking'
            popup(coreMsg)
        }
        try {
            const response = await fetch(`${mainUrl}/blogs/${like_blog_id}/like`,{

                method: 'PUT',
                headers: header
            });
            const res =  await response.json(); 
            
            if(res == 'liked'){
                like.classList.add('liking')
                countLike()
            }else if(res == 'like removed'){
                like.classList.remove('liking')
                countLike()
            }
        } catch (error) {
            if (localStorage.getItem('userToken')) {
                localStorage.removeItem('userToken');
                location.reload()  
            }
            
        }
        

    })
}
//count like
const countLike = async()=>{
    let response = await fetch(`${mainUrl}/blogs/${like_blog_id}/likes`);
    let res = await response.json();
    
    if (blog_id) {
        if (res > 0) {
            likeQty.innerHTML = res;
            like.classList.add('liking')
        }
        likeQty.innerHTML = res;
    }
}
countLike()


    // Display all blogs in one page file(blogs)

    async function art_detailDisplay(){
        const cont = document.querySelector(".loc_blog");
        const loader = document.querySelector('.loader');
        const blogs =  await getBlogs();
        if (blogs) {
            if(loader){
                loader.style.display = 'none';
            }
            if (blogs.length > 0) {
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
                    for (let index = blogs.length -1; index >=0 ; index--) {
                        const data = blogs[index];
                        cont.innerHTML += `
                        <div class="art-item">
                            <div class="row">
                                <div class="col-img">
                                    <img src="${data.image.url}" alt="">
                                </div>
                                <div class="col-content">
                                    <div class="head">
                                        <h1 id='detail'>${data.head}</h1>
                                    </div>
                                    <div class="body">
                                        <p >${cutStr(data.body,13)}...</p>
                                    </div>
                                    <div class="art-footer">
                                        <a href="blog-2.html?id=${data._id}" id='viewMore'>view more</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `;
                    }
                }
                
    
                
            }else{
                cont.innerHTML = "0 blog";
            }
        }
        
    }
    art_detailDisplay(); 


// display blog by id mean one blog instead of all blog

let blog_id = location.href.split("=")[1];

//display blogs description based on id in file(blog-2)
async function blogDisplay(){
    const cont = document.querySelector("#blog_display");
    // cont.innerHTML  = "one";
    const blogs =  await getBlogs();
    if (cont) {
    if (blogs.length > 0 ) {
        // let location = JSON.parse(localStorage.getItem("articleData"))[blog_id];
        let response2 = await fetch(`${mainUrl}/blogs/${blog_id}`);
        let blog = await response2.json()
            cont.innerHTML = "";
                cont.innerHTML = `
                <div class="head">
                    <h1>${blog.head}</h1>
                    <p> UPDATED ON: ${blog.date}
                    </p>
                </div>

                <div class="body">
                    <div class="body-img">
                        <img src="${blog.image.url}" alt="">
                    </div>
                    <div class="body-content">
                       ${blog.body}
                    </div>
                </div>
                `;
        }else{
            cont.innerHTML = "0 blog";
        }      

    }
    
}
blogDisplay(); 


    // display recent blogs

    async function recentBlogs(){
        const cont = document.querySelector("#recentBlog");
       
        const blogs =  await getBlogs();
        if (blogs.length > 0) {
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
                const newArr = blogs.slice(-3).reverse();
                for (let index = 0; index < newArr.length; index++) {
                    const data = newArr[index];
                    cont.innerHTML += `
                    <div class="blog_col">
                        <a href= "blog-2.html?id=${data._id}">
                            <div class="blogImg">
                                <img src="${data.image.url}" alt="">
                            </div>
                            <div class="blogHead">
                                
                                    <h3>${data.head}</h3>
                                
                            </div>
                        </a>
                    </div>
                    `;
                }
            }
            

            
        }else{
            cont.innerHTML = "0 blog";
        }
    }
    recentBlogs(); 

//user signup

//contact form validation
let userSignName = document.getElementById("name");
let userSignEmail = document.getElementById("email");
let userSignpin = document.getElementById("pin");
let userForm = document.getElementById("user_signup_form");


if(userForm){
    userForm.addEventListener("submit",function(e){
        e.preventDefault();
        userSignValidation();
    });   
}

function setError(messages){
    const errorDis= document.querySelector(".error");
    errorDis.innerText = messages;
    errorDis.style.color = 'red';
}

async function userSignValidation(){
    const nameValue = userSignName.value.trim();
    const emailValue = userSignEmail.value.trim();
    const pinValue = userSignpin.value.trim();

try {
    const response = await fetch(`${mainUrl}/user/signup`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nameValue,
            email: emailValue,
            password: pinValue
        })
    })
    const res = await response.json();
    
    if(res.name == nameValue){
        window.location.href = 'login.html'
    }else{
        setError(res)
    }
    
} catch (error) {
    setError(error)
}
}
