import React from 'react'
import "./commonbutton.css"

const Commonbackbutton = ({ backButton, backbuttonwidth, backButtonText }) => {
    return (
        <div>
            <div className='Book-Seminar-Hall-Div'>
                <button type="button" className="btn p-0 px-sm-2 btn-outline-dark register-btn1" 
                   onClick={backButton}
                   style={{width:backbuttonwidth}}
                   >
                    {backButtonText}
                    
                </button>
            </div>
        </div >
    )
}

export default Commonbackbutton


// const onSubmit=(e)=>{
// e.preventDefault()
// }