import { useState } from "react"
import { db } from "../firebase.config"
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { toast } from "react-toastify"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Header from "../component/Header"

function MyDatePicker() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [newSlot, setNewSlot] = useState(null);

  const handleDateChange = async (date) => {
    if (!(date instanceof Date) || isNaN(date)) {
      console.error("Invalid date selected");
      return;
    }
    setSelectedDate(date);

    const formattedDate = date.toISOString().split('T')[0]; // Formatting date for the document ID
    const docRef = doc(db, 'bookedSlot', formattedDate);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const availableSlots = docSnap.data().availableSlot || [];

      if (availableSlots.length >= 8) {
        toast.error('All slots booked for this date');
      } else {
        const lastSlot = availableSlots.length > 0 ? Math.max(...availableSlots) : 0;
        const nextSlot = lastSlot + 1;

        if (nextSlot <= 8) {
          setNewSlot(nextSlot);
          await updateDoc(docRef, {
            availableSlot: [...availableSlots, nextSlot]
          });
        }
      }
    } else {
      setNewSlot(1);
      await setDoc(docRef, {
        date: date,
        availableSlot: [1]
      });
    }
  };

  return (
    <>
      <Header />
      {/* <!-- Book an Obituary Section Start --> */}
      <section class="book-obituary" id="book-obituary">
        <div class="container-xxl">
          <div class="boobit-container">
            <div class="boobit-box">
              <div class="row justify-content-center">
                <div class="col-lg-6 col-md-8 col-sm-10">
                  <h2 class="text-center mb-4">Check Available Slot</h2>
                  {/* <p class="text-center mb-4">Provide details and upload an image to create a personalised
                                            obituary. Fill the form below.</p> */}
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 order-md-0">
                  <div class="boobit-right">
                    <form action="" method="post">
                      <div class="mb-3">
                        <DatePicker
                          onChange={handleDateChange}
                          selected={selectedDate}
                          dateFormat="dd/MM/yyyy"
                          className='date form-control'
                          placeholderText='Date of Death'
                          showYearDropdown
                          showMonthDropdown
                          scrollableMonthYearDropdown
                          minDate={new Date()}
                          
                        />
                        <div class="ob-icon"><i class="fas fa-calendar-alt"></i></div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Book an Obituary Section End --> */}
    </>
  )
}

export default MyDatePicker
