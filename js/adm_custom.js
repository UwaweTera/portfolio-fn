let txtarea = document.getElementById("myTextarea");
if(txtarea){
    CKEDITOR.replace("myTextarea");
}
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
let img = document.getElementById("img");
let content = document.getElementById("myTextarea");
let adm_form = document.getElementById("adm_form");
let selectedId = -1;
//for update
let selectedIndex = -1;
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
    const imgValue = img.files;
    const contentValue = content.value.trim();
    let count = 0;
    let specialChar =/[^a-zA-Z]{4}$/g;
    if(titleValue === ""){
        setError(title,"title is required");
    }else if(titleValue.length < 10){
        setError(title,"Title should be between 10 to 50 characters long");
    }else if(specialChar.test(titleValue)){
        setError(title,"much special characters and numbers not allowed at least 4");
    }else if(titleValue.length > 100){
        setError(title,"Your name is long, use at least 100 characters");
    }else{
        success(title);
        count++;
    }


    if(imgValue.length  == 0){
        setError(img,"Image required");
    }else{
        success(img);
        count++;
    }

    let inputData = CKEDITOR.instances.myTextarea.getData();


    if(inputData == ""){
        setError(content,"article content required");
    }else if(inputData.length < 100 ){
        setError(content,"Describe articles brifly, at least 200 charcters");

    }else{
        success(content);
        count++;
    }
   
    if(titleValue && imgValue && inputData){

        if (count == 3) {
            const reader = new FileReader();
            reader.addEventListener("load",()=>{
                let data = {
                    head: titleValue,
                    image: reader.result,
                    data: inputData 
                };
                
                if (selectedId == -1) {
                    let getData = JSON.parse(localStorage.getItem('articleData')) || [];
                    getData.push(data);
                    localStorage.setItem("articleData", JSON.stringify(getData));
                }else{
                    let prevData = JSON.parse(localStorage.getItem('articleData'));
                    if (prevData) {
                        prevData.splice(selectedId, 1, data);
                        localStorage.setItem("articleData", JSON.stringify(prevData));
                    }
                    
                }
               
            
                
                
                //popup part
                modal.style.display = "block";
                document.getElementById("popupMsg").innerHTML = "Articles Created";
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
            })
            reader.readAsDataURL(imgValue[0]);
            
        }
        
    }

    }

    // display article in table


        //display article table section
           function articleTable(){
            const artCont = document.querySelector(".art-table");
            if (artCont) {
                const tbody = artCont.querySelector("tbody")
                if (localStorage.getItem(("articleData"))) {
                    let location = JSON.parse(localStorage.getItem("articleData"));
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

                    location.forEach((data,index) => {
                        tbody.innerHTML += `
                        <tr>
                            <td>${no++}</td>
                            <td>${data.head}</td>
                            <td>${cutStr(data.data,5)}...</td>
                            <td class="approve">
                                <a href="#" onclick = "update(${index})">update</a>
                            </td>
                            <td class="pedding">
                                <a href="#" onclick = "delet(${index})">delete</a>
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
    
        function delet(index){
            let loc = JSON.parse(localStorage.getItem("articleData"));
            loc.splice(index, 1);
            localStorage.setItem("articleData",JSON.stringify(loc));
            articleTable(); 
        }
        
        //update articles
        
         function update(index){
            selectedId = index;
            let getLoc = JSON.parse(localStorage.getItem('articleData'))[index];
            document.getElementById("title").value = getLoc.head;
            function submitaftersetdata() {
                this.updateElement();
            }
            CKEDITOR.instances.myTextarea.setData(getLoc.data,submitaftersetdata);
        }    
       
// count subscribed users

function subCount(){
    let getSub= JSON.parse(localStorage.getItem("subData"));
    let subElm = document.querySelectorAll("#subNum")
    let subLength = 0;
    if (getSub) {
        getSub.forEach(data=>{
            subLength++;
        });
        for (let i = 0; i < subElm.length; i++) {
            const elm = subElm[i];
            elm.innerHTML += subLength
        }
    }else{
        subElm.innerHTML += 0;   
    }
}
subCount();


// count articles

function artCount(){
    let getArt= JSON.parse(localStorage.getItem("articleData"));
    let artElm = document.querySelector("#artNum");
    if (artElm) {
        let artLength = 0;
        if (getArt) {
            getArt.forEach(data=>{
                artLength++;
            });
            artElm.innerHTML = artLength;
        }
    }
    
}
artCount();

    //get contact

        // display contact messages

        function contactDisplay(){
            const tbody = document.getElementById("contact-table");
            if (tbody) {
                if (localStorage.getItem(("contactData"))) {
                    let location = JSON.parse(localStorage.getItem("contactData"));
                    
                    tbody.innerHTML = "";
                    let no = 1;
                     location.forEach((data,index) => {
                        tbody.innerHTML += `
                        <tr>
                            <td>${no++}</td>
                            <td>${data.name}</td>
                            <td>${data.message}</td>
                            <td class="pedding">
                                <a href="#" onclick = "contactDel(${index})">delete</a>
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
    
        function contactDel(index){
            let loc = JSON.parse(localStorage.getItem("contactData"));
            loc.splice(index, 1);
            localStorage.setItem("contactData",JSON.stringify(loc));
            contactDisplay(); 
        }


    //display comment section

    function commentDisplay(){
        const commCont = document.querySelector(".comment-table");
        if (commCont) {
            const tbody = commCont.querySelector("tbody"); 
            if (localStorage.getItem(("commentData"))) {
                let location = JSON.parse(localStorage.getItem("commentData"));
                
                tbody.innerHTML = "";
                let no = 1;
                 location.forEach((data,index) => {
                    tbody.innerHTML += `
                    <tr>
                        <td>${no++}</td>
                        <td>${data.name}</td>
                        <td>${data.message}</td>
                        <td class="pedding">
                            <a href="#" onclick = "del(${index})">delete</a>
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

    function del(index){
        let loc = JSON.parse(localStorage.getItem("commentData"));
        loc.splice(index, 1);
        localStorage.setItem("commentData",JSON.stringify(loc));
        commentDisplay(); 
    }

