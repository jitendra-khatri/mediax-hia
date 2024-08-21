import { getAuth } from "firebase/auth"
import { getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "../firebase.config";
function EditListing() {
    const { listingId } = useParams(); // Access the 'id' from the URL
    const [editData, setEditData] = useState()
    useEffect(() => {
        const fetchEditData = async () => {
            const docRef = doc(db, 'listings', listingId)
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log(docSnap.data())
                setEditData(docSnap.data())
            }

        }
        fetchEditData()
    }, [])
    const formatDate = (timestamp) => {
        const date = timestamp.toDate(); // Convert Firestore timestamp to JavaScript Date
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short', // This gives abbreviated month (e.g., "Aug")
            year: 'numeric',
        });
        return formattedDate.replace(/\./g, ''); // To remove dots after month abbreviation
    };
    return (
        <div className="row justify-content-center">
            <div class="col-md-5 order-md-0">
                <div class="boobit-right">
                    <form>
                        <div class="mb-3">
                            <input type="text" class="form-control" disabled={true} value={`Slot No: ${editData.slotNumber}`} />
                        </div>
                        <div class="mb-3">
                            <input type="text" class="form-control" disabled={true} value={`Name: ${editData.name}`} />
                        </div>
                        <div class="mb-3">
                            <input type="text" class="form-control" disabled={true} value={`Email: ${editData.gmail}`} />
                        </div>
                        <div class="mb-3">
                            <input type="text" class="form-control" disabled={true} value={`Date of Posting: ${formatDate(editData.dateOfPosting)}`} />
                        </div>
                        {/* <div class="mb-3">
                            <select class="form-select" name="prefix" id="prefix-select" value={prefix} onChange={(pfix) => setPrefix(pfix.target.value)}>
                                <option selected>Select Prefix</option>
                                <option value="Mr.">Mr.</option>
                                <option value="Mrs.">Mrs.</option>
                                <option value="Miss">Miss</option>
                                <option value="Ms.">Ms.</option>
                                <option value="Shri">Shri</option>
                                <option value="Sri">Sri</option>
                            </select>
                        </div> */}

                        {/* <div class="mb-3">
                            <select class="form-select" id="service-select" value={memoService} onChange={(memo) => setMemoService(memo.target.value)}>
                                <option selected>Service</option>
                                <option value="Memorial1">Memorial1</option>
                                <option value="Memorial2">Memorial2</option>
                                <option value="Memorial3">Memorial3</option>
                                <option value="Memorial4">Memorial4</option>
                            </select>
                        </div> */}
                        {/* <div class="mb-3">
                            <select class="form-select" id="service-time-select" value={serviceTime} onChange={(time) => setServiceTime(time.target.value)}>
                                <option selected>Time of service</option>
                                <option value="10 am - 12:30 pm">10 am - 12:30 pm</option>
                                <option value="11 am - 12:30 pm">11 am - 12:30 pm</option>
                                <option value="12 am - 12:30 pm">12 am - 12:30 pm</option>
                            </select>
                        </div> */}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditListing
