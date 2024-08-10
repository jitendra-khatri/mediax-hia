import { useState } from "react"
import { db } from "../firebase.config"
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { toast } from "react-toastify"

function MyDatePicker() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [newSlot, setNewSlot] = useState(null);
  
  return (
    <div>
      
    </div>
  )
}

export default MyDatePicker
