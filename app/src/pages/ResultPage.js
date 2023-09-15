import React from 'react'
import "../css/resultpg.css"

// {/* {console.log(props.ans)}
// {console.log(props.eachtime)}
// <br/>
// {props.time}
// <br/>
// {`name : ${props.name}`} */}
export default function ResultPage(props) {

    let totaltime = props.time.split(".")

    function EachQueTimeDetails() {
        let arr = [...props.ans]
        let returncomponent = []
        for (let i = 0; i < arr.length; i++) {
            returncomponent.push(<li>
                {`Question ${i+1} : ${Math.floor(props.eachtime[i]/60)}mins ${props.eachtime[i]%60}sec`}
            </li>)
        }
        return returncomponent
    }

    return (
        < div id="resultPg">
            <h1>Result Page</h1>
            <h3>
                {`UserNmae : ${props.name}`}
            </h3>
            <div id='resultDetails'>
                <h4>per question analysis</h4>
                <ul>
                    <EachQueTimeDetails />
                </ul>
                <h4>
                    {`Total time taken : ${totaltime[0]}hrs ${totaltime[1]}mins ${totaltime[2]}sec`}
                </h4>
            </div>
        </div >
    )
}
