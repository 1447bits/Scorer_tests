// // import MathJaxContext from "better-react-mathjax/MathJaxContext"
// // import { MathJax } from "better-react-mathjax/MathJax"
// import { MathJax, MathJaxContext } from "better-react-mathjax"
// // import { MathJax } from "better-react-mathjax/MathJax2"
// // import React, { useState } from 'react'
// import React from 'react'

// export default function SamplePg(props) {

//     // const [questionsArray, setQuestions] = useState([])


//     function convertToMathJaxFormat(inputString) {
//         // Replace every $ with $$
//         const stringWithDoubleDollar = inputString.replace(/\$/g, '$$$$');

//         // Replace every \ with \\
//         const stringWithDoubleBackslash = stringWithDoubleDollar.replace(/\\/g, '\\\\');

//         return stringWithDoubleBackslash;
//     }

//     function fetchdata() {

//         let array = ["AreaUnderTheCurve_21",
//             "BinomialTheorem_13",
//             "BinomialTheorem_24",
//             "AreaUnderTheCurve_15",
//             "AreaUnderTheCurve_2",
//             "BinomialTheorem_3",
//             "BinomialTheorem_4",
//             "AreaUnderTheCurve_5"];


//         for (let i = 0; i < array.length; i++) {
//             let element = array[i]
//             fetch(`https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${element}`)
//                 .then(data => data.json())
//                 .then(jsonObj => {
//                     let quesion = jsonObj[0].Question
//                     // console.log(jsonObj[0])
//                     // document.write(JSON.stringify(jsonObj[0convertToMathJaxString(jsonObj[0].Question]))
//                     // setmathtext(convertToMathJaxString(jsonObj[0].Question));
//                     document.getElementById("App").innerHTML += `<br /><br/><br/>${quesion}`
//                     document.getElementById("App").innerHTML += `<br /><br/><b>converted</b> : ${convertToMathJaxFormat(quesion)}}`

//                     // temp.push(convertToMathJaxFormat(quesion))

//                 })
//         }
//     }

//     {/* {fetchdata()} */}
//     return (
//         <div id='samplePg'>
//             {fetchdata()}
//             <MathJaxContext>
//                 <MathJax>
//                     {"$$f(x)=\\int_0^{x^2} \\frac{t^2-5 t+4}{2+e^t} d t$$ =?"}
//                 </MathJax>
//             </MathJaxContext>
//         </div >
//     )
// }





























































// just parse function needs to be fixed

// issue we are parsing whole string into mathjax and it is being confuesd

// import { MathJax, MathJaxContext } from "better-react-mathjax";
// import React, { useEffect, useState } from 'react';

// export default function SamplePg(props) {
//     const [questionsArray, setQuestions] = useState([]);

//     function convertToMathJaxFormat(inputString) {
//         // Replace every $ with $$
//         const stringWithDoubleDollar = inputString.replace(/\$/g, '$$$$');

//         // Replace every \ with \\
//         const stringWithDoubleBackslash = stringWithDoubleDollar.replace(/\\/g, '\\\\');

//         return stringWithDoubleBackslash;
//     }

//     useEffect(() => {
//         async function fetchdata() {
//             let array = ["AreaUnderTheCurve_21",
//                 "BinomialTheorem_13",
//                 "BinomialTheorem_24",
//                 "AreaUnderTheCurve_15",
//                 "AreaUnderTheCurve_2",
//                 "BinomialTheorem_3",
//                 "BinomialTheorem_4",
//                 "AreaUnderTheCurve_5"];

//             let temp = [];

//             for (let i = 0; i < array.length; i++) {
//                 let element = array[i];
//                 await fetch(`https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${element}`)
//                     .then(data => data.json())
//                     .then(jsonObj => {
//                         let question = jsonObj[0].Question;
//                         temp.push(convertToMathJaxFormat(question));
//                     });
//             }

//             setQuestions(temp);
//         }

//         fetchdata();
//     }, []); // The empty array here means this effect runs once on component mount.

