import React from "react";
import { Link } from "react-router-dom";
import "../Footer/footer.css";

export default function Footer() {
  return (
    <div>
      <footer className="site-footer m-0">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <h6>About</h6>
              <p className="text-justify">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Corporis sequi ipsam natus recusandae explicabo beatae autem,
                nihil expedita? At, asperiores beatae! Voluptates possimus culpa
                velit ullam laborum sit quaerat rem?
              </p>
            </div>

            <div className="col-xs-6 col-md-3">
              <h6>Categories</h6>
              <ul className="footer-links">
                <li>
                  <Link href="http://scanfcode.com/category/c-language/">
                    Clothes
                  </Link>
                </li>
                <li>
                  <Link href="http://scanfcode.com/category/front-end-development/">
                    Elctronics
                  </Link>
                </li>
                <li>
                  <Link href="http://scanfcode.com/category/back-end-development/">
                    Accessories
                  </Link>
                </li>
                <li>
                  <Link href="http://scanfcode.com/category/java-programming-language/">
                    Games
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-xs-6 col-md-3">
              <h6>Quick Links</h6>
              <ul className="footer-links">
                <li>
                  <Link href="http://scanfcode.com/about/">About Us</Link>
                </li>
                <li>
                  <Link href="http://scanfcode.com/contact/">Contact Us</Link>
                </li>
                <li>
                  <Link href="http://scanfcode.com/contribute-at-scanfcode/">
                    Contribute
                  </Link>
                </li>
                <li>
                  <Link href="http://scanfcode.com/privacy-policy/">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="http://scanfcode.com/sitemap/">Sitemap</Link>
                </li>
              </ul>
            </div>
          </div>
          <hr />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12">
              <p className="copyright-text">
                Copyright &copy; 2023 All Rights Reserved by
                <Link href="#" className="Signature"> Ahmed Salem</Link>.
              </p>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12">
              <ul className="social-icons">
                <li>
                  <Link className="facebook" href="#">
                    <i className="fa fa-facebook"></i>
                  </Link>
                </li>
                <li>
                  <Link className="twitter" href="#">
                    <i className="fa fa-twitter"></i>
                  </Link>
                </li>
                <li>
                  <Link className="dribbble" href="#">
                    <i className="fa fa-dribbble"></i>
                  </Link>
                </li>
                <li>
                  <Link className="linkedin" href="#">
                    <i className="fa fa-linkedin"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
