// import React, { useEffect } from 'react'

// export default function TestTimer(props) {

//     useEffect(() => {


//     }, [])


//     return (
//         <span id='testTimer'>00:00:00</span>
//     )
// }


import React, { useState, useEffect } from 'react';

export default function TestTimer(props) {

    const [time, settime] = useState()
    useEffect(() => {
        // let timeinmins = 1
        let maxtime = (props.questions.length * 5) - 1
        let timeinmins = 0
        let timeinsec = 0


        props.initialise_marked_Answers()

        const testTimer = document.getElementById("testTimer");

        let tempeachquetimer = [0, 0, 0, 0, 0, 0, 0, 0]

        if (timeinsec === 60 && timeinmins === maxtime) {
            clearInterval(timerinterval)
            props.submittest()
        }

        let timerinterval = setInterval(() => {
            if (timeinsec === 60) {
                if (timeinmins === maxtime) {
                    return
                }
                timeinmins += 1;
                timeinsec = 0
            } else {
                timeinsec += 1
            }
            settime(`00.${Math.floor(timeinmins)}.${timeinsec % 60}`)
            let localcurrque = document.getElementById("currQuestion")
            if (localcurrque != undefined) {
                tempeachquetimer[parseInt(localcurrque.innerHTML) - 1] += 1
                props.seteachquestiontime([...tempeachquetimer])
            }

        }, 1000);

        // Cleanup the interval when the component unmounts
        return () => {
            clearInterval(timerinterval);
        };
    }, []);

    return (
        <span id='testTimer'>
            {time}
        </span>
    );
}
