const adminToken = JSON.parse(localStorage.getItem('token'));
if (adminToken == null) {
    window.location.replace('login.html');
}

//some global variables and functions
let txtarea = document.getElementById("myTextarea");
if(txtarea){
    CKEDITOR.replace("myTextarea");
}
//getting token to admin

const getName = adminToken.name;
const getToken = adminToken.token;

const header = new Headers();
header.append('Content-Type', 'application/json');
header.append('Authorization', `Bearer ${getToken}`)

//popup message error
const popup = (msg)=>{
    //popup part
    modal.style.display = "block";
    document.getElementById("popupMsg").innerHTML = msg
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

 //admin name
 const adminName = ()=>{
    const adminName = document.getElementById('adminName');
    if (adminName) {
        return adminName.innerHTML = getName;
    }
 }
 adminName()



//menu bar
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
//Model section
let modal = document.getElementById("myModal");

let closeBtn = document.getElementById("myBtn");
//form validation
let title = document.getElementById("title");
let image = document.getElementById("image");
let body = document.getElementById("myTextarea");
let addBlogs = document.getElementById("addBlogs");
let selectedId = -1;
//for blog
let addBlogBtn = document.getElementById('addBlogBtn');
if (addBlogBtn) {
    addBlogBtn.value = 'Add Blog'; 
}

let selectedIndex = -1;
if(addBlogs){
    addBlogs.addEventListener("submit",function(e){
        e.preventDefault();
        addBlogValidation();
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



 function addBlogValidation(){
    const titleValue = title.value.trim();
    const imageValue = image.files;
    const bodyValue = body.value.trim();
    let count = 0;
    try {
        if (selectedId == -1) {
            let inputData = CKEDITOR.instances.myTextarea.getData();
            if (imageValue.length > 0) {
                const reader = new FileReader();
                    reader.addEventListener("load",async()=>{
                        const response = await fetch('https://my-bland.cyclic.app/blogs',{
                            method: 'POST',
                            headers: header,
                            body: JSON.stringify({
                                head: titleValue,
                                image: reader.result,
                                body: inputData 
                            })
                        })
                        const res = await response.json();
                        
                        if(res.head == titleValue){
                            const successMsg = 'Blog created';
                            popup(successMsg)
                        }else{
                            setError(res)
                        }

                    })
                    reader.readAsDataURL(imageValue[0]);
            }else{
                setError('Image required')
            }
        }else{
            
            let inputData = CKEDITOR.instances.myTextarea.getData();
            addBlogBtn.value = 'Update Blog';
            if (imageValue.length > 0) {
                const reader = new FileReader();
                    reader.addEventListener("load",async()=>{
                        console.log(selectedId)
                        const response = await fetch(`https://my-bland.cyclic.app/blogs/${selectedId}/update`,{
                            method: 'PATCH',
                            headers: header,
                            body: JSON.stringify({
                                head: titleValue,
                                image: reader.result,
                                body: inputData 
                            })
                        })
                        const res = await response.json();
                        
                        if(res.head == titleValue){
                            const successMsg = 'Blog Updated';
                            popup(successMsg)
                        }else{
                            setError(res)
                        }

                    })
                    reader.readAsDataURL(imageValue[0]);
            }else{
                setError('Image required')
            }
        }
        
    } catch (error) {
        console.log(error)
    }

    }

    // display article in table


        //display article table section
           async function articleTable(){
            const artCont = document.querySelector(".art-table");
            const response = await fetch('https://my-bland.cyclic.app/blogs');
            const blogs =  await response.json();
            if (artCont) {
                const tbody = artCont.querySelector("tbody")
                if (blogs) {
                    const cutStr = (val,size)=>{
                        let newString = val.split(" ");
                        let newArr = newString.slice(0, size);
                        let txt = ""
                        newArr.forEach((data)=>{
                        txt += data + " "
                        })
                        return txt;
                    }
                    tbody.innerHTML = "";
                    let no = 1;
                    let id = ""
                    blogs.forEach((data) => {
                        id = JSON.stringify(data._id);
                        tbody.innerHTML += `
                        <tr>
                            <td>${no++}</td>
                            <td>${data.head}</td>
                            <td>${cutStr(data.body,5)}...</td>
                            <td class="">
                                <a href='comment.html?id=${data._id}'>view comments</a>
                            </td>
                            <td class="approve">
                                <a href="#" onclick = 'update(${id})'>update</a>
                            </td>
                            <td class="pedding">
                                <a href="#" onclick = 'blogDelete(${id})'>delete</a>
                            </td>
                        </tr>
                        `;
                    }); 
            
                    
                }else{
                    tbody.innerHTML = "0 articles";
                }
            }
            
        }
        articleTable(); 
    
        async function blogDelete(id){
            try {
                const response = await fetch(`https://my-bland.cyclic.app/blogs/${id}`,{
                    method: 'DELETE',
                    headers: header
                })
                const del = await response.json();

                if (del.msg == 'blog deleted') {
                    //popup complite message
                    modal.style.display = "block";
                    document.getElementById("popupMsg").innerHTML = del.msg;
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
                    contactDisplay();
                }
            } catch (error) {
                console.log(error)
            }
            articleTable(); 
        }
        
        //update articles
        
        async function update(id){
            selectedId = id;
            addBlogBtn.value = 'Update Blog';
            const response = await fetch(`https://my-bland.cyclic.app/blogs/${id}`)
            const blog = await response.json();
            document.getElementById("title").value = blog.head;
            function submitaftersetdata() {
                this.updateElement();
            }
            CKEDITOR.instances.myTextarea.setData(blog.body,submitaftersetdata);

            /* let getLoc = JSON.parse(localStorage.getItem('articleData'))[index];
            document.getElementById("title").value = getLoc.head;
            function submitaftersetdata() {
                this.updateElement();
            }
            CKEDITOR.instances.myTextarea.setData(getLoc.data,submitaftersetdata); */
        }    
// count subscribed users

async function userCount(){
    const response = await fetch('https://my-bland.cyclic.app/user',{
                method: 'GET',
                headers: header
    });
    const users =  await response.json();
    let userElm = document.getElementById("userNum");
    if (userElm) {
        userElm.innerHTML = users.length
    }
}
userCount();


// count articles

async function artCount(){
    const response = await fetch('https://my-bland.cyclic.app/blogs');
    const blogs =  await response.json();
    let blogElm = document.getElementById("artNum");
    if (blogElm) {
        
        blogElm.innerHTML = blogs.length
    }
}
artCount();

    //get contact

        // display contact messages

        async function contactDisplay(){
            const tbody = document.getElementById("contact-table");
            const response = await fetch('https://my-bland.cyclic.app/messages',{
                method: 'GET',
                headers: header
            });
            const messages =  await response.json();
            if (tbody) {
                if (messages.length > 0) {
                    // let location = JSON.parse(localStorage.getItem("contactData"));
                    
                    tbody.innerHTML = "";
                    let no = 1;
                    let id = "";
                    messages.forEach((data,index) => {
                        id = JSON.stringify(data._id);
                        tbody.innerHTML += `
                        <tr>
                            <td>${no++}</td>
                            <td>${data.name}</td>
                            <td>${data.message}</td>
                            <td class="pedding">
                                <a href="#" onclick='contactDel(${id})'>delete</a>
                            </td>
                        </tr>
                        `;
                    }); 
                }else{
                    tbody.innerHTML = "0 result";
                }
            }
           
        }
        contactDisplay(); 

        //delete message
        async function contactDel(id){
            try {
                const response = await fetch(`https://my-bland.cyclic.app/messages/${id}`,{
                    method: 'DELETE',
                    headers: header
                })
                const del = await response.json();

                if (del == 'message deleted') {
                    //popup complite message
                    modal.style.display = "block";
                    document.getElementById("popupMsg").innerHTML = del;
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
                    contactDisplay();
                }
            } catch (error) {
                console.log(error)
            }
            
            
        }


    //display comment section

    async function commentDisplay(){
        const commCont = document.querySelector(".comment-table");
        let blog_id = location.href.split("=")[1];
        let response = await fetch(`https://my-bland.cyclic.app/blogs/${blog_id}/comments`);
        let comments = await response.json();
        
        if (blog_id) {
            const tbody = commCont.querySelector("tbody"); 
            if (comments != '0 comment') {
                tbody.innerHTML = "";
                let no = 1;
                let id = "";
                 comments.forEach((data) => {
                    id = JSON.stringify(data._id);
                    tbody.innerHTML += `
                    <tr>
                        <td>${no++}</td>
                        <td>${data.name}</td>
                        <td>${data.comment}</td>
                        <td class="pedding">
                            <a href="javascript:void(0)" onclick = 'commDelete(${id})'>delete</a>
                        </td>
                    </tr>
                    `;
                }); 
        
                
            }else{
                tbody.innerHTML = "0 comment";
            }
        }
        
        
    }
    commentDisplay();
    //delete comment
    async function commDelete(id){
        try {
            let blog_id = location.href.split("=")[1];
            const response = await fetch(`https://my-bland.cyclic.app/blogs/${blog_id}/comments/${id}`,{
                method: 'DELETE',
                headers: header
            })
            const del = await response.json();

            if (del == 'comment deleted') {
                popup(del)
                commentDisplay();
            }else{
                alert(del.error)
            }
        } catch (error) {
            console.log(error)
        }
    }

    // logout
    const logout = document.querySelector('.logout');
    logout.addEventListener('click',()=>{
        localStorage.removeItem('token');
        window.location.replace('login.html')
    })



//admin signup

let userName = document.getElementById("name");
let userEmail = document.getElementById("email");
let pin = document.getElementById("pin");
let adminForm = document.getElementById("admin_form");


if(adminForm){
    adminForm.addEventListener("submit",function(e){
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
    const pinValue = pin.value.trim();

try {
    const response = await fetch('https://my-bland.cyclic.app/user/adminsignup',{
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
        //popup complite message
        modal.style.display = "block";
        document.getElementById("popupMsg").innerHTML = 'Complite Signup';
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
        console.log(res)
    }else{
        setError(res)
    }
    
} catch (error) {
// console.log(error)
    setError(error)
}
}