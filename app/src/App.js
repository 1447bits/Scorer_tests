import { useEffect, useState } from 'react';
import './css/App.css';

import LandingPg from './pages/LandingPg';
import TestPg from './pages/TestPg';
import ResultPage from './pages/ResultPage';

function App() {

  let allQuestions = [
    "AreaUnderTheCurve_21",
    "BinomialTheorem_13",
    "BinomialTheorem_24",
    "AreaUnderTheCurve_15",
    "AreaUnderTheCurve_2",
    "BinomialTheorem_3",
    "BinomialTheorem_4",
    "AreaUnderTheCurve_5"
  ]

  const [testState, settestState] = useState(0)
  const [selectedQuestions, setselectedQuestions] = useState([])
  const [resultpagestatus, setresultpagestatus] = useState(false)
  const [useranswers, setuseranswers] = useState([])
  const [testTimeTakenByUSer, settestTimeTakenByUSer] = useState("")
  const [username, setusername] = useState("username")
  const [eachquetime, seteachquetime] = useState([])



  function startTest(questions) {
    if (document.getElementById("userName").value == "") {
      alert("enter username")
      return
    } else if (questions.length === 0) {
      alert("choose chapter")
    } else {
      setusername(document.getElementById("userName").value)
      settestState(1)
      let temp = []
      for (let i = 0; i < questions.length; i++) {
        temp.push(allQuestions[parseInt(questions[i])])
      }
      setselectedQuestions([...temp])
    }
  }

  function loadResultPage(ansarr, time, eachquetime) {
    setresultpagestatus(true)
    settestState(1)
    setuseranswers([...ansarr])
    settestTimeTakenByUSer(time)
    seteachquetime([...eachquetime])
  }

  function whichPageNow() {
    if (resultpagestatus) {
      return <ResultPage name={username} ans={useranswers} time={testTimeTakenByUSer} eachtime={eachquetime} />
    }
    else {
      return <TestPg questions={selectedQuestions} submitfunc={loadResultPage} />
    }
  }

  window.addEventListener("beforeunload", function (e) {
    e.preventDefault();
    e.returnValue = "";

    const confirmationMessage = "page will reload. All progress will be lost";
    if (window.confirm(confirmationMessage)) {
      e.returnValue = undefined;
    } else {
      e.returnValue = "You have chosen to stay on this page.";
    }
  });

  return (
    <div id="App">
      {testState == 0 ? <LandingPg starttestFunc={startTest} /> : whichPageNow()}
      {/* <TestPg questions={allQuestions} submitfunc={loadResultPage} /> */}
    </div>
  );
}

export default App;
