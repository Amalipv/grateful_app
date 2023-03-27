import React, {useState} from 'react'
import "./app.css";
function Entry(props) {
  const [gentry, setGentries] = useState();

   const handleChange = event => {
    console.log("in handleChange");
    console.log(event.target.value);
    setGentries();
    //console.log("entry is ",entries+" "+tmpEntries);
  }

  return (
    <div>
      
      <input type="text"  onChange={() => props.getEntry(event.target.value)} value={props.value} className="clr-input text-rose-600	 text-sm   mb-2 w-full border-b-2 border-dotted border-lime-700 bg-inherit hover:border-dotted" />{}
    </div>
    
  )
}

export default Entry