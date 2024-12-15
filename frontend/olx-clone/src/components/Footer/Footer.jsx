import { Instagram,Facebook,Twitter,SquarePlay } from 'lucide-react';

import './Footer.css';

function Footer() {
  return (
    <div className="footermain">
    <div className="footercontent">
      <div className="footerflex">
        <div>POPULAR LOCATIONS</div>
        <ul>
          <li>
            <a href="">Kolkata</a>
          </li>
          <li>
            <a href="">Mumbai</a>
          </li>
          <li>
            <a href="">Chennai</a>
          </li>
          <li>
            <a href="">Pune</a>
          </li>
        </ul>
      </div>
      <div className="footerflex">
        <div>TRENDING LOCATIONS</div>
        <ul>
          <li>
            <a href="">Bhubaneshwar</a>
          </li>
          <li>
            <a href="">Hyderabad</a>
          </li>
          <li>
            <a href="">Chandigarh</a>
          </li>
          <li>
            <a href="">Nashik</a>
          </li>
        </ul>
      </div>
      <div className="footerflex">
        <div>ABOUT US</div>
        <ul>
          <li>
            <a href="">About OLX Group</a>
          </li>
          <li>
            <a href="">Careers</a>
          </li>
          <li>
            <a href="">Contact Us</a>
          </li>
          <li>
            <a href="">OLXPeople</a>
          </li>
          <li>
            <a href="">Waah Jobs</a>
          </li>
        </ul>
      </div>
      <div className="footerflex">
        <div>OLX</div>
        <ul>
          <li>
            <a href="">Help</a>
          </li>
          <li>
            <a href="">Sitemap</a>
          </li>
          <li>
            <a href="">Legal & Privacy Information</a>
          </li>
          <li>
            <a href="">Blog</a>
          </li>
          <li>
            <a href="">OLX Autos Sell Car</a>
          </li>
        </ul>
      </div>
      <div className="footerflex">
        <div>FOLLOW US</div>
        <div className="footericons">
          <div>
          <Facebook />
          </div>
          <div>
          <Instagram />
          </div>
          <div>
          <Twitter />
          </div>
          <div>
          <SquarePlay />
          </div>
        
        </div>
        <div>
          <img
            src="https://statics.olx.in/external/base/img/playstore.png"
            alt="Playstore"
          />
          <img
            src="https://statics.olx.in/external/base/img/appstore.png"
            alt="Appstore"
          />
        </div>
      </div>
    </div>
    <div className="copyright">
      <div className="copyrightflex">
        <div>
          <span>Other Countries</span> Pakistan - South Africa - Indonesia
        </div>
        <div>All rights reserved &copy; 2006-2022 OLX</div>
      </div>
    </div>
  </div>
  );
}

export default Footer;
