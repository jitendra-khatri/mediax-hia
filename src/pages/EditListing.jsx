import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase.config'

function EditListing() {
    const [editData, setEditData] = useState(null)
    const {listingId} = useParams()
    useEffect(()=>{
        const fetchData = async()=>{
            const docRef = doc(db, 'listings', listingId)
            const docSnap = await getDoc(docRef)
            if(docSnap.exists()){
                console.log(docSnap.data())
            }
        }
        fetchData()
    })
    return (
        <div>
            <div className="row justify-content-center mt-5">
                <h1 className="text-center mb-5">Edit {editData && editData.name}'s Listing </h1>
                <div class="col-md-5 order-md-0">
                    <div class="boobit-right">
                        <form>
                            <div class="mb-3">
                                <label htmlFor="" className="form-label">Slot No:</label>
                                <input type="text" class="form-control" disabled={true} value={editData && editData.slotNumber} />
                            </div>
                            <div class="mb-3">
                                <label htmlFor="" className="form-label">Name:</label>
                                <input type="text" class="form-control" disabled={true} value={editData && editData.name} />
                            </div>
                            <div class="mb-3">
                                <label htmlFor="" className="form-label">Email:</label>
                                <input type="text" class="form-control" disabled={true} value={editData && editData.gmail} />
                            </div>
                            {/* <div class="mb-3">
                            <label htmlFor="" className="form-label">Date of Posting:</label>
                            <input type="text" class="form-control" disabled={true} value={formatDate(editData && editData.dateOfPosting)} />
                        </div> */}
                        <div class="mb-3">
                                <label htmlFor="" className="form-label">Posting Status:</label>
                                <select class="form-select" name="payment" id="payment" >
                                    <option selected>Select Payment</option>
                                    <option value="true">Posted</option>
                                    <option value="false">Pending</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label htmlFor="" className="form-label">Payment:</label>
                                <select class="form-select" name="postStatus" id="postStatus" >
                                    <option selected>Select Payment</option>
                                    <option value="true">Paid</option>
                                    <option value="false">Unpaid</option>
                                </select>
                            </div>
                            <button type='submit' className='th-btn fill w-100 mt-3'>Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditListing
