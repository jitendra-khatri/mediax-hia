import Logo from '../assets/logo.png'
import HiaInsta from '../assets/hia-insta.png'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer>
      <div className="container-xxl">
        <div className="row">
          <div className="col-md-4">
            <div className="text-sm-center">
              <div className="foot-brand mx-sm-auto"><img src={Logo} alt="" className="w-100" /></div>
              {/* <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p> */}
              <div className="hia-insta"><a href="#" target='_blank'><img src={HiaInsta} alt="" className="w-100" /></a></div>
            </div>
          </div>
          <div className="mt-4 mt-sm-5 col-md-4 col-sm-6 d-sm-flex justify-content-center">
            <div className="foot-link">
              <h4>Important Links</h4>
              <ul>
                <li><Link to='/privacy-policy'><i class="far fa-angle-right"></i> Privacy policy</Link></li>
                <li><Link to='/refund-policy'><i class="far fa-angle-right"></i> Refund and cancellation policy</Link></li>
                <li><Link to='/terms-n-conditions'><i class="far fa-angle-right"></i> Terms & conditions</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-4 mt-sm-5 col-md-4 col-sm-6 d-sm-flex justify-content-center">
            <div className="foot-link">
              <h4>Connect</h4>
              <ul>
                <li>
                  <a className='d-flex gap-2' href='tel:+91 9760273375'>
                  <div className="">
                    <i class="fas fa-phone-alt"></i>
                  </div>
                  <div className="">+91 9760273375</div>
                </a>
                </li>
                <li>
                  <a className='d-flex gap-2' href=''>
                  <div className="">
                    <i class="fas fa-globe"></i>
                  </div>
                  <div className="">www.mediax.co.in</div>
                </a>
                </li>
                <li><a className='d-flex gap-2' href=''>
                  <div className="">
                    <i class="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="">
                    First Floor, 4 & 5, Block No: S-17,
                    Sanjay Place, Agra, Uttar Pradesh:- 282002
                  </div>
                </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
