import React from 'react';
import '../assets/css/main.css'

class Home extends React.Component {
    render() {
        return (
            <>
            <div id="wrapper">
                <header id="header" className="alt">
                    <a href="." className="logo"><strong>CASPER</strong> <span>home</span></a>
                    <nav>
                        <a href="#menu">Menu</a>
                    </nav>
                </header>

                <nav id="menu">
                    <ul className="links">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="landing.html">Landing</a></li>
                        <li><a href="generic.html">Generic</a></li>
                        <li><a href="elements.html">Elements</a></li>
                    </ul>
                    <ul className="actions stacked">
                        <li><a href="#" className="button primary fit">Get Started</a></li>
                        <li><a href="#" className="button fit">Log In</a></li>
                    </ul>
                </nav>

                <section id="banner" className="major">
                    <div className="inner">
                        <header className="major">
                            <h1>RENEWAL CASPER Prototype</h1>
                        </header>
                        <div className="content">
                            <p>This website is prototype using template.<br />
                            If you can, try it and report on your experience.</p>
                            <ul className="actions">
                                <li><a href="#one" className="button next scrolly">Get Started</a></li>
                            </ul>
                        </div>
                    </div>
                </section>

                <div id="main">
                        <section id="one" className="tiles">
                            <article>
                                <header className="major">
                                    <h3><a href="landing.html" className="link">Notice</a></h3>
                                    <p>Maybe notice form will be placed.</p>
                                </header>
                            </article>
                            <article>
                                <header className="major">
                                    <h3><a href="landing.html" className="link">Ranks</a></h3>
                                    <p>Rescuer, Observer, Activist</p>
                                </header>
                            </article>
                            <article>
                                <header className="major">
                                    <h3><a href="landing.html" className="link">Photos</a></h3>
                                    <p>Casper's photos</p>
                                </header>
                            </article>
                            <article>
                                <header className="major">
                                    <h3><a href="landing.html" className="link">Study & Project</a></h3>
                                    <p>The Article of Study mangement</p>
                                </header>
                            </article>
                            <article>
                                <header className="major">
                                    <h3><a href="landing.html" className="link">Presentation</a></h3>
                                    <p>The Article of Presentation</p>
                                </header>
                            </article>
                            <article>
                                <header className="major">
                                    <h3><a href="landing.html" className="link">CTF</a></h3>
                                    <p>The Article of CTF mangement</p>
                                </header>
                            </article>
                        </section>

                        <section id="two">
                            <div className="inner">
                                <header className="major">
                                    <h2>About Us</h2>
                                </header>
                                <h3>MAY 2000</h3>
                                <strong>Beginnings</strong>
                                <p>2000년 5월 1일 이종근 교수님 아래서 창단된 정보보호 동아리입니다. 보안과 관련된 여러 가지 분야에 대해 학습하며, 학습한 내용에 대한 내부세미나를 실시하여 동아리원이 같이 성장해 나가고 있습니다. 현재는 차정원 교수님의 지도아래 있습니다.</p>
                                <p>...</p>
                                <ul className="actions">
                                    <li><a href="landing.html" className="button next">Get Started</a></li>
                                </ul>
                            </div>
                        </section>

                </div>

                <section id="contact">
                    <div className="inner">
                        <section>
                            <form method="post" action="#">
                                <div className="fields">
                                    <div className="field half">
                                        <label for="name">Name</label>
                                        <input type="text" name="name" id="name" />
                                    </div>
                                    <div className="field half">
                                        <label for="email">Email</label>
                                        <input type="text" name="email" id="email" />
                                    </div>
                                    <div className="field">
                                        <label for="message">Message</label>
                                        <textarea name="message" id="message" rows="6"></textarea>
                                    </div>
                                </div>
                                <ul className="actions">
                                    <li><input type="submit" value="Send Message" className="primary" /></li>
                                    <li><input type="reset" value="Clear" /></li>
                                </ul>
                            </form>
                        </section>
                        <section className="split">
                            <section>
                                <div className="contact-method">
                                    <span className="icon solid alt fa-envelope"></span>
                                    <h3>Email</h3>
                                    <a href="#"></a>
                                </div>
                            </section>
                            <section>
                                <div className="contact-method">
                                    <span className="icon solid alt fa-phone"></span>
                                    <h3>Phone</h3>
                                    <span></span>
                                </div>
                            </section>
                            <section>
                                <div className="contact-method">
                                    <span className="icon solid alt fa-home"></span>
                                    <h3>Address</h3>
                                    <span><br />
                                    <br />
                                    </span>
                                </div>
                            </section>
                        </section>
                    </div>
                </section>

                <footer id="footer">
                    <div className="inner">
                        <ul className="icons">
                            <li><a href="#" className="icon brands alt fa-twitter"><span className="label">Twitter</span></a></li>
                            <li><a href="#" className="icon brands alt fa-facebook-f"><span className="label">Facebook</span></a></li>
                            <li><a href="#" className="icon brands alt fa-instagram"><span className="label">Instagram</span></a></li>
                            <li><a href="#" className="icon brands alt fa-github"><span className="label">GitHub</span></a></li>
                            <li><a href="#" className="icon brands alt fa-linkedin-in"><span className="label">LinkedIn</span></a></li>
                        </ul>
                        <ul className="copyright">
                            <li>&copy; Casper</li><li>Design by <a href="http://github.com/Nevaland">neva</a></li>
                        </ul>
                    </div>
                </footer>
            </div>
        </>
        );
    }
}

export default Home;