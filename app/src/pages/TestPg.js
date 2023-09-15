import React, { useEffect, useState } from 'react'
import { MathJax, MathJaxContext } from "better-react-mathjax";
import SubmitPopup from "./SubmitPopup"
import TestTimer from "../components/TestTimer"
import "../css/TestPg.css"

export default function TestPg(props) {

    let totalPages = props.questions.length
    const [currque, setcurrque] = useState(1)
    const [markedOption, setmarkedOption] = useState(0)
    const [markedAnswers, setmarkedAnswers] = useState([0, 0, 0, 0, 0, 0, 0, 0])
    const [submitPopupvisibility, setsubmitPopupvisibility] = useState(false)
    const [testtimetaken, settesttimetaken] = useState("00.00.00")
    const [eachquestiontime, seteachquestiontime] = useState([])
    const [fetchedquestions, setfetchedquestions] = useState([])
    const [fetched, setfetched] = useState(false)


    useEffect(() => {
        async function fetchQuestions(topics) {

            function convertToMathJaxFormat(inputString) {
                // Replace every $ with $$
                const stringWithDoubleDollar = inputString.replace(/\$/g, '$$$$');

                // Replace every \ with \\
                const stringWithDoubleBackslash = stringWithDoubleDollar.replace(/\\/g, '\\\\');

                return stringWithDoubleBackslash;
            }


            if (!fetched) {
                let temp = []
                for (let i = 0; i < topics.length; i++) {
                    let element = topics[i];
                    await fetch(`https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${element}`)
                        .then(data => data.json())
                        .then(jsonObj => {
                            let question = jsonObj[0].Question;
                            temp.push(convertToMathJaxFormat(question));
                        });
                }
                setfetchedquestions([...temp])
                setfetched(true)
            }
        }

        fetchQuestions(props.questions)
    }, [])

    function initialise_marked_Answers() {
        let temp = []
        for (let i = 0; i < totalPages; i++) {
            temp.push(0);
        }
        setmarkedAnswers([...temp])
        seteachquestiontime([...temp])
    }



    function markOption(optionNum) {
        setmarkedOption(optionNum)
    }

    function RenderQuestion(curr, topics) {
        return <MathJax>
            {fetchedquestions[(curr.curr) - 1]}
        </MathJax>
    }

    function saveOption() {
        let temp = [...markedAnswers]
        if (currque === totalPages) {
            submittest()
            temp[currque - 1] = markedOption;
            setmarkedAnswers([...temp])
            setmarkedOption(0)
            return
        }
        temp[currque - 1] = markedOption;
        setmarkedAnswers([...temp])
        setmarkedOption(0)
        setcurrque(currque + 1)
    }

    function goToPrevPage() {
        if (currque !== 1) {
            setcurrque(currque - 1)
        } else {
            alert("first question")
        }
    }


    function submittest() {
        setsubmitPopupvisibility(true)

        settesttimetaken(document.getElementById("testTimer").innerHTML)
    }

    return (
        <>
            <div id='TestPg'>
                <div id='testDetails'>
                    <div>
                        <TestTimer questions={props.questions} initialise_marked_Answers={initialise_marked_Answers} submittest={submittest} seteachquestiontime={seteachquestiontime} />
                        <span>{` / 00.${(props.questions.length * 5)}.00`}</span>
                    </div>
                    <div id='questionNo'>
                        <span id='currQuestion'>{currque}</span>{" / "}
                        <span id='totalQuestions'>{totalPages}</span>
                    </div>
                </div>
                <div id='question'>
                    <MathJaxContext>
                        {fetched ? <RenderQuestion curr={currque} /> : <>loading...</>}
                        {/* {"asdg"} */}
                    </MathJaxContext>
                </div>
                <div id='options'>
                    <div className='options-option'>
                        <label onClick={() => markOption(1)}>
                            <input type='radio' name="mcqOption" className='mcqoption' id={1} />
                            {/* <input type='radio' name="mcqOption" checked={() => amIChecked(currque, 1) ? "true" : "false"} id={1} /> */}
                            <p>Option 1</p>
                        </label>
                    </div>
                    <div className='options-option'>
                        <label onClick={() => markOption(2)}>
                            <input type='radio' name="mcqOption" className='mcqoption' id={2} />
                            {/* <input type='radio' name="mcqOption" checked={() => amIChecked(currque, 2) ? "true" : "false"} id={2} /> */}
                            <p>Option 2</p>
                        </label>
                    </div>
                    <div className='options-option'>
                        <label onClick={() => markOption(3)}>
                            <input type='radio' name="mcqOption" className='mcqoption' id={3} />
                            {/* <input type='radio' name="mcqOption" checked={() => amIChecked(currque, 3) ? "true" : "false"} id={3} /> */}
                            <p>Option 3</p>
                        </label>
                    </div>
                    <div className='options-option'>
                        <label onClick={() => markOption(4)}>
                            <input type='radio' name="mcqOption" className='mcqoption' id={4} />
                            {/* <input type='radio' name="mcqOption" checked={() => amIChecked(currque, 4) ? "true" : "false"} id={4} /> */}
                            <p>Option 4</p>
                        </label>
                    </div>
                </div>
                <div className='navoptions'>
                    <div id='nxtprev'>
                        <span onClick={goToPrevPage}>Prev</span>
                        <span onClick={saveOption}>Save & Next</span>
                    </div>
                    <div>
                        <span id='submit' onClick={submittest}>Submit</span>
                    </div>
                </div>
            </div>
            {submitPopupvisibility ? <SubmitPopup submitTestFunc={() => props.submitfunc(markedAnswers, testtimetaken, eachquestiontime)} timetaken={testtimetaken} attempted={totalPages - (markedAnswers.filter(item => item === 0)).length} total={totalPages} /> : null}
        </>
    )
}
