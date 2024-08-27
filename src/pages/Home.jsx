import hero from '../assets/hero-banner.jpg'
import heroMobile from '../assets/hero-banner-mobile.jpg'
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
import html2canvas from 'html2canvas';
import { toast } from 'react-toastify'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase.config'; // Adjust the import according to your file structure
import { collection, addDoc, setDoc, doc, getDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid'
import Header from '../component/Header'
function Home() {
    const navigate = useNavigate()
    const [prefix, setPrefix] = useState(null)
    const [nameOfDeceased, setNameOfDeceased] = useState(null)
    const [memoService, setMemoService] = useState(null)
    const [serviceTime, setServiceTime] = useState(null)
    const [serviceAddress, setServiceAddress] = useState(null)
    const [dateOfBirth, setDateOfBirth] = useState(null)
    const [dateOfDeath, setDateOfDeath] = useState(null)
    const [dateOfService, setDateOfService] = useState(null)
    const [griefPerson1, setGriefPerson1] = useState(false)
    const [griefPerson2, setGriefPerson2] = useState(false)
    const [griefPersonText1, setGriefPersonText1] = useState(null)
    const [griefPersonText2, setGriefPersonText2] = useState(null)
    const [griefPersonText3, setGriefPersonText3] = useState(null)
    const [imageUpload, setImageUpload] = useState(null)
    const [user, setUser] = useState(null)
    const [listingDataCheck, setListingDataCheck] = useState()
    const [listingExists, setListingExists] = useState(false)
    const auth = getAuth()
    useEffect(() => {
        setUser(auth.currentUser)
        const fetchData = async()=>{
            const docRef =  doc(db, 'listings', auth.currentUser.uid)
            const docSnap = await getDoc(docRef)

            if(docSnap.exists()){
                console.log(docSnap.data())
                setListingExists(true)
                setListingDataCheck(docSnap.data())
            }
        }
        fetchData()
    }, [])


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

    

    function handleClick() {
        html2canvas(document.querySelector('.boobit-img'), { scale: 2 }).then(function (canvas) {
            canvas.toBlob(function (blob) {
                const file = new File([blob], 'post.jpg', { type: 'image/jpeg' });
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                const image = dataTransfer.files;
    
                // Use image[0] directly instead of waiting for state update
                if (image[0] == null) {
                    return false;
                }
    
                const storage = getStorage();
                const imageRef = ref(storage, `images/${uuidv4()}.jpg`);
                uploadBytes(imageRef, image[0]).then(() => {
                    getDownloadURL(imageRef).then(async (url) => {
                        try {
                            const auth = getAuth();
                            if (!auth.currentUser) {
                                throw new Error("User not authenticated");
                            }
                            const listingData = {
                                listingCreated: true,
                                userId: auth.currentUser.uid,
                                name: auth.currentUser.displayName,
                                gmail: auth.currentUser.email,
                                dateOfPosting: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
                                postStatus: false,
                                slotNumber: 0,
                                payment: false,
                                imageUrl: url,
                                paymentResponseId:'No Id Yet',
                            };
    
                            console.log(listingData);
    
                            const docRef = doc(db, "listings", auth.currentUser.uid);
                            await setDoc(docRef, listingData);
    
                            console.log("Document written with ID: ", auth.currentUser.uid);
                            alert('File Uploaded and Listing Created'); // Consider using toast instead
                            navigate('/pick-date');
                        } catch (error) {
                            console.error("Error adding document: ", error);
                            toast.error('Error creating listing: ' + error.message);
                        }
                    }).catch((error) => {
                        console.error('Error getting download URL:', error);
                        toast.error('Error getting download URL: ' + error.message);
                    });
    
                }).catch((error) => {
                    console.log('Error uploading file:', error);
                    toast.error('Error uploading file:', error.message); // Added catch block for file upload errors
                });
    
            }, 'image/jpeg');
        }).catch(function (error) {
            console.log('Error capturing the section:', error);
        });
    }
    
   /*  function handleClick() {

        html2canvas(document.querySelector('.boobit-img'), { scale: 2 }).then(function (canvas) {
            canvas.toBlob(function (blob) {
                const file = new File([blob], 'post.jpg', { type: 'image/jpeg' });
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                // $('#formFileLg')[0].files = dataTransfer.files;
                // const image = $('#formFileLg')[0].files
                const image = dataTransfer.files
                console.log(image[0])
                // console.log(image[0])
                setImageUpload(image[0])
                // console.log(dataTransfer.files)
                if (imageUpload == null) {
                    return false
                }
                const storage = getStorage()
                const imageRef = ref(storage, `images/${uuidv4()}.jpg`)
                uploadBytes(imageRef, imageUpload).then(() => {
                    getDownloadURL(imageRef).then(async (url) => {
                        try {
                            const auth = getAuth();
                            if (!auth.currentUser) {
                                throw new Error("User not authenticated");
                            }
                            const listingData = {
                                listingCreated: true,
                                userId: auth.currentUser.uid,
                                name: auth.currentUser.displayName,
                                gmail: auth.currentUser.email,
                                dateOfPosting: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
                                postStatus: false,
                                slotNumber: 0,
                                payment: false,
                                imageUrl: url
                            };

                            console.log(listingData);

                            const docRef = doc(db, "listings", auth.currentUser.uid);
                            await setDoc(docRef, listingData);

                            console.log("Document written with ID: ", auth.currentUser.uid);
                            alert('File Uploaded and Listing Created'); // Consider using toast instead
                            navigate('/pick-date')
                        } catch (error) {
                            console.error("Error adding document: ", error);
                            toast.error('Error creating listing: ' + error.message);
                        }
                    }).catch((error) => {
                        console.error('Error getting download URL:', error);
                        toast.error('Error getting download URL: ' + error.message);
                    });

                }).catch((error) => {
                    console.log('Error uploading file:', error);
                    toast.error('Error uploading file:', error.message); // Added catch block for file upload errors
                });

                // console.log(dataTransfer.files)
            }, 'image/jpeg');
        }).catch(function (error) {
            console.log('Error capturing the section:', error);
        });
        //  html2canvas(document.querySelector('.boobit-img'), {
        //      scale: 2 // Double the scale for capturing
        //  }).then(function (canvas) {
        //      // Download the scaled canvas content as an image
        //      const link = document.createElement('a');
        //      link.href = canvas.toDataURL('image/jpg'); // Set the image format (e.g., 'image/jpeg')
        //      link.download = 'boobit-img.jpg'; // Set the filename for download
        //      link.click();
        //  }).catch(function (error) {
        //      toast.error('Error capturing the section:', error);
        //  }); 
    }; */

    return (
        <>
            {/* <!-- Header Section Start --> */}
            <Header />
            {/* <!-- Header Section End --> */}
            <main>
                {/* <!-- Hero Section Start --> */}
                <section className={`hero ${listingExists?'d-none':' '}`}>
                    <div class="container-xxl">
                        <div class="row justify-content-center">
                            <div class="col-md-8 col-sm-10">
                                <h1>Register Obituary on Agra's Most Happening Community Page</h1>
                            </div>
                            <div class="col-12">
                                <img src={hero} class="d-none d-sm-block w-100" alt="" />
                                <img src={heroMobile} class="d-block d-sm-none w-100" alt="" />
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- Hero Section End --> */}

                {/* <!-- How It Works Section Start --> */}
                <section className={`how-it-works ${listingExists?'d-none':' '}`}>
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
                                        <h2 class="text-center mb-4">{listingExists? 'You have created Obituary':'Book an Obituary'}</h2>
                                        <p class="text-center mb-4">Provide details and upload an image to create a personalised obituary. Fill the form below.</p>
                                       {/* {listingExists &&(<div className="text-center"><img src={listingDataCheck?.imageUrl} alt="" className="w-50" /></div>)} */}
                                    </div>
                                </div>

                                <div className={`row ${listingExists?'d-none':' '}`}>
                                    <div class="col-md-7 order-md-1">
                                        <div class="boobit-left d-flex flex-column mb-5">
                                            <div id="boobit-img" class="boobit-img">
                                                <div class="boobit-head">in loving memory of </div>
                                                <div class="boobit-img"><img src={profile} class="w-100"
                                                    id="boobit-up-img" alt="" /></div>
                                                <div class="boobit-text">
                                                    <div class="boobit-name">
                                                        <div class="boobit-prefix">{prefix ? prefix : 'Mr.'}</div>
                                                        <div class="boobit-n-t">{nameOfDeceased ? nameOfDeceased : 'Kalash Singh'}</div>
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
                                                    <div class="boobit-service">{memoService ? memoService : 'Memorial Service'}</div>
                                                    <div class="boobit-details">
                                                        <div class="boobit-time"> {serviceTime ? serviceTime : '10am - 12:30pm'}</div>
                                                        <div class="">|</div>
                                                        <div class="boobit-date">
                                                            {dateOfService ? format(dateOfService, 'do MMMM, yyyy') : '20th April, 1883'}
                                                        </div>
                                                        <div class="">|</div>
                                                        <div class="boobit-address">{serviceAddress ? serviceAddress : 'Surya Nagar Mandir, Agra'}</div>
                                                    </div>
                                                </div>
                                                <div class="boobit-h-grif">
                                                    In Grief
                                                </div>
                                                <div class="boobit-greif">

                                                    {griefPersonText1 ? `${griefPersonText1} | ` : 'Natasha Singh | '}
                                                    {griefPersonText2 ? ` ${griefPersonText2}` : ' Prem Singh'}
                                                    {griefPersonText3 ? ` | ${griefPersonText3}` : ''}
                                                </div>
                                                <div class="boobit-happening">
                                                    <img src={happenImg} alt="" class="w-100" id="happening-img" />
                                                </div>
                                            </div>
                                            {/* <div id="apply-change" onClick={handleClick} class="th-btn outline">
                                                Apply Changes
                                            </div> */}
                                        </div>
                                    </div>
                                    <div class="col-md-5 order-md-0">
                                        <div class="boobit-right">
                                            <form action="" method="post">
                                                <div class="mb-3">
                                                    <select class="form-select" name="prefix" id="prefix-select" value={prefix} onChange={(pfix) => setPrefix(pfix.target.value)}>
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
                                                    <input type="text" class="form-control" maxLength='21' id="name-of-deceased" value={nameOfDeceased}
                                                        placeholder="Name of deceased" onChange={(prev) => setNameOfDeceased(prev.target.value)} />
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
                                                    <select class="form-select" id="service-select" value={memoService} onChange={(memo) => setMemoService(memo.target.value)}>
                                                        <option selected>Service</option>
                                                        <option value="Memorial1">Memorial1</option>
                                                        <option value="Memorial2">Memorial2</option>
                                                        <option value="Memorial3">Memorial3</option>
                                                        <option value="Memorial4">Memorial4</option>
                                                    </select>
                                                </div>
                                                <div class="mb-3">
                                                    <select class="form-select" id="service-time-select" value={serviceTime} onChange={(time) => setServiceTime(time.target.value)}>
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
                                                    <input type="text" class="form-control" id="address" placeholder="Address" value={serviceAddress}
                                                        maxLength="24" onChange={(addr) => setServiceAddress(addr.target.value)} />
                                                </div>
                                                <div class="">
                                                    <div class="greif">
                                                        <div class="d-flex gap-3 mb-3">
                                                            <input type="text" class="form-control greif-input" maxLength="15" value={griefPersonText1} onChange={(prev) => setGriefPersonText1(prev.target.value)} placeholder="Person in greif" />
                                                            <div class="form-control w-auto" onClick={() => { setGriefPerson1(true) }}><i
                                                                class="fal fa-plus fa-plus-icon"></i></div>
                                                        </div>
                                                        {griefPerson1 && (
                                                            <div class="d-flex gap-3 mb-3">
                                                                <input type="text" class="form-control greif-input" maxLength="15" value={griefPersonText2} onChange={(prev) => setGriefPersonText2(prev.target.value)} placeholder="Person in greif" />
                                                                <div class="form-control w-auto" onClick={() => { setGriefPerson2(true) }}><i
                                                                    class="fal fa-plus fa-plus-icon"></i></div>
                                                            </div>)}
                                                        {griefPerson2 && (
                                                            <div class="d-flex gap-3 mb-3">
                                                                <input type="text" class="form-control greif-input" maxLength="15" value={griefPersonText3} onChange={(prev) => setGriefPersonText3(prev.target.value)} placeholder="Person in greif" />
                                                                <div class="form-control w-auto" onClick={() => { alert("You can not add more then 3") }}><i
                                                                    class="fal fa-plus fa-plus-icon"></i></div>
                                                            </div>)}
                                                    </div>
                                                </div>

                                                <div class="mb-3">
                                                    <label htmlFor="up-img" class="up-img">
                                                        <img src={upImg} alt="" />
                                                    </label>
                                                    <input class="form-control position-fixed opacity-0" type="file"
                                                        id="up-img" onInput={fileUpload} />
                                                </div>

                                                {/* <input class="form-control form-control-lg"  id="formFileLg" onChange={(e)=>setImage(e.target.files[0])} type="file" /> */}
                                                {/* <input class="form-control form-control-lg" id="formFileLg" type="file" /> */}
                                            </form>
                                        </div>
                                    </div>

                                    <div class="col-12 d-flex justify-content-center my-4 order-md-2" onClick={handleClick}>
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