//     function DisplayMathJaxString(str) {
//         return <div dangerouslySetInnerHTML={{ __html: str }} />;
//     }

//     function MathJaxComponent({ inputString }) {
//         // Split the input string using "$$" as the delimiter
//         const parts = inputString.split('$$');

//         // Initialize an array to store the components
//         const components = [];

//         // Loop through the parts and create the components
//         for (let i = 0; i < parts.length; i++) {
//             if (i % 2 === 0) {
//                 // This part is outside "$$...$$", so wrap it in a <p> tag
//                 components.push(<p key={i}>{parts[i]}</p>);
//             } else {
//                 // This part is inside "$$...$$", so wrap it in a <MathJax> tag
//                 // components.push(<MathJax key={i}>$${parts[i]}$$</MathJax>);
//                 let temp = `$$ ${parts[i]} $$`
//                 components.push(<MathJax key={i}>{temp}</MathJax>);
//                 console.log(temp)
//             }
//         }
//         return <div className="question">{components}</div>;
//     }


//     let maSTR = " $$ \\int_0^{\\frac{\\pi}{2}} \\sin ^3 \\theta \\cos \\theta d \\theta $$"

//     return (
//         <div id='SamplePg'>
//             {"some page"}
//             <MathJaxContext>
//                 <MathJax> 
//                     {maSTR}
//                 </MathJax>
//                 {/* <MathJaxComponent inputString={question} /> */}
//                 {/* {questionsArray.map((question, index) => <div>{question} <br /><br /><MathJax key={index}>{question}</MathJax></div>)} */}
//                 {questionsArray.map((question, index) => <div>{question} <br /><br /><MathJaxComponent inputString={question} /><br /><br /><hr /></div>)}
//             </MathJaxContext>
//         </div>
//     );
// }































import { MathJax, MathJaxContext } from "better-react-mathjax";
import React, { useEffect, useState } from 'react';

export default function SamplePg(props) {
    const [questionsArray, setQuestions] = useState([]);

    // Fetch data from local storage when the component mounts
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("array"));
        if (data) {
            // Update questionsArray with the data from local storage
            setQuestions(data);
        }
    }, []); // This effect runs once on component mount to fetch data

    function convertToMathJaxFormat(inputString) {
        // Replace every $ with $$
        const stringWithDoubleDollar = inputString.replace(/\$/g, '$$$$');

        // Replace every \ with \\
        const stringWithDoubleBackslash = stringWithDoubleDollar.replace(/\\/g, '\\\\');

        return stringWithDoubleBackslash;
    }

    function MathJaxComponent({ inputString }) {
        // Split the input string using "$$" as the delimiter
        const parts = inputString.split('$$');

        // Initialize an array to store the components
        const components = [];

        // Loop through the parts and create the components
        for (let i = 0; i < parts.length; i++) {
            if (i % 2 === 0) {
                // This part is outside "$$...$$", so wrap it in a <p> tag
                components.push(<p key={i}>{parts[i]}</p>);
            } else {
                // This part is inside "$$...$$", so wrap it in a <MathJax> tag
                // Add $$ around the equation string
                const equation = `$$${parts[i]}$$`;

                components.push(<MathJax key={i}>{equation}</MathJax>);
            }
        }
        return <div className="question">{components}</div>;
    }

    return (
        <div id='SamplePg'>
            {"some page"}


            <MathJaxContext>

                <MathJax>
                    {"In the expansion of $$ \\left(ax^2+\\frac{1}{bx}\\right)^{11}$$, find the coefficient of $$x^7$$."}
                </MathJax>

                <br/><hr /><br/>

                {questionsArray.map((question, index) => (
                    <MathJax key={index}>
                        {question}
                    </MathJax>
                ))}
                {console.log(questionsArray[6])}
            </MathJaxContext>

        </div>
    );
}


// {questionsArray.map((question, index) => (
//     <div key={index}>
//         {/* <DisplayMathJaxString str={question} /> */}
//         {/* <br /><br /> */}
//         <MathJaxComponent inputString={question} />
//         <br /><br /><hr />
//     </div>
// ))}