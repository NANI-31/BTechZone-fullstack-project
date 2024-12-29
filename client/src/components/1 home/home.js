import { useEffect, useRef } from "react";
import { Link } from 'react-router-dom'

import bg from '../required/images/bookbg.jpg';
import logo from '../required/images/aa.png';
import e from '../required/images/e.png'
import propic1 from '../required/images/pic2.jpg'
import propic2 from '../required/images/pic2.jpg'
import propic3 from '../required/images/pic3.jpg'
import propic4 from '../required/images/pic4.jpg'
import propic5 from '../required/images/pic5.jpg'
import propic6 from '../required/images/pic6.jpg'

import './home.css'
const Home = () => {
  const cardRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleItemClick = (event) => {
    const proListSingle = event.currentTarget;
    const BgImg = proListSingle.style.backgroundImage;
    const dataTitle = proListSingle.getAttribute('data-title');
    const dataDescription = proListSingle.getAttribute('data-description');

    const proList = document.querySelectorAll('.pro_list li');

    proList.forEach((item) => {
      item.classList.remove('selected');
    });

    proListSingle.classList.add('selected');
    cardRef.current.classList.add('card_animated');

    setTimeout(() => {
      cardRef.current.querySelector('.pro_pic').style.backgroundImage = BgImg;
      cardRef.current.querySelector('.pro_title').innerHTML = dataTitle;
      cardRef.current.querySelector('.pro_description').innerHTML = dataDescription;
    }, 700);

    setTimeout(() => {
      cardRef.current.classList.remove('card_animated');
    }, 1500);
  };


  useEffect(() => {
    // Smooth scrolling on anchor links
    const links = document.querySelectorAll("h1");
    links.forEach((link) => {
      link.addEventListener("click", smoothScroll);
    });
  }, []);

  const smoothScroll = (e) => {
    e.preventDefault();
    const targetId = e.target.getAttribute("id");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
  };
  const handleMouseMove = (e) => {
    const box = e.target;
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const boxWidth = box.clientWidth;
    const boxHeight = box.clientHeight;
    const moveX = (x - boxWidth / 2);
    const moveY = (y - boxHeight / 2);
    box.style.transform = `translate(${moveX}px, ${moveY}px)`;
    box.style.transition = "transform 0.2s"; // Fixed the typo in 'transition'
  };

  const handleMouseOut = (e) => {
    const box = e.target;
    box.style.transform = '';
  };



  return (
    // <LocomotiveScrollProvider options={options} containerRef={ref}>
    <main >
      <section
        className="home-intro">
        <img src={bg} alt="bg" className="home-img"></img>
        <h1 className="home-h1" id="h1Section1" > Knowledge Store</h1>
        <div className="home-menu-bar">
          <nav>
            <ul>
              <li className="home-box" onMouseMove={handleMouseMove} onMouseOut={handleMouseOut} onClick={() => scrollToSection(section1Ref)}>Sign Up</li>
              <li className="home-box" onMouseMove={handleMouseMove} onMouseOut={handleMouseOut} onClick={() => scrollToSection(section1Ref)}>Login</li>
              <li className="home-box" onMouseMove={handleMouseMove} onMouseOut={handleMouseOut} onClick={() => scrollToSection(section2Ref)}>About Us</li>
              <li className="home-box" onMouseMove={handleMouseMove} onMouseOut={handleMouseOut} onClick={() => scrollToSection(section3Ref)}>Contact</li>
            </ul>
          </nav>
        </div>
        <div className="home-logo-middle">
          <div className="home-logo" id="img">
            <img src={logo} alt="logo" />
          </div>
        </div>

      </section>


      <section className="home-hero-section" >

        <div className="home-hero-section-heading">
          <div className="hs-heading">
            <p>
              Simplify Your Semester with
            </p>
            <p>our</p>
            <p>Intuitive Book Management System</p>
          </div>

          <div className="hero-desc">
            <div className="hero-desc1">
              <p>"Never scramble for lost notes again! [App Name] helps you organize, store, and access all your semester PDFs in a single, convenient location."</p>
              <div className="home-icon">
                <i className="fa-solid fa-book"></i>
              </div>
            </div>
            <div className="hero-desc2">
              <div className="icon2">
                <i className="fa-solid fa-book"></i>

              </div>
              <p>"Simplify your studies with [App Name]. Keep your semester materials organized, accessible, and searchable, all from one user-friendly platform."</p>
            </div>

          </div>
        </div>

      </section>


      <section className="home-contents feature-section" >
        <div className="home-app-head" >
          <p className="home-app-head-h1">features</p>
        </div>
        <div className="home-matter">
          <div className="home-box2 matter1">
            <h1>Effortless PDF Viewing:</h1>
            <p>"Access your semester PDFs with a user-friendly viewer." </p>
          </div>
          <div className="home-imgb">
            <img src={e} alt="e"></img>
          </div>
        </div>
        <div className="home-matter">

          <div className="home-imgb m-c">
            <img src={e} alt="e"></img>
          </div>
          <div className="home-box2 matter2 home-m-c">
            <h1>Seamless Semester Organization</h1>
            <p>"Categorize and manage your materials by semester for easy retrieval." </p>
          </div>
        </div>
        <div className="home-matter">
          <div className="home-box2 matter3">
            <h1>Secure PDF Storage</h1>
            <p>Store and retrieve your PDFs securely in our cloud-based system </p>
          </div>
          <div className="home-imgb">
            <img src={e} alt="e"></img>
          </div>
        </div>
        <div className="home-matter">


          <div className="home-imgb">
            <img src={e} alt="e"></img>
          </div>
          <div className="home-box2 matter4">
            <h1>Search Functionality</h1>
            <p>"Find the PDFs you need quickly with our powerful search feature."</p>
          </div>
        </div>

        {/* <p> With a friendly 
              interface, secure login, and other features.we aim to make learning smoother and more 
              engaging.</p>
              <p> The app strives to create a helpful
               online store books, ensuring students have a reliable resource hub throughout their academic journey.</p> */}

      </section>

      <section ref={section1Ref} className="home-action-section">
        <div className="home-lsbox">
          <div className="home-signupbox">
            <div className="home-s-box">
              <div className="home-square">
                <div className="home-content">
                  <span className="home-span1"></span>
                  <span className="home-span2"></span>
                  <span className="home-span3"></span>
                  <h2>
                    <Link to='/select-signup' className="home-link-signup">Sign Up</Link>
                  </h2>
                </div>
              </div>
            </div>
            <div className="home-signupmatter">
              <h1>"Get Started - Sign Up Now!"</h1>
              <p>"Unlock the power of seamless semester organization! Join our community of proactive students who have revolutionized their academic journey. Sign up today and experience the future of efficient book management."</p>
            </div>
          </div>
          <div className="home-loginbox">
            <div className="home-loginmatter">
              <h1>"Already have an account? Log in here"</h1>
              <p>"Welcome back! Access your organized world of study materials. Log in now to continue your academic journey with our intuitive book management system. Your success story awaits!"</p>
            </div>
            <div className="home-l-box">
              <div className="home-square">
                <div className="home-content">
                  <span className="home-span1"></span>
                  <span className="home-span2"></span>
                  <span className="home-span3"></span>
                  <h2>
                    <Link to='/login' className="home-link-login">Login</Link>
                  </h2>
                </div>
              </div>
            </div>
          </div>

        </div>

      </section>

      <section ref={section2Ref} className="home-about">
        <div className="home-about-head">
          <h1>About Us</h1>
          <p>
            At [Your Application Name], we understand the challenges that students face in managing their semester
            materials effectively. Founded with a passion for enhancing the educational experience,
            our platform is designed to simplify the way you organize, access, and succeed in your academic journey.
          </p>
          <p>
            <hr></hr>
            </p>
        </div>
        <div className="home-about-row">
          <div className="about-col1 home-col ">
            <h1>Mission</h1>
            <p>At [Your Application Name], our mission is to empower students on their educational journey. We're committed to providing a user-friendly platform that simplifies the management of study materials. Our focus is on enhancing the learning experience by offering innovative tools that promote organization, accessibility, and success.</p>
          </div>
          <div className="about-col2 home-col">
            <h1>Vision</h1>
            <p>Our vision is to be the go-to platform for students seeking a transformative approach to academic organization. We envision a community where every student feels empowered, supported, and confident in their ability to excel. Through continuous innovation, we aim to redefine the way students engage with their study materials, fostering a culture of achievement and collaboration.</p>
          </div>
        </div>
        <div className="cards-wrapper">
          <div className="cards-container">
            <ul className="pro_list">
              <li
                className={`selected`}
                style={{ backgroundImage: `url(${propic1})` }}
                data-title="Sai Siddesh"
                data-description="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
                onClick={handleItemClick}
              ></li>
              <li
                className={`selected`}
                style={{ backgroundImage: `url(${propic2})` }}
                data-title="Sai Siddesh"
                data-description="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
                onClick={handleItemClick}
              ></li>
              <li
                className={`selected`}
                style={{ backgroundImage: `url(${propic3})` }}
                data-title="Sai Siddesh"
                data-description="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
                onClick={handleItemClick}
              ></li>
              <li
                className={`selected`}
                style={{ backgroundImage: `url(${propic4})` }}
                data-title="Sai Siddesh"
                data-description="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
                onClick={handleItemClick}
              ></li>
            </ul>

            <div className="section">
              <article ref={cardRef} className="card">
                <div className="card_inner">
                  <div className="card-header">
                    <div className="pro_pic" style={{ backgroundImage: `url(${propic1})` }}></div>
                    <h1 className="pro_title">Siddesh</h1>
                  </div>
                  <div className="pro_description">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>

      </section>

      <section ref={section3Ref} className="home-footer" >
        <div className="home-footer-row1">
          <div className="home-footer-col">
            <h1>Contact Us</h1>
          </div>
          <div className="home-footer-col1">
            <form action="">
              <div className="home-input-box">
                <input type="text" id="name" autoComplete="off" /> <span>Your Name</span>
              </div>
              <div className="home-input-box">
                <input type="email" id="email" autoComplete="off" /> <span>E-mail</span>
              </div>
              <div className="home-input-box">
                <input type="text" id="mobile" autoComplete="off" /> <span>Mobile</span>
              </div>
              <div className="home-input-box">
                <textarea placeholder="Type Your Message Here..."></textarea>
              </div>


              <div className="home-send">
                <button id="submit">submit
                </button>
                <i className="fa-sharp fa-solid fa-paper-plane"></i>
              </div>

            </form>
          </div>
        </div>
        <div className="home-contact-info">
          <div className="home-contact-name">
            <i className="fa-solid fa-location-dot"></i>
            <p>address addEventListener addEventListener<br></br>sdvsdv</p>
          </div>
          <div className="home-ph-em">
            <div className="contact-name1">
              <i className="fa-solid fa-phone"></i>
              <p>+91 9701330350</p>
            </div>
            <div className="home-contact-name1">
              <i className="fa-solid fa-envelope"></i>
              <p>chowdarynani079@gmail.com</p>
            </div>
          </div>

        </div>
        <div className="footer-row2">
          <div className="footer-col2">
            <div className="home-social-icons">
              <h1>Follow Us On</h1>
            </div>
            <div className="home-social-icons-list">
              <div className="home-social-icons-list1">
                <div className="home-social-icons-list1-container">
                  <Link to="https://www.facebook.com/profile.php?id=100071509115777">
                    <span><i className="fab fa-facebook-f"></i></span>
                  </Link>
                  <Link to="https://twitter.com/NA_NI_31">
                    <span><i className="fab fa-twitter"></i></span>
                  </Link>

                  <Link to="https://www.instagram.com/_na__ni_31">
                    <span><i className="fab fa-instagram"></i></span>
                  </Link>
                </div>
              </div>
              <div className="home-social-icons-list2">
                <div className="home-social-icons-list2-container">
                  <Link to="https://www.linkedin.com/in/siva-nageswarrao-129254253/">
                    <span><i className="fab fa-linkedin-in"></i></span>
                  </Link>

                  <Link to="https://github.com/NANIFLY31">
                    <span><i className="fab fa-github"></i></span>
                  </Link>
                  <Link to="https://in.pinterest.com/chowdarynani079/">
                    <span><i className="fab fa-pinterest"></i></span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    // </LocomotiveScrollProvider>


  );
};

export default Home;