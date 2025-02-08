import React, { useEffect, useState } from 'react'
import './index.css'
const App = () => {
    const [rollnumber, setRollnumber] = useState(0);
    const [isDisable, setDisbale] = useState(true);
    const [student_data, setData] =useState({});
    const [loading, setLoading] = useState(false);

  const input_handler = (e)=> {
       const value = e.target.value;
      setRollnumber(value);
      if (value <= 0 || value >= 159 || value === null || value === undefined) {
               setDisbale(true)
      } else {
        setDisbale(false)
      }
  }
const fetch_data = async()=> {
  setData({});
  setLoading(true);
  let a = await fetch(`${import.meta.env.VITE_URL}${rollnumber}`, {
    method: "GET",
  });
  let b = await a.json();
  setData(b);
  setLoading(false);
  // console.log(student_data);
  // console.log(b)
}


// useEffect(() => {
//   fetch_data(); 
// }, [rollnumber])


const validate_roll_number = ()=> {
  if (rollnumber > 158 || rollnumber <= 0) {
    alert("Not valid roll number");
  } else {
    // alert('valid');
    fetch_data();
  }
}
const handleKeyPress = (e) => {
  if (e.key === 'Enter' && !isDisable) {
      validate_roll_number();
  }
}
  return (
    <>

    <header className='flex justify-center relative top-10'>
      <h1 className='text-red-700 text-3xl uppercase'>ddu student data</h1>
    </header>

    <br />

    <div className="input flex justify-center align-middle relative top-8">
      {/* <input type="number" min={1} max={158} placeholder='Give me Roll number' className=' border border-emerald-500'/> */}
      <input placeholder="Give me Roll number"  className="capitalize peer border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-80 focus:placeholder:opacity-100 w-56 mx-4" type='number' min={1} max={158} value={rollnumber} onChange={input_handler} onKeyDown={handleKeyPress}/>
{/* 
      <button className={`${isDisable ? "bg-slate-500 cursor-not-allowed opacity-50" : "bg-green-600" }`} onClick={validate_roll_number} disabled={isDisable}>Get Details</button>
      <button
  className={`px-4 py-2 rounded-md text-white ${isDisable ? "bg-gray-400 cursor-not-allowed opacity-50" : "bg-blue-500 hover:bg-blue-600"}`}
  onClick={validate_roll_number}
  disabled={isDisable}
>
  {isDisable ? "Disabled Button" : "Active Button"}
</button> */}
<button
  className={`px-2 m-2 py-2 rounded-lg text-white font-semibold ${isDisable ? "bg-gray-300 cursor-not-allowed opacity-50" : "bg-green-500 hover:bg-green-600"}`}
  onClick={validate_roll_number}
  disabled={isDisable}
>
  {isDisable ? "Disabled Button" : "Get Details"}
</button>


    </div>

    <div className="main flex justify-center relative top-24">

      <div className="card flex-col bg-gray-700 p-2 text-green-400 rounded-md w-1/2 sm:w-3/4 mx-5 my-5">
          <div className="flex-item mx-2 my-2 capitalize">{loading ? 'fetching data ...' : student_data.find && student_data.find.name ? `Name : ${student_data.find.name}` : 'waiting for input'}</div>
          <div className="flex-item mx-2 my-2 capitalize">{loading ? 'fetching data ...' : student_data.find && student_data.find.rollNumber ? `Roll Number : ${student_data.find.rollNumber}` : 'waiting for input'}</div>
          <div className="flex-item mx-2 my-2 capitalize">{loading ? 'fetching data ...' : student_data.find && student_data.find.id ? `ID : ${student_data.find.id}` : 'waiting for input'}</div>
      </div>

    </div>
    </>
  )
}

export default App
