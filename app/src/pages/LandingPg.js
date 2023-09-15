import React, { useState } from 'react'
import "../css/landingPg.css"

export default function LandingPg({ starttestFunc }) {

    const [testTime, settestTime] = useState(0)
    const [selectedQuestions, setselectedQuestions] = useState([])

    function chnageTime(e) {
        let temp = [...selectedQuestions]

        if (e.target.checked) {
            settestTime(testTime + 5)

            temp.push(e.target.getAttribute('data-questionId'))
            setselectedQuestions([...temp])

        }
        else {
            settestTime(testTime - 5)

            temp.splice(selectedQuestions.indexOf(e.target.getAttribute('data-questionId')), 1)
            setselectedQuestions([...temp])

        }
    }

    return (
        <div id='LandingPg'>
            <h1>Math test</h1>
            <input type='text' id='userName' placeholder='Username' />
            <div id='questionSelectionOptions'>
                <b>Select Questions</b>
                <p>Total Test Timing : {testTime} min</p>

                <div id="questionSelection">
                    <label className='questionSelectCheckBox'>
                        <p>AreaUnderTheCurve</p>
                        <input type='checkbox' className='questionSelectionCheckBox' data-questionId={0} onClick={chnageTime} />
                    </label>
                    <label className='questionSelectCheckBox'>
                        <p>BinomialTheorem</p>
                        <input type='checkbox' className='questionSelectionCheckBox' data-questionId={1} onClick={chnageTime} />
                    </label>
                    <label className='questionSelectCheckBox'>
                        <p>BinomialTheorem</p>
                        <input type='checkbox' className='questionSelectionCheckBox' data-questionId={2} onClick={chnageTime} />
                    </label>
                    <label className='questionSelectCheckBox'>
                        <p>AreaUnderTheCurve</p>
                        <input type='checkbox' className='questionSelectionCheckBox' data-questionId={3} onClick={chnageTime} />
                    </label>
                    <label className='questionSelectCheckBox'>
                        <p>AreaUnderTheCurve</p>
                        <input type='checkbox' className='questionSelectionCheckBox' data-questionId={4} onClick={chnageTime} />
                    </label>
                    <label className='questionSelectCheckBox'>
                        <p>BinomialTheorem</p>
                        <input type='checkbox' className='questionSelectionCheckBox' data-questionId={5} onClick={chnageTime} />
                    </label>
                    <label className='questionSelectCheckBox'>
                        <p>BinomialTheorem</p>
                        <input type='checkbox' className='questionSelectionCheckBox' data-questionId={6} onClick={chnageTime} />
                    </label>
                    <label className='questionSelectCheckBox'>
                        <p>AreaUnderTheCurve</p>
                        <input type='checkbox' className='questionSelectionCheckBox' data-questionId={7} onClick={chnageTime} />
                    </label>
                </div>
                <button id='startTextBtn' onClick={() => starttestFunc(selectedQuestions)}>START</button>
            </div>
        </div>
    )
}
