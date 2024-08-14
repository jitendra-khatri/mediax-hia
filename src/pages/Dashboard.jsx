import hiaLogo from '../assets/logo.png'
import adminImg from '../assets/admin.png'

function Dashboard() {
  return (
    <>
     <section className="admin">
        <div className="row">
            <div className="col-2 p-0">
            <div className="admin-sidebar">
                <div className="admin-left-box">
                    <div className="admin-logo"><img src={hiaLogo} alt="" /></div>
                    <div className="ad-tab-box mt-3 p-3">
                        <div className="ad-tab-btn active"><i class="fal me-3 fa-tachometer-alt-fast"></i><span>Dashboard</span></div>
                        <div className="ad-tab-btn"><i class="fal me-3 fa-power-off"></i><span>Logout</span></div>
                    </div>
                </div>
            </div>
            </div>
            <div className="col-10 p-0">
                <div className="admin-main">
                <header className='d-flex justify-content-between align-items-center'>
                    <div className="nav-btn"><i class="fas fa-bars"></i></div>
                    <div className="nav-main d-flex align-items-center gap-5">
                        <div className="nav-search">
                            <form>
                            <i class="fal fa-search"></i>
                                <input type="text" placeholder='Search' className='form-control inp-search'/>
                            </form>
                        </div>
                        <div className="nav-profile d-flex align-items-center gap-3">
                            <div className="napr-img"><img src={adminImg} alt="" /></div>
                            <div className="napr-name">
                                <div className="name">Moni Roy</div><div className="admin">Admin</div>
                            </div>
                        </div>
                    </div>
                </header>
                <section className="post-listing">
                    <h1>Post list</h1>
                </section>
                </div>
            </div>
        </div>
     </section>
    </>
  )
}

export default Dashboard
