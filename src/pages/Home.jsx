import React from 'react'
import html2canvas from 'html2canvas';
import $ from 'jquery'
import profileImage from '../images/hia-profile-image.jpg'




const Home = () => {


    function handleClick() {
        html2canvas(document.querySelector('.boobit-img'), {
            scale: 2 // Double the scale for capturing
        }).then(function (canvas) {
            // Download the scaled canvas content as an image
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/jpg'); // Set the image format (e.g., 'image/jpeg')
            link.download = 'boobit-img.jpg'; // Set the filename for download
            link.click();
        }).catch(function (error) {
            console.error('Error capturing the section:', error);
        });
    };

  function griefInput () {
    const griefPerson1 = document.querySelector('.greif-input')
    let griefPerson1Value = griefPerson1.value   
    document.querySelector('.boobit-greif').textContent = griefPerson1Value
    }




   
    




function SetPrefix(){
    const prefixSelect = document.querySelector('#prefix-select')
    let prefixSelectValue = prefixSelect.value   
    document.querySelector('.boobit-prefix').textContent = prefixSelectValue
}


function SetService(){
    const prefixSelect = document.querySelector('#service-select')
    let prefixSelectValue = prefixSelect.value   
    document.querySelector('.boobit-service').textContent = prefixSelectValue
}


function SetServiceTimeSelect(){
    const prefixSelect = document.querySelector('#service-time-select')
    let prefixSelectValue = prefixSelect.value   
    document.querySelector('.boobit-time').textContent = prefixSelectValue
}

function enterNameOfDeceased(){
    const nameOfDeceased = document.querySelector('#name-of-deceased')
    const nameOfDeceasedValue = nameOfDeceased.value
    document.querySelector('.boobit-n-t').textContent = nameOfDeceasedValue
}

function enterAddress(){
    const address = document.querySelector('#address')
    const addressValue = address.value
    console.log("entering")
    document.querySelector('.boobit-address').textContent = addressValue;
}



    
    
    function addGriefPerson () {
        // Check the number of input fields
        if ($('.greif-input').length >= 3) {
            alert('You can only add up to 3 input fields.');
            return;
        }

        var newInput = `
            <div class="d-flex gap-3 mb-3">
                <input type="text" class="form-control greif-input" placeholder="Person in greif">
            </div>`;
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


function fileUpload(e){
    var file = e.target.files[0];
            if (file) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#boobit-up-img').attr('src', e.target.result);
                }
                reader.readAsDataURL(file);
            }
}


  return (
    <>


    <section className="book-obituary" id="book-obituary">
            <div className="container-xxl">
                <div className="boobit-container">
                    <div className="boobit-box">
                        <div className="row justify-content-center">
                            <div className="col-lg-6 col-md-8 col-sm-10">
                                <h2 className="text-center mb-4">Book an Obituary</h2>
                                <p className="text-center mb-4">Provide details and upload an image to create a personalised
                                    obituary. Fill the form below.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-7 order-md-1">
                                <div className="boobit-left d-flex flex-column mb-5">
                                    <div id="boobit-img" className="boobit-img">
                                        <div className="boobit-head">in loving memory of </div>
                                        <div className="boobit-img"><img src={ profileImage } className="w-100"
                                                id="boobit-up-img" alt="" /></div>
                                        <div className="boobit-text">
                                            <div className="boobit-name">
                                                <div className="boobit-prefix">Mr.</div>
                                                <div className="boobit-n-t">Kalash Singh</div>
                                            </div>
                                            <div className="boobit-life-spam">
                                                <div className="boobit-date-of-birth">20th April, 1883</div>
                                                <div className="">-</div>
                                                <div className="boobit-date-of-death">19th April, 1945</div>
                                            </div>
                                            <div className="boobit-service">Memorial Service</div>
                                            <div className="boobit-details">
                                                <div className="boobit-time">10 am - 12:30 pm</div>
                                                <div className="">|</div>
                                                <div className="boobit-date">20th April, 2024</div>
                                                <div className="">|</div>
                                                <div className="boobit-address">Surya Nagar Mandir, Agra</div>
                                            </div>
                                        </div>
                                        <div className="boobit-h-grif">
                                            In Grief
                                        </div>
                                        <div className="boobit-greif">
                                            Natasha Singh | Prem Singh
                                        </div>
                                        <div className="boobit-happening">
                                            <img src="image/happen-img.png" alt="" className="w-100" id="happening-img"/>
                                        </div>
                                    </div>
                                    <div id="apply-change" className="th-btn outline" onClick={ handleClick }>
                                        Apply Changes
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5 order-md-0">
                                <div className="boobit-right">
                                    <form action="" method="post">
                                        <div className="mb-3">
                                            <select className="form-select" name="prefix" id="prefix-select" onChange={ SetPrefix }>
                                                <option selected>Select Prefix</option>
                                                <option value="Mr.">Mr.</option>
                                                <option value="Mrs.">Mrs.</option>
                                                <option value="Miss">Miss</option>
                                                <option value="Ms.">Ms.</option>
                                                <option value="Shri">Shri</option>
                                                <option value="Sri">Sri</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" className="form-control" id="name-of-deceased"
                                                placeholder="Name of deceased" onInput={ enterNameOfDeceased } />
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" className="date form-control" id="date-of-birth"
                                                placeholder="Date of Birth" />
                                            <div className="ob-icon"><i className="fas fa-calendar-alt"></i></div>
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" className="date form-control" id="date-of-death"
                                                placeholder="Date of Death" />
                                            <div className="ob-icon"><i className="fas fa-calendar-alt"></i></div>
                                        </div>
                                        <div className="mb-3">
                                            <select className="form-select" id="service-select" onChange={ SetService}>
                                                <option selected>Service</option>
                                                <option value="Memorial1">Memorial1</option>
                                                <option value="Memorial2">Memorial2</option>
                                                <option value="Memorial3">Memorial3</option>
                                                <option value="Memorial4">Memorial4</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <select className="form-select" id="service-time-select" onChange={ SetServiceTimeSelect }>
                                                <option selected>Time of service</option>
                                                <option value="10 am - 12:30 pm">10 am - 12:30 pm</option>
                                                <option value="11 am - 12:30 pm">11 am - 12:30 pm</option>
                                                <option value="12 am - 12:30 pm">12 am - 12:30 pm</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" className="date form-control" id="date-of-service"
                                                placeholder="Date of Service" />
                                            <div className="ob-icon"><i className="fas fa-calendar-alt"></i></div>
                                        </div>
                                        <div className="mb-3">
                                            <input type="text" className="form-control" id="address" placeholder="Address"
                                                maxlength="24"  onInput={ enterAddress }/>
                                        </div>
                                        <div className="">
                                            <div className="greif">
                                                <div className="d-flex gap-3 mb-3">
                                                    <input type="text" className="form-control greif-input" id="address"
                                                        placeholder="Person in greif" onInput={ griefInput}  />
                                                    <div className="form-control w-auto" onClick={ addGriefPerson }><i
                                                            className="fal fa-plus fa-plus-icon" ></i></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label for="up-img" className="up-img">
                                                <img src="image/up-img.png" alt="" />
                                            </label>
                                            <input className="form-control position-fixed opacity-0" type="file"
                                                id="up-img"  onInput={fileUpload} />
                                        </div>

                                    </form>
                                </div>
                            </div>

                            <div className="col-12 d-flex justify-content-center my-4 order-md-2">
                                <div className="th-btn fill">Proceed</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </>
  )
}


/* 
$('.th-btn.outline').click(function () {
    html2canvas(document.querySelector('.boobit-img'), {
        scale: 2 // Double the scale for capturing
    }).then(function (canvas) {
        // Download the scaled canvas content as an image
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/jpg'); // Set the image format (e.g., 'image/jpeg')
        link.download = 'boobit-img.jpg'; // Set the filename for download
        link.click();
    }).catch(function (error) {
        console.error('Error capturing the section:', error);
    });
});

 */


export default Home