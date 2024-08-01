import hero from '../assets/hero.jpg'
import work1 from '../assets/work-1.png'
import work2 from '../assets/work-2.png'
import work3 from '../assets/work-3.png'
import work4 from '../assets/work-4.png'
import workRight from '../assets/work-right.png'
import profile from '../assets/profile.jpg'
import happenImg from '../assets/happen-img.png'
import upImg from '../assets/up-img.png'
import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import { getAuth } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns'
function Home() {
    const [user, setUser] = useState(null)
    const auth = getAuth()
    useEffect(() => {
        setUser(auth.currentUser)
    }, [])

    function griefInput() {
        const griefPerson1 = document.querySelector('.greif-input')
        let griefPerson1Value = griefPerson1.value
        document.querySelector('.boobit-greif').textContent = griefPerson1Value
    }
  /*   function SetPrefix() {
        const prefixSelect = document.querySelector('#prefix-select')
        let prefixSelectValue = prefixSelect.value
        document.querySelector('.boobit-prefix').textContent = prefixSelectValue
    } */
    function SetService() {
        const prefixSelect = document.querySelector('#service-select')
        let prefixSelectValue = prefixSelect.value
        document.querySelector('.boobit-service').textContent = prefixSelectValue
    }
    function SetServiceTimeSelect() {
        const prefixSelect = document.querySelector('#service-time-select')
        let prefixSelectValue = prefixSelect.value
        document.querySelector('.boobit-time').textContent = prefixSelectValue
    }
    function enterNameOfDeceased() {
        const nameOfDeceased = document.querySelector('#name-of-deceased')
        const nameOfDeceasedValue = nameOfDeceased.value
        document.querySelector('.boobit-n-t').textContent = nameOfDeceasedValue
    }
    function enterAddress() {
        const address = document.querySelector('#address')
        const addressValue = address.value
        console.log("entering")
        document.querySelector('.boobit-address').textContent = addressValue;
    }
    function addGriefPerson() {
        // Check the number of input fields
        if ($('.greif-input').length >= 3) {
            alert('You can only add up to 3 input fields.');
            return;
        }
        else {
            var newInput = `
               <div class="d-flex gap-3 mb-3">
                    <input type="text" class="form-control greif-input" id="address" placeholder="Person in greif"  onInput={ griefInput}/>
                        <div class="form-control w-auto" onClick={ addGriefPerson }>
                        <i class="fal fa-plus fa-plus-icon"></i></div></div>
            `;
            $('.greif').append(newInput);



            $('.greif').on('focusout', '.greif-input', function () {
                var value = $(this).val().trim();
                if (value) {
                    var currentText = $('.boobit-greif').text();
                    if (currentText) {
                        currentText += ' | ' + value;
                    } else {
                        currentText = value;
                    }
                    $('.boobit-greif').text(currentText);
                }
            })

        }


    }
    function fileUpload(event) {
        var file = event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#boobit-up-img').attr('src', e.target.result);
            }
            reader.readAsDataURL(file);
        }
    }
    const navigate = useNavigate()
    const logoutHandler = () => {
        auth.signOut()
        navigate('/sign-in')
    }
    const [prefix, setPrefix] = useState(null)
    const [nameOfDeceased, setNameOfDeceased] = useState(null)
    const [dateOfBirth, setDateOfBirth] = useState(null)
    const [dateOfDeath, setDateOfDeath] = useState(null)
    const [dateOfService, setDateOfService] = useState(null)
    return (
        <>
            {/* <!-- Header Section Start --> */}
            <header id="header" className='p-4'>
                {/* <div className="d-flex w-100 gap-3 justify-content-between align-items-center">
                        <h3 className='m-0'>{user.displayName}</h3> 
                        <div className="btn btn-danger" onClick={logoutHandler}>Sign Out</div>
                    </div> */}
                <div className="">
                    <div className=""> {user ? (<>

                        <div className="d-flex w-100 gap-3 justify-content-between align-items-center">
                            <h3 className='m-0'>{user.displayName}</h3>
                            <div className="btn btn-danger" onClick={logoutHandler}>Sign Out</div>
                        </div>
                    </>) : (<Link to='/sign-in' className='btn btn-primary'>Sign In</Link>)}</div>
                </div>
            </header>
            {/* <!-- Header Section End --> */}
            <main>
                {/* <!-- Hero Section Start --> */}
                <section class="hero">
                    <div class="container-xxl">
                        <div class="row justify-content-center">
                            <div class="col-lg-7 col-md-8 col-sm-10">
                                <h1>Register Obituary on Agra's Most Happening Community Page</h1>
                            </div>
                            <div class="col-12"><img src={hero} class="w-100" alt="" /></div>
                        </div>
                    </div>
                </section>
                {/* <!-- Hero Section End --> */}

                {/* <!-- How It Works Section Start --> */}
                <section class="how-it-works">
                    <div class="container-xxl">
                        <div class="hoitwo-box">
                            <div class="mb-3 mb-sm-5 text-center">
                                <h2>How it works</h2>
                            </div>
                            <div class="row justify-content-center">
                                <div class="col-lg-8">
                                    <div class="row justify-content-around">
                                        <div class="col-sm-5 p-0">
                                            <div class="hoitwo-con">
                                                <div class="hoitwo-img p-2"><img src={work1} alt="" class="w-100" /></div>
                                                <div class="hoitwo-img p-2"><img src={work2} alt="" class="w-100" /></div>
                                                <div class="hoitwo-img p-2"><img src={work3} alt="" class="w-100" /></div>
                                                <div class="hoitwo-img p-2"><img src={work4} alt="" class="w-100" /></div>
                                            </div>
                                            <div class="mt-2 text-center d-flex">
                                                <a href="#book-obituary" class="th-btn fill">Register Now</a>
                                            </div>
                                        </div>
                                        <div class="col-sm-6 mt-4 mt-sm-0 p-0"><img src={workRight} alt="" class="w-100" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="hoitwo-pera">
                            <p>We understand the importance of honoring the lives of those who have passed away, and our
                                platform offers a compassionate space for you to share their stories. </p>
                        </div>
                    </div>
                </section>
                {/* <!-- How It Works Section End --> */}


                {/* <!-- Book an Obituary Section Start --> */}
                <section class="book-obituary" id="book-obituary">
                    <div class="container-xxl">
                        <div class="boobit-container">
                            <div class="boobit-box">
                                <div class="row justify-content-center">
                                    <div class="col-lg-6 col-md-8 col-sm-10">
                                        <h2 class="text-center mb-4">Book an Obituary</h2>
                                        <p class="text-center mb-4">Provide details and upload an image to create a personalised
                                            obituary. Fill the form below.</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-7 order-md-1">
                                        <div class="boobit-left d-flex flex-column mb-5">
                                            <div id="boobit-img" class="boobit-img">
                                                <div class="boobit-head">in loving memory of </div>
                                                <div class="boobit-img"><img src={profile} class="w-100"
                                                    id="boobit-up-img" alt="" /></div>
                                                <div class="boobit-text">
                                                    <div class="boobit-name">
                                                        <div class="boobit-prefix">{prefix? prefix : 'Mr.'}</div>
                                                        <div class="boobit-n-t">{nameOfDeceased? nameOfDeceased : 'Kalash Singh'}</div>
                                                    </div>
                                                    <div class="boobit-life-spam">
                                                        <div class="boobit-date-of-birth">
                                                            {dateOfBirth ? format(dateOfBirth, 'do MMMM, yyyy') : '20th April, 1883'}
                                                            {/* {dateOfBirth? dateOfBirth.toLocaleDateString('en-GB') : '20th April, 1883'} */}
                                                        </div>
                                                        <div class="">-</div>
                                                        <div class="boobit-date-of-death">
                                                            {dateOfDeath ? format(dateOfDeath, 'do MMMM, yyyy') : '19th April, 1945'}
                                                        </div>
                                                    </div>
                                                    <div class="boobit-service">Memorial Service</div>
                                                    <div class="boobit-details">
                                                        <div class="boobit-time">10 am - 12:30 pm</div>
                                                        <div class="">|</div>
                                                        <div class="boobit-date">
                                                            {dateOfService ? format(dateOfService, 'do MMMM, yyyy') : '20th April, 1883'}
                                                        </div>
                                                        <div class="">|</div>
                                                        <div class="boobit-address">Surya Nagar Mandir, Agra</div>
                                                    </div>
                                                </div>
                                                <div class="boobit-h-grif">
                                                    In Grief
                                                </div>
                                                <div class="boobit-greif">
                                                    Natasha Singh | Prem Singh
                                                </div>
                                                <div class="boobit-happening">
                                                    <img src={happenImg} alt="" class="w-100" id="happening-img" />
                                                </div>
                                            </div>
                                            <div id="apply-change" class="th-btn outline">
                                                Apply Changes
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-5 order-md-0">
                                        <div class="boobit-right">
                                            <form action="" method="post">
                                                <div class="mb-3">
                                                    <select class="form-select" name="prefix" id="prefix-select" value={prefix}  onChange={(pfix)=>setPrefix(pfix.target.value)}>
                                                        <option selected>Select Prefix</option>
                                                        <option value="Mr.">Mr.</option>
                                                        <option value="Mrs.">Mrs.</option>
                                                        <option value="Miss">Miss</option>
                                                        <option value="Ms.">Ms.</option>
                                                        <option value="Shri">Shri</option>
                                                        <option value="Sri">Sri</option>
                                                    </select>
                                                </div>
                                                <div class="mb-3">
                                                    <input type="text" class="form-control" id="name-of-deceased" value={nameOfDeceased}
                                                        placeholder="Name of deceased" onChange={(prev)=> setNameOfDeceased(prev.target.value) } />
                                                </div>
                                                <div class="mb-3">
                                                    <DatePicker
                                                        selected={dateOfBirth}
                                                        onChange={(date) => setDateOfBirth(date)}
                                                        dateFormat="dd/MM/yyyy"
                                                        className='date form-control'
                                                        placeholderText='Date of Birth'
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        scrollableMonthYearDropdown
                                                        maxDate={new Date()}
                                                    />
                                                    <div class="ob-icon"><i class="fas fa-calendar-alt"></i></div>
                                                    {/* <input type="text" class="date form-control" id="dateOfBirth"
                                                        placeholder="Date of Birth" />
                                                    <div class="ob-icon"><i class="fas fa-calendar-alt"></i></div> */}
                                                </div>
                                                <div class="mb-3">
                                                    <DatePicker
                                                        selected={dateOfDeath}
                                                        onChange={(date) => setDateOfDeath(date)}
                                                        dateFormat="dd/MM/yyyy"
                                                        className='date form-control'
                                                        placeholderText='Date of Death'
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        scrollableMonthYearDropdown
                                                        maxDate={new Date()}
                                                    />
                                                    <div class="ob-icon"><i class="fas fa-calendar-alt"></i></div>
                                                    {/* <input type="text" class="date form-control" id="date-of-death"
                                                        placeholder="Date of Death" />
                                                    <div class="ob-icon"><i class="fas fa-calendar-alt"></i></div> */}
                                                </div>
                                                <div class="mb-3">
                                                    <select class="form-select" id="service-select" onChange={SetService}>
                                                        <option selected>Service</option>
                                                        <option value="Memorial1">Memorial1</option>
                                                        <option value="Memorial2">Memorial2</option>
                                                        <option value="Memorial3">Memorial3</option>
                                                        <option value="Memorial4">Memorial4</option>
                                                    </select>
                                                </div>
                                                <div class="mb-3">
                                                    <select class="form-select" id="service-time-select" onChange={SetServiceTimeSelect}>
                                                        <option selected>Time of service</option>
                                                        <option value="10 am - 12:30 pm">10 am - 12:30 pm</option>
                                                        <option value="11 am - 12:30 pm">11 am - 12:30 pm</option>
                                                        <option value="12 am - 12:30 pm">12 am - 12:30 pm</option>
                                                    </select>
                                                </div>
                                                <div class="mb-3">
                                                    <DatePicker
                                                        selected={dateOfService}
                                                        onChange={(date) => setDateOfService(date)}
                                                        dateFormat="dd/MM/yyyy"
                                                        className='date form-control'
                                                        placeholderText='Date of Service'
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        scrollableMonthYearDropdown
                                                        minDate={new Date()}
                                                    />
                                                    <div class="ob-icon"><i class="fas fa-calendar-alt"></i></div>
                                                    {/* <input type="text" class="date form-control" id="date-of-service"
                                                        placeholder="Date of Service" />
                                                    <div class="ob-icon"><i class="fas fa-calendar-alt"></i></div> */}
                                                </div>
                                                <div class="mb-3">
                                                    <input type="text" class="form-control" id="address" placeholder="Address"
                                                        maxLength="24" onInput={enterAddress} />
                                                </div>
                                                <div class="">
                                                    <div class="greif">
                                                        <div class="d-flex gap-3 mb-3">
                                                            <input type="text" class="form-control greif-input" id="address"
                                                                placeholder="Person in greif" onInput={griefInput} />
                                                            <div class="form-control w-auto" onClick={addGriefPerson}><i
                                                                class="fal fa-plus fa-plus-icon"></i></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="mb-3">
                                                    <label htmlFor="up-img" class="up-img">
                                                        <img src={upImg} alt="" />
                                                    </label>
                                                    <input class="form-control position-fixed opacity-0" type="file"
                                                        id="up-img" onInput={fileUpload} />
                                                </div>

                                            </form>
                                        </div>
                                    </div>

                                    <div class="col-12 d-flex justify-content-center my-4 order-md-2">
                                        <div class="th-btn fill">Proceed</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- Book an Obituary Section End --> */}





            </main>
        </>
    )
}

export default Home