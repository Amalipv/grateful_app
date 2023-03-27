import React, { useState, useEffect } from "react";
import Entry from "./Entry";
import "./app.css";
import { resolvePath } from "react-router-dom";
import * as datedreamer from "datedreamer";
import moment from "moment";

const App = () => {

  let reqDate = moment().format('yyyy-MM-DD');
  let [code, setCode] = useState();
  let [firstentry, setFirstEntry] = useState('1.');
  let [secondentry, setSecondEntry] = useState('2.');
  let [thirdentry, setThirdEntry] = useState('3');

  //save the entries logged by the user
  const saveMoments = async () => {
    console.log("saveMoments called");
    let response = await fetch('http://127.0.0.1:8086/api/entries/saveEntries',{
      method: 'POST',
      body: JSON.stringify({
        "userId": "640b4c145cb0d00c04a7938b",
        "entry1" : firstentry,
        "entry2" : secondentry,
        "entry3" : thirdentry
      }),
      headers:{
        'Content-type': 'application/json;charset=UTF-8',
      },
    });
    let data = await response.json();
    console.log(data+" "+response.status);
    setCode(response.status);
    //setEntries(data);
    //console.log("code : "+"entries "+entries);
  }

  //check entries for today and display from db
  const getMoments = async (reqDate) => {
    setFirstEntry("");
    setSecondEntry("");
    setThirdEntry("");
    console.log("getMoments called "+reqDate);
    let response = await fetch(`http://127.0.0.1:8086/api/entries/getByDate/640b4c145cb0d00c04a7938b?date=${reqDate}`,{method: 'GET'});
    let data = await response.json();
    console.log(data[0]);
    if(data[0] != null || data[0] != undefined){
      console.log("Moments already recorded today but rendering on the display");
      const fEntry = data[0].entry1;
       const sEntry = data[0].entry2;
        const tEntry = data[0].entry3;
        setFirstEntry(fEntry!=null?fEntry:"");
       setSecondEntry(sEntry!=null?sEntry:"");
        setThirdEntry(tEntry!=null?tEntry:"");
     
    }
   
  }
 
useEffect(() => {
    console.log("useEffect");
    new datedreamer.calendarToggle({
    element: "#calendar",
      selectedDate: moment().format('MM/DD/yyyy'),
    // date format
    format: "MM/DD/YYYY",
    // custom next/prev icons
    iconNext: '',
    iconPrev: '',
    // set the label of the date input
    inputLabel: 'Set a date',
    // set the placeholder of the date input
    inputPlaceholder: 'Enter a date',
    // hide the input and today button
    hideInputs: false,
    // enable dark mode
    darkMode: false,
    // or 'lite-purple'
    theme: 'unstyled',
    // custom styles here
    styles: `
      button {
        color: orangered
      }
    `,
    // callback
    onChange: (e) => {
      console.log("Selecte date- ",e.detail);
     reqDate = moment(e.detail).format("yyyy-MM-DD");
     getMoments(reqDate);
    },
    onRender: (e) => {
      console.log(e.detail.calendar);
    },
});

    getMoments(reqDate);
  }, [""]);

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <p className="	g-heading font-200 text-left text-4xl uppercase tracking-wider text-blue-900 mb-10">grateful diary</p>
      <div id="calendar"></div>
      <div className=" w-3/5 rounded-xl bg-orange-100 p-6 shadow-lg">
        <div>
          <div className="pb-5 text-left text-m font-medium tracking-wider text-sky-900">I AM GRATEFUL FOR:
            <p className="text-right pb-5 text-sm font-medium text-orange-500">Date:{reqDate}</p>
          </div>
          <Entry  value={firstentry} getEntry={targetvalue => setFirstEntry(targetvalue)}/>
          <Entry value={secondentry} getEntry={targetvalue => setSecondEntry(targetvalue)}/>
          <Entry value={thirdentry} getEntry={targetvalue => setThirdEntry(targetvalue)}/>
        </div>
     </div>
      <button className="text-center mt-10 px-6 py-3 text-m tracking-wide text-rose-600 font-semibold rounded-full border border-rose-200 hover:text-white hover:bg-rose-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-rose-600 focus:ring-offset-2"
     onClick={saveMoments}>record</button>
     {
     (code === 200) &&
      <div class="w-1/2 ml-2 mt-2 bg-green-100 border border-green-400 green-red-700 px-4 py-3 rounded relative" role="alert">
      <span className="block sm:inline">Saved successfully!!</span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
      </span>
</div>
     }
  </div>
  );
}

export default App;