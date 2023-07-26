import React from 'react'
import "./commonbutton.css"
const Commonbutton = (props) => {
    return (
        <div className='maindiv-button'>
            <div className=" d-flex justify-content-end">
                <button
                    className="Add-Edit-btn1 text-white"
                    type="submit"
                // onClick={addEditModalFun}
                onClick={props.commonButton}
                style={{width:props?.buttonwidth}}
                >
                   {props.buttonText} 
                </button>
            </div>
        </div>
    )
}

export default Commonbutton