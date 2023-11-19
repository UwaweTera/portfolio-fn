//get token and set to header
const userToken = localStorage.getItem("userToken");
const parsedTokenData = JSON.parse(userToken);
const header = new Headers();
header.append("Content-Type", "application/json");
if(parsedTokenData){
  header.append("Authorization", `Bearer ${parsedTokenData.token}`);
}

// some declaration

const userProfile = document.querySelector(".userProfile");
const openProfBtn = document.querySelector("#openProfile");

// check user login
let checkLogin = false;
userToken ? (checkLogin = true) : (checkLogin = false);

// main backend url
const mainUrl = "https://terah-portifolio-bn.onrender.com";
// const mainUrl = "http://localhost:2000";

/*
-------------------------------
    Blogs API
-------------------------------
*/

// logout functionality

const logout = document.querySelector(".logoutBtn");
logout.addEventListener("click", () => {
  localStorage.removeItem("userToken");
  location.reload();
});

const getBlogs = async () => {
  const response = await fetch(`${mainUrl}/blogs`);
  const blogs = await response.json();
  return blogs;
};

//popup message error
const popup = (msg) => {
  //Model section
  let modal = document.getElementById("myModal");
  let closeBtn = document.getElementById("myBtn");
  //popup part
  if (modal) {
    modal.style.display = "block";
    document.getElementById("popupMsg").innerHTML = msg;

    closeBtn.onclick = function () {
      modal.style.display = "none";
      location.reload();
    };
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
        location.reload();
      }
    };
  }
};

/*
-------------------------------
   Start and stop loader
-------------------------------
*/

const subsBtn = document.querySelector(".btn-subs");
const spinner_loader = document.querySelector(".spinner_loader");
const btn_txt = document.querySelector(".btn-txt");

const startLoader = () => {
  spinner_loader.classList.add("button--loading");
  subsBtn.style.background = "rgba(0, 140, 186, 1)";
  subsBtn.style.opacity = "0.5";
  subsBtn.disabled = true;
};

const stopLoader = () => {
  spinner_loader.classList.remove("button--loading");
  subsBtn.style.background = "#008cba";
  subsBtn.style.opacity = "1";
  subsBtn.disabled = false;
};

//menu bar
var menu = document.getElementById("menu");
if (menu) {
  menu.addEventListener("click", function () {
    let nav = document.getElementById("navbar");
    let icon = document.getElementById("icon-2");

    if (nav.className === "links") {
      nav.className += " resp";
      icon.className = "las la-window-close";
    } else {
      nav.className = "links";
      icon.className = "las la-bars";
    }
  });
}

// profile menubar

const profMenuBar = document.querySelector(".profMenuBar");
if (profMenuBar) {
  profMenuBar.addEventListener("click", () => {
    let icon = document.getElementById("icon-1");
    let left = document.querySelector(".leftProf");
    left.style.margin = 0;
    left.style.width = "50%";
  });
}
const profMenuClose = document.querySelector(".profMenuClose");
if (profMenuClose) {
  profMenuClose.addEventListener("click", () => {
    let left = document.querySelector(".leftProf");
    left.style.margin = "-50%";
  });
}
// open profile

if (openProfBtn) {
  openProfBtn.addEventListener("click", () => {
    userProfile.style.display = "block";
  });
}
// close bar for profile

const closeProf = document.querySelector(".closeProf");

if (closeProf) {
  closeProf.addEventListener("click", () => {
    userProfile.style.display = "none";
  });
}
//display user account box in navigation header

const userImg = document.getElementById("userImg");
const accountBox = document.getElementById("accountBlock");
const loginBox = document.querySelector(".loginBox");
const email = document.querySelector("#email");

// profile email and name
let profName = document.getElementById("nameInput");
let profEmail = document.getElementById("emailInput");
const requestAdminRole = document.querySelector("#requestAdminRole");

if (checkLogin) {
  /*
    Get Profile api
  */
  async function getProfile() {
    const response = await fetch(`${mainUrl}/user/profile`, {
      method: "GET",
      headers: header,
    });
    const profile = await response.json();
    email.innerHTML = profile.user.email;
    profName.value = profile.user.name;
    profEmail.value = profile.user.email;

    if (profile.user.requestAdminRole === true) {
      requestAdminRole.checked = true;
    } else {
      requestAdminRole.checked = false;
    }
  }
  getProfile();
}
if (userImg) {
  userImg.addEventListener("click", () => {
    if (checkLogin) {
      if (loginBox.style.display === "block") {
        loginBox.style.display = "none";
      } else {
        loginBox.style.display = "block";
      }
    } else {
      if (accountBox.style.display === "block") {
        accountBox.style.display = "none";
      } else {
        accountBox.style.display = "block";
      }
    }
  });
}

