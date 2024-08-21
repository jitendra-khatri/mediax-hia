import hiaLogo from '../assets/logo.png'
import adminImg from '../assets/admin.png'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '../firebase.config'
function Dashboard() {

    const [allListingData, setAllListingData] = useState()
    const [navToggle, setNavToggle] = useState(false)
    const [monthSort, setMonthSort] = useState()
    const [fromDate, setFromDate] = useState()
    const [toDate, setToDate] = useState()
    const [dateOfDeath, setDateOfDeath] = useState()
    const [status, setStatus] = useState()
    const auth = getAuth()

    useEffect(() => {
        const fetchListings = async () => {
            const collRef = collection(db, 'listings');
            const q = query(collRef, where('listingCreated', '==', true))
            const collSnap = await getDocs(q); // use getDocs to fetch a collection
            const listings = [];
            collSnap.forEach((doc) => {
                listings.push({ id: doc.id, ...doc.data() }); // Collect each document's data
            });

            setAllListingData(listings); // Update state with the fetched data
            console.log(allListingData)
        };

        fetchListings();
    }, []); // Add empty dependency array to run effect only once

    const formatDate = (timestamp) => {
        const date = timestamp.toDate(); // Convert Firestore timestamp to JavaScript Date
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short', // This gives abbreviated month (e.g., "Aug")
            year: 'numeric',
        });
        return formattedDate.replace(/\./g, ''); // To remove dots after month abbreviation
    };

    // Usage
    /*  const formattedDate = formatDate(listingData.dateOfPosting);
     console.log(formattedDate); // e.g., "21-Aug-2024" */

    return (
        <>
            <section className="admin">
                <div className="row">
                    <div className="col-xl-2 p-0">
                        <div className={`admin-sidebar ${navToggle ? 'active' : 'notactive'}`}>
                            <div className="admin-left-box">
                                <div className="close" onClick={() => setNavToggle((pre) => !pre)}><i class="fas fa-times"></i></div>
                                <div className="admin-logo"><img src={hiaLogo} alt="" /></div>
                                <div className="ad-tab-box mt-3 p-3">
                                    <div className="ad-tab-btn active"><i class="fal me-3 fa-tachometer-alt-fast"></i><span>Dashboard</span></div>
                                    <div className="ad-tab-btn"><i class="fal me-3 fa-power-off"></i><span>Logout</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-10 p-0">
                        <div className="admin-main">
                            <header className='d-flex justify-content-between align-items-center gap-4'>
                                <div className="nav-btn" onClick={() => setNavToggle((pre) => !pre)}><i class="fas fa-bars"></i></div>
                                <div className="nav-main d-flex align-items-center gap-4 gap-lg-5">
                                    <div className="nav-search">
                                        <form>
                                            <i class="fal fa-search"></i>
                                            <input type="text" placeholder='Search' className='form-control inp-search' />
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
                                <div className="sorting-feature">
                                    <div className="sort-by-date d-flex flex-wrap align-items-center gap-3 ps-3">
                                        <div className="sor-heading ">Sort By</div>
                                        <div className="sor-icon"><i class="fal fa-calendar-alt"></i></div>
                                        <div className="sor-date">
                                            <DatePicker
                                                selected={dateOfDeath}
                                                onChange={(date) => setDateOfDeath(date)}
                                                dateFormat="MMMM, yyyy"
                                                className='date form-control'
                                                placeholderText='Select Month'
                                                showMonthYearPicker
                                                // showYearDropdown
                                                // showMonthDropdown
                                                // scrollableMonthYearDropdown
                                                maxDate={new Date()}
                                            />
                                            <div class="sor-icon"><i class="far fa-chevron-down"></i></div>
                                        </div>
                                    </div>
                                    <div className="sor-border"></div>
                                    <div className="sort-by-date mid d-flex align-items-center gap-3">
                                        <div className="d-flex align-items-center flex-wrap gap-3">
                                            <div className="sor-heading">From</div>
                                            <div className="sor-date">
                                                <DatePicker
                                                    selected={fromDate}
                                                    onChange={(date) => setFromDate(date)}
                                                    dateFormat="dd MMMM, yyyy"
                                                    className='date form-control'
                                                    placeholderText='Starting Date'
                                                    // showMonthYearPicker
                                                    showYearDropdown
                                                    showMonthDropdown
                                                    scrollableMonthYearDropdown
                                                // maxDate={new Date()}
                                                />
                                                <div class="sor-icon"><i class="far fa-chevron-down"></i></div>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center flex-wrap gap-3">
                                            <div className="sor-heading">To</div>
                                            <div className="sor-date">
                                                <DatePicker
                                                    selected={toDate}
                                                    onChange={(date) => setToDate(date)}
                                                    dateFormat="dd MMMM, yyyy"
                                                    className='date form-control'
                                                    placeholderText='Ending Date'
                                                    // showMonthYearPicker
                                                    showYearDropdown
                                                    showMonthDropdown
                                                    scrollableMonthYearDropdown
                                                // maxDate={new Date()}
                                                />
                                                <div class="sor-icon"><i class="far fa-chevron-down"></i></div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="sor-border"></div>
                                    <form className="sort-by-date d-flex align-items-center gap-3 pe-3">
                                        <div className="d-flex align-items-center flex-wrap gap-3">
                                            <div className="sor-heading">Status</div>
                                            <div className="sor-date">
                                                <select class="form-select" id="status-select" value={status} onChange={(sta) => setStatus(sta.target.value)}>
                                                    <option selected>Status</option>
                                                    <option value="Paid">Paid</option>
                                                    <option value="Unpaid">Unpaid</option>
                                                    <option value="Posted">Posted</option>
                                                    <option value="Not-Posted">Not Posted</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="">
                                            <button type='submit' className='th-btn fill'>Filter</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="user-data-box mt-5">
                                    <div className="user-data-head">
                                        <div className="row">
                                            <div className="col-2">
                                                <div className="usdahe-text">Slot no.</div>
                                            </div>
                                            <div className="col-2">
                                                <div className="usdahe-text">Name</div>
                                            </div>
                                            <div className="col-2">
                                                <div className="usdahe-text">Date to post </div>
                                            </div>
                                            <div className="col-2">
                                                <div className="usdahe-text">Status</div>
                                            </div>
                                            <div className="col-2">
                                                <div className="usdahe-text">Payment</div>
                                            </div>
                                            <div className="col-2">
                                                <div className="usdahe-text">Action</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="user-data-list">
                                        {Array.isArray(allListingData) && allListingData.length > 0 ? (
                                            allListingData.map((data, index) => (
                                                <div className="user-data-list-item" key={index}>
                                                    <div className="row align-items-center">
                                                        <div className="col-2">
                                                            <div className="user-slot">
                                                                {data.slotNumber}
                                                            </div>
                                                        </div>
                                                        <div className="col-2">
                                                            <div className="user-name">
                                                                {data.name}
                                                            </div>
                                                        </div>
                                                        <div className="col-2">
                                                            <div className="user-date">
                                                                {formatDate(data.dateOfPosting)}
                                                            </div>
                                                        </div>
                                                        <div className="col-2">
                                                            <div className={`user-status ${data.postStatus ? 'posted' : 'pending'}`}>
                                                                {data.postStatus ? 'Posted' : 'Pending'}
                                                            </div>
                                                        </div>
                                                        <div className="col-2">
                                                            <div className={`user-payment ${data.payment ? 'paid' : 'un-paid'}`}>
                                                                {data.payment ? 'Paid' : 'Unpaid'}
                                                            </div>
                                                        </div>
                                                        <div className="col-2">
                                                            <div className="user-action d-flex gap-1 gap-xl-3 justify-content-center">
                                                                <div className="download-action">
                                                                    <a href={data.imageUrl} download="image.jpg" target='_blank'>
                                                                        <i className="fal fa-arrow-to-bottom"></i>
                                                                    </a>
                                                                </div>
                                                                <div className="edit-action">
                                                                    <Link to={`/admin/edit/${auth.currentUser.uid}`}>
                                                                        <i className="fal fa-edit"></i>
                                                                    </Link>
                                                                </div>
                                                                <div className="delete-action">
                                                                    <Link to={`/admin/delete/${auth.currentUser.uid}`}>
                                                                        <i className="fal fa-trash-alt"></i>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div>No listings available</div>
                                        )}

                                        {/* {allListingData.map((data, index) => (
                                            <div className="user-data-list-item" key={index}>
                                                <div className="row align-items-center">
                                                    <div className="col-2">
                                                        <div className="user-slot">
                                                            {data.slotNumber}
                                                        </div>
                                                    </div>
                                                    <div className="col-2">
                                                        <div className="user-name">
                                                            {data.name}
                                                        </div>
                                                    </div>
                                                    <div className="col-2">
                                                        <div className="user-date">
                                                            {formatDate(data.dateOfPosting)}
                                                        </div>
                                                    </div>
                                                    <div className="col-2">
                                                        <div className={`user-status ${data.postStatus ? 'posted' : 'pending'}`}>
                                                            {data.postStatus ? 'Posted' : 'Pending'}
                                                        </div>
                                                    </div>
                                                    <div className="col-2">
                                                        <div className={`user-payment ${data.payment ? 'paid' : 'un-paid'}`}>
                                                            {data.payment ? 'Paid' : 'Unpaid'}
                                                        </div>
                                                    </div>
                                                    <div className="col-2">
                                                        <div className="user-action d-flex gap-1 gap-xl-3 justify-content-center">
                                                            <div className="download-action">
                                                                <a href={data.imageUrl} download="image.jpg">
                                                                <i className="fal fa-arrow-to-bottom"></i>
                                                                </a>
                                                            </div>
                                                            <div className="edit-action">
                                                                <Link to={`/admin/edit/${auth.currentUser.uid}`}>
                                                                    <i className="fal fa-edit"></i>
                                                                </Link>
                                                            </div>
                                                            <div className="delete-action">
                                                                <Link to={`/admin/delete/${auth.currentUser.uid}`}>
                                                                    <i className="fal fa-trash-alt"></i>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))} */}
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Dashboard
