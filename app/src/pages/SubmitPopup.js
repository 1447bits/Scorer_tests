import React from 'react'
import "../css/submitpopup.css"

export default function SubmitPopup(props) {
    return (
        <div id='SubmitPopup'>
            <div id='SubmitPopupBox'>
                <div id="details">
                    <div id='timedetails'>
                        Total Time Taken : {props.timetaken} 
                    </div>
                    <div id='attempDetails'>
                        Attempted : {`${props.attempted} / ${props.total}`}
                    </div>
                </div>
                <div id='submitOrCancleBtn'>
                    <span onClick={props.cancelFunction}>Cancel</span>
                    <span onClick={props.submitTestFunc}>Submit</span>
                </div>
            </div>
        </div>
    )
}