window.addEventListener("click", (event) => {
  if (!userImg.contains(event.target)) {
    accountBox.style.display = "none";
    loginBox.style.display = "none";
  }
});

//experience in about page

const d = new Date();
const year = d.getFullYear();
const month = d.getMonth() + 1;
const day = d.getDate();

const experience = document.getElementById("experience");
if (experience) {
  experience.innerHTML = year - 2019;
}

//contact form validation
let userName = document.getElementById("name");
let userEmail = document.getElementById("contEmail");
let msg = document.getElementById("msg");
let form = document.getElementById("form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    startLoader();
    sendMessage();
  });
}

function setError(messages) {
  const errorDis = document.querySelector(".error");
  errorDis.innerText = messages;
  errorDis.style.color = "red";
}

// subscribe validation

let sub_email = document.getElementById("sub-email");
let sub_form = document.getElementById("sub_form");

if (sub_form) {
  sub_form.addEventListener("submit", function (e) {
    e.preventDefault();
    const emailVal = sub_email.value;
    startLoader();
    if (emailVal == "") {
      subErr(sub_email, "email required");
      stopLoader();
    } else if (!isValidEmail(emailVal)) {
      subErr(sub_email, "Enter valid email");
      stopLoader();
    } else {
      subSucc(sub_email);
      stopLoader();
    }
  });
}

// if (isLoading) {
//     subsBtn.classList.add("button--loading");
// }
// button loader

// subsBtn.addEventListener("click", () => {
//   isLoading = true;
//   if (isLoading) {
//     subsBtn.classList.add("button--loading");
//   }
// });

function subErr(element, msg) {
  let box_form = element.parentElement;
  let ErrBox = box_form.querySelector(".error");

  ErrBox.innerText = msg;
  box_form.classList.add("error");
  box_form.classList.remove("success");
}

function subSucc(element) {
  let box_form = element.parentElement;
  let succBox = box_form.querySelector(".error");

  succBox.innerText = "";
  box_form.classList.add("success");
  box_form.classList.remove("error");
  popup("Complite Subscribing");
}

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// skeleton home blogs

const blogCont = document.querySelector(".loc_blog");
const recent_posts = document.querySelector(".recent_posts");
if (blogCont) {
  const cardTemplate = document.getElementById("card-template");
  for (let i = 0; i < 3; i++) {
    blogCont.append(cardTemplate.content.cloneNode(true));
  }
}
if (recent_posts) {
  const cardTemplate = document.getElementById("card-template");
  for (let i = 0; i < 2; i++) {
    recent_posts.append(cardTemplate.content.cloneNode(true));
  }
}

// skeleton for blog details

const blogDetl = document.querySelector("#blog_display");
const blog_template = document.querySelector(".blog-template");
if (blogDetl) {
  blogDetl.append(blog_template.content.cloneNode(true));
}
// skeleton recent

const recentBlog = document.querySelector("#recentBlog");
if (recentBlog) {
  const recent_template = document.getElementById("recent-template");
  for (let i = 0; i < 2; i++) {
    recentBlog.append(recent_template.content.cloneNode(true));
  }
}

// profile handles

function openProfile(evt, elem) {
  let i, tabContent, tabLinks;

  tabContent = document.getElementsByClassName("tabContent");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" profActive", "");
  }

  document.getElementById(elem).style.display = "block";
  evt.currentTarget.className += " profActive";
}
document.getElementById("defaultOpen").click();

// update

const updateForm = document.querySelector(".updateForm");
let saveBtn = document.querySelector(".saveBtn");

if (updateForm) {
  updateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    startLoader();
  });
}

/*
------------------------------------------------

            Start using Feach API

------------------------------------------------
*/

function subValidation() {
  let emailVal = sub_email.value.trim();
  //counting success
  let count = 0;

  if (emailVal == "") {
    subErr(sub_email, "email required");
  } else if (!isValidEmail(emailVal)) {
    subErr(sub_email, "Enter valid email");
  } else {
    subSucc(sub_email);
    count++;
  }
}
async function sendMessage() {
  const nameValue = userName.value.trim();
  const emailValue = userEmail.value.trim();
  const textValue = msg.value.trim();
  try {
    const response = await fetch(`${mainUrl}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameValue,
        email: emailValue,
        message: textValue,
      }),
    });
    const res = await response.json();

    if (res == "message received") {
      stopLoader();
      const successMsg = "Message received";
      popup(successMsg);
    } else {
      stopLoader();
      setError(res);
    }
  } catch (error) {
    console.log(error);
  }
}

//login form validation

let name = document.getElementById("userName");
let pin = document.getElementById("pin");
let login_form = document.getElementById("login_form");

if (login_form) {
  login_form.addEventListener("submit", function (e) {
    e.preventDefault();
    login_validate();
  });
}

/*
-------------------------------
    Login api
-------------------------------
*/

async function login_validate() {
  let userValue = name.value.trim();
  let pinValue = pin.value.trim();
  console.log("some thing happen");
  startLoader();
  try {
    const response = await fetch(`${mainUrl}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userValue,
        password: pinValue,
      }),
    });
    const res = await response.json();
    if (res) {
      if (res.role == "user") {
        stopLoader();
        const userToken = {
          name: res.name,
          email: res.email,
          role: res.role,
          token: res.token,
        };
        localStorage.setItem("userToken", JSON.stringify(userToken));
        const successMsg = "Now You can add comment and likes";
        popup(successMsg);
      } else {
        stopLoader();

        const userData = {
          name: res.name,
          email: res.email,
          role: res.role,
          token: res.token,
        };
        localStorage.setItem("token", JSON.stringify(userData));
        location.href = "dashboard/admin.html";
      }
    }
  } catch (error) {
    stopLoader();
    setError("Wrong input email or password");
  }
}

/*
-------------------------------
    profile update api
-------------------------------
*/

const userUpdateForm = document.querySelector(".updateUserForm");

