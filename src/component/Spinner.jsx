import React from 'react'
import spinner from '../assets/loading.gif'

function Spinner() {
  return (
    <>
     <div id="loader" class="d-none"><img src={spinner} alt=""/></div> 
    </>
  )
}

export default Spinner
