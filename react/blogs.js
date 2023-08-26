const mainUrl = "http://localhost:2000";

/*
-------------------------------
  Blogs API
-------------------------------
*/

const getBlogs = async () => {
  const response = await fetch(`${mainUrl}/blogs`);
  const blogs = await response.json();
  return blogs;
};
function UserAccount() {
  const accountBox = document.getElementById("accountBlock");
  function viewAccount() {
    const accountBox = document.getElementById("accountBlock");
    accountBox.classList.toggle("show");
  }


  return (
    <div className="userAccount">
      <div className="userImg" id="userImg" onClick={viewAccount}>
        <img src="imgs/user.png" alt="user" />
      </div>
      <div className="accountBlock" id="accountBlock">
        <ul>
          <li>
            <a href="userSignup.html">Signup</a>
          </li>
          <li>
            <a href="login.html">Login</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function Menu() {
  var menu = document.getElementById("menu");
  function HideAndShow() {
    let nav = document.getElementById("navbar");
    let icon = document.getElementById("icon-2");

    if (nav.className === "links") {
      nav.className += " resp";
      icon.className = "las la-window-close";
    } else {
      nav.className = "links";
      icon.className = "las la-bars";
    }
  }
  return (
    <div className="menu" id="menu" onClick={HideAndShow}>
      <i className="las la-bars" id="icon-2"></i>
    </div>
  );
}

//navigation
function Navbar() {
  return (
    <div className="cont">
      <div className="log">
        <div className="log-img">
          <img src="imgs/logo.png" alt="log" />
        </div>
        <div className="log-name">Pweb</div>
      </div>
      <div className="links" id="navbar">
        <ul>
          <li>
            <a href="index.html">HOME</a>
          </li>
          <li>
            <a href="about.html">ABOUT</a>
          </li>
          <li>
            <a href="skill.html">SKILLS</a>
          </li>
          <li>
            <a href="port.html">PORTFOLIO</a>
          </li>
          <li>
            <a href="blogs.html">BLOGS</a>
          </li>
          <li>
            <a href="contact.html">CONTACT</a>
          </li>
          <li>
            <UserAccount />
          </li>
        </ul>
      </div>
      <Menu />
    </div>
  );
}

const rootNav = ReactDOM.createRoot(document.querySelector(".navbar"));
rootNav.render(<Navbar />);

//main top header
class MainHead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainHeadText: "Blogs",
    };
  }
  render() {
    return (
      <div className="container">
        <h1>{this.state.mainHeadText}</h1>
      </div>
    );
  }
}

const HeadMainRoot = ReactDOM.createRoot(document.querySelector(".main"));
HeadMainRoot.render(<MainHead />);

//All blogs

const loader = document.querySelector(".loader");
class Blogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  async componentDidMount() {
    try {
    //   const response = await fetch(
    //     "https://terah-portifolio-bn.onrender.com/blogs"
    //   );
	const blogs = await getBlogs();
	// const blogs = await response.json();
      if (blogs) {
        loader.style.display = "none";
        this.setState({
          data: blogs,
        });
      }
    } catch (error) {
      console.log("this: " + error);
      this.setState({
        data: "No blog found",
      });
    }
  }

  //function to cut string
  cutStr = (val, size) => {
    let newString = val.split(" ");
    let newArr = newString.slice(0, size);
    let txt = "";
    newArr.forEach((data) => {
      txt += data + " ";
    });
    return txt;
  };
  render() {
    return (
      <div>
        {this.state.data.map((data) => {
          return (
            <div className="art-item" key={data._id}>
              <div className="row border border-danger">
                <div className="col-img">
                  <img src={data.image.url} alt="" />
                </div>
                <div className="col-content">
                  <div className="head">
                    <h1 id="detail">{data.head}</h1>
                  </div>
                  <div className="body">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: this.cutStr(data.body, 13) + "...",
                      }}
                    />
                  </div>
                  <div className="art-footer">
                    <a href={`blog-2.html?id=${data._id}`} id="viewMore">
                      view more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const root2 = ReactDOM.createRoot(document.querySelector(".loc_blog"));
root2.render(<Blogs />);

//footer

class Footer extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-1">
            <div className="log">
              <div className="log-img">
                <img src="imgs/logo.png" alt="log" />
              </div>
              <div className="log-name">Pweb</div>
            </div>
          </div>
          <div className="col-2">
            <h1>LINKS</h1>
            <div className="row-2">
              <div className="col-1">
                <ul>
                  <li>
                    <a href="index.html">Home</a>
                  </li>
                  <li>
                    <a href="about.html">About</a>
                  </li>
                  <li>
                    <a href="skill.html">Skills</a>
                  </li>
                  <li>
                    <a href="port.html">Portifolio</a>
                  </li>
                </ul>
              </div>
              <div className="col-2">
                <ul>
                  <li>
                    <a href="blogs.html">Blogs</a>
                  </li>
                  <li>
                    <a href="contact.html">Contact</a>
                  </li>
                  <li>
                    <a href="login.html">Login</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-3">
            <h1>contact</h1>
            <ul>
              <li>
                <a href="blogs.html">Email</a>
              </li>
              <li>
                <a href="contact.html">LinkedIn</a>
              </li>
              <li>
                <a href="login.html">Instagram</a>
              </li>
              <li>
                <a href="login.html">facebook</a>
              </li>
            </ul>
          </div>
          <div className="col-4">
            <h1>Follow Us</h1>
            <ul>
              <li>
                <a
                  href="https://www.linkedin.com/in/uwawe-terah-90005724a/"
                  target="_blank"
                >
                  <img src="imgs/linked.png" alt="" />
                </a>
              </li>
              <li>
                <a href="https://github.com/UwaweTera" target="_blank">
                  <img src="imgs/github.png" alt="" />
                </a>
              </li>
            </ul>
          </div>
          <div className="col-5">
            <div className="box">
              <h1>join our website</h1>
              <p>there is no cost to join our website</p>
              <form action="" id="sub_form">
                <div className="input-control">
                  <input type="text" placeholder="Enter Email" id="sub-email" />
                  <input type="submit" value="SUBMIT" />
                  <div className="error"></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const FooterRoot = ReactDOM.createRoot(document.querySelector(".footer"));
FooterRoot.render(<Footer />);