if (userUpdateForm) {
  userUpdateForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${mainUrl}/user/update`, {
        method: "PATCH",
        headers: header,
        body: JSON.stringify({
          name: profName.value,
          email: profEmail.value,
        }),
      });
      const res = await response.json();
      if (res.status === 200) {
        const successMsg = res.message;
        popup(successMsg);
      } else {
        // check below code
        setError(res);
      }
    } catch (error) {
      console.log(error);
    }
  });
}

/*
-------------------------------
    Request admin role api
-------------------------------
*/

if (requestAdminRole) {
  requestAdminRole.addEventListener("change", async () => {
    if (requestAdminRole.checked) {
      try {
        const response = await fetch(`${mainUrl}/user/request/admin`, {
          method: "PATCH",
          headers: header,
        });
        const res = await response.json();
        if (res.status === 200) {
          requestAdminRole.checked = true;
          const successMsg = res.message;
          popup(successMsg);
        } else {
          // check below code
          setError(res);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await fetch(`${mainUrl}/user/request/reject`, {
          method: "PATCH",
          headers: header,
        });
        const res = await response.json();
        if (res.status === 200) {
          requestAdminRole.checked = true;
          const successMsg = res.message;
          popup(successMsg);
        } else {
          // check below code
          setError(res);
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
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

/*
-------------------------------
    POST Comment api
-------------------------------
*/

const commForm = document.getElementById("comment-form");

let CommName = document.querySelector(".commName");
let CommEmail = document.querySelector(".commEmail");
let CommMsg = document.querySelector(".commMsg");
if (commForm) {
  commForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    function setCommError(messages) {
      const errorDis = document.querySelector("#commErr");
      errorDis.innerHTML = messages;
      errorDis.style.color = "red";
    }
    if (userToken === null) {
      const coreMsg = "login before commenting";
      popup(coreMsg);
    }
    const textValue = CommMsg.value.trim();
    try {
      let blogId = location.href.split("=")[1];
      const response = await fetch(`${mainUrl}/blogs/${blogId}/comment`, {
        method: "POST",
        headers: header,
        body: JSON.stringify({
          comment: textValue,
        }),
      });
      const res = await response.json();
      if (res.comment == textValue) {
        const successMsg = "Complite to commenting";
        popup(successMsg);
      } else {
        setCommError(res);
      }
    } catch (error) {
      if (localStorage.getItem("userToken")) {
        localStorage.removeItem("userToken");
        location.reload();
      }
    }
  });
}

/*
-------------------------------
   fetch Comment api
-------------------------------
*/
async function commentDisplay() {
  const cont = document.querySelector(".comment-container");
  if (cont) {
    let blogId = location.href.split("=")[1];
    const response = await fetch(`${mainUrl}/blogs/${blogId}`);
    const currentBlog = await response.json();
    if (currentBlog) {
      const allComments = currentBlog.comments;
      cont.innerHTML = "";
      for (let index = allComments.length - 1; index >= 0; index--) {
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
                                    <h2 class='font-semibold'>By: ${data.name}</h2>
                                </div>
                                <div class="comm-footer">
                                <p>${data.comment} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
      }
    } else {
      cont.innerHTML = "0 blog";
    }
  }
}
commentDisplay();

/*
-------------------------------
    cOUNT comments
-------------------------------
*/

async function countComment() {
  let blog_id = location.href.split("=")[1];
  const response = await fetch(`${mainUrl}/blogs/${blog_id}`);
  const currentBlog = await response.json();

  let commElement = document.querySelectorAll("#commLength");
  //get all element have commLength id adding comment length
  for (let i = 0; i < commElement.length; i++) {
    const elm = commElement[i];
    elm.innerHTML += currentBlog.comments.length;
  }
}
countComment();

/*
-------------------------------
    PUT like API
-------------------------------
*/

const like = document.getElementById("like");
let likeQty = document.getElementById("likeQty");
let like_blog_id = location.href.split("=")[1];
if (like) {
  like.addEventListener("click", async () => {
    if (userToken === null) {
      const coreMsg = "login before liking";
      popup(coreMsg);
    }
    try {
      const response = await fetch(`${mainUrl}/blogs/${like_blog_id}/like`, {
        method: "PUT",
        headers: header,
      });
      const res = await response.json();

      if (res == "liked") {
        like.classList.add("liking");
        countLike();
      } else if (res == "like removed") {
        like.classList.remove("liking");
        countLike();
      }
    } catch (error) {
      if (localStorage.getItem("userToken")) {
        localStorage.removeItem("userToken");
        location.reload();
      }
    }
  });
}

/*
-------------------------------
    Count likes 
-------------------------------
*/

const countLike = async () => {
  let response = await fetch(`${mainUrl}/blogs/${like_blog_id}/likes`);
  let res = await response.json();

  if (blog_id) {
    if (res > 0) {
      likeQty.innerHTML = res;
      like.classList.add("liking");
    }
    likeQty.innerHTML = res;
  }
};
countLike();

/*
-------------------------------
    GET All Blogs API
-------------------------------
*/

async function art_detailDisplay() {
  const cont = document.querySelector(".loc_blog");
  const recent_posts = document.querySelector(".recent_posts");
  const loader = document.querySelector(".loader");
  const blogs = await getBlogs();
  countLike();
  if (blogs) {
    if (blogs.length > 0) {
      const cutStr = (val, size) => {
        let newString = val.split(" ");
        let newArr = newString.slice(0, size);
        let txt = "";
        newArr.forEach((data) => {
          txt += data + " ";
        });
        return txt;
      };
      if (cont) {
        cont.innerHTML = "";
        for (let index = blogs.length - 1; index >= 0; index--) {
          const data = blogs[index];
          cont.innerHTML += `
          <div class="art-item">
                <div class="row">
                    <div class="col-img">
                      <img src="${data.image.url}" alt="" />
                    </div>
                    <div class="col-content">
                      <div class="head">
                        <h1 id="detail" class="font-semibold">
                        ${data.head}
                        </h1>
                        <div class="blog-owner d-flex my-3 font-semibold">
                          <div>By: <span>${
                            data.userPost ? data.userPost.name : "John Doe"
                          }</span></div>
                          <div class="d-flex">
                            <div class="d-flex mx-2">
                              <div class="mr-1">
                                <i class="fa-solid fa-thumbs-up"></i>
                              </div>
                              <div>${data.likes.count}</div>
                            </div>
                            <div class="d-flex">
                              <div class="mr-1">
                                <i class="fa-solid fa-comment"></i>
                              </div>
                              <div>${data.comments.length}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="body">
                        <p>
                        ${cutStr(data.body, 20)}...
                        </p>
                      </div>
                      <div class="art-footer">
                      <a href="blog-2.html?id=${
                        data._id
                      }" id='viewMore'>Read more </a>
                      </div>
                    </div>
                  </div>
              </div>
                       
                        `;
        }
      }
      if (recent_posts) {
        recent_posts.innerHTML = "";
        const recentBlogs = blogs.slice(-2).reverse();

        for (let index = recentBlogs.length - 1; index >= 0; index--) {
          const data = blogs[index];

          recent_posts.innerHTML += `
            <div class="art-item">
                  <div class="row">
                      <div class="col-img">
                        <img src="${data.image.url}" alt="" />
                      </div>
                      <div class="col-content">
                        <div class="head">
                          <h1 id="detail" class="font-semibold">
                          ${data.head}
                          </h1>
                          <div class="blog-owner d-flex my-3 font-semibold">
                            <div>By: <span>${
                              data.userPost ? data.userPost.name : "John Doe"
                            }</span></div>
                            <div class="d-flex">
                              <div class="d-flex mx-2">
                                <div class="mr-1">
                                  <i class="fa-solid fa-thumbs-up"></i>
                                </div>
                                <div>${data.likes.count}</div>
                              </div>
                              <div class="d-flex">
                                <div class="mr-1">
                                  <i class="fa-solid fa-comment"></i>
                                </div>
                                <div>${data.comments.length}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="body">
                          <p>
                          ${cutStr(data.body, 20)}...
                          </p>
                        </div>
                        <div class="art-footer">
                        <a href="blog-2.html?id=${
                          data._id
                        }" id='viewMore'>Read more </a>
                        </div>
                      </div>
                    </div>
                </div>
                         
                          `;
        }
      }
    } else {
      cont.innerHTML = "0 blog";
    }
  }
}
art_detailDisplay();

// display blog by id

let blog_id = location.href.split("=")[1];
console.log("id: ", blog_id);

//display blogs description based on id in file(blog-2)
async function blogDisplay() {
  const cont = document.querySelector("#blog_display");
  // cont.innerHTML  = "one";
  const blogs = await getBlogs();
  if (cont) {
    if (blogs.length > 0) {
      // let location = JSON.parse(localStorage.getItem("articleData"))[blog_id];
      let response2 = await fetch(`${mainUrl}/blogs/${blog_id}`);
      let blog = await response2.json();
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
    } else {
      cont.innerHTML = "0 blog";
    }
  }
}
blogDisplay();

// display recent blogs

async function recentBlogs() {
  const cont = document.querySelector("#recentBlog");

  const blogs = await getBlogs();
  if (blogs.length > 0) {
    const cutStr = (val, size) => {
      let newString = val.split(" ");
      let newArr = newString.slice(0, size);
      let txt = "";
      newArr.forEach((data) => {
        txt += data + " ";
      });
      return txt;
    };
    if (cont) {
      cont.innerHTML = "";
      const newArr = blogs.slice(-3).reverse();
      for (let index = 0; index < newArr.length; index++) {
        const data = newArr[index];
        cont.innerHTML += `
                    <div class="blog_col pb-4">
                        <a href= "blog-2.html?id=${data._id}">
                            <div class="blogImg">
                                <img src="${data.image.url}" alt="">
                            </div>
                            <div class="blogHead text-xl font-semibold">
                                
                                    <h3>${data.head}</h3>
                                
                            </div>
                        </a>
                    </div>
                    `;
      }
    }
  } else {
    cont.innerHTML = "0 blog";
  }
}
recentBlogs();

/*
-------------------------------
    POST Signup API
-------------------------------
*/

//contact form validation
let userSignName = document.getElementById("name");
let userSignEmail = document.getElementById("signupEmail");
let userSignpin = document.getElementById("pin");
let userForm = document.getElementById("user_signup_form");

if (userForm) {
  userForm.addEventListener("submit", function (e) {
    e.preventDefault();
    userSignValidation();
  });
}

function setError(messages) {
  const errorDis = document.querySelector(".error");
  errorDis.innerText = messages;
  errorDis.style.color = "red";
}

async function userSignValidation() {
  const nameValue = userSignName.value.trim();
  const emailValue = userSignEmail.value.trim();
  const pinValue = userSignpin.value.trim();
  startLoader();
  try {
    const response = await fetch(`${mainUrl}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameValue,
        email: emailValue,
        password: pinValue,
      }),
    });
    const res = await response.json();

    if (res.status == 200) {
      stopLoader;
      window.location.href = "login.html";
    } else {
      stopLoader;
      setError(res);
    }
  } catch (error) {
    stopLoader();
    console.log(error);
  }
}
