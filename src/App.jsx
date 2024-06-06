import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [numAllowed , setNumAllowed] = useState(false)
  const [charAllowed , setcharAllowed] = useState(false)
  const [Pass, setPass] = useState("")

  const generatePass = useCallback(()=>{
    let pass = ""
    let str = "abcdeghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(numAllowed) str += "1234567890"
    if(charAllowed) str += "!@#$%^&*_-"

    for (let i = 1; i <= length; i++) {
      let charidx = Math.floor((Math.random()*str.length)  + 1)
      pass += str[charidx];
    }
    
    setPass(pass);
  },[length,numAllowed,charAllowed]);

  useEffect(()=>{
    generatePass();
  },[length, numAllowed,charAllowed])

  const passRef = useRef(null);

  const copytoclipboard = useCallback(()=>{
    passRef.current?.select();
    window.navigator.clipboard.writeText(Pass);
  },[Pass])

  return (
    <div className="bg-white border border-gray-400 p-6 max-w-xl mx-auto rounded-3xl shadow-3xl sm:p-4 sm:max-w-xl">
    <label className="block font-mono font-bold text-2xl text-gray-900 mb-2 text-center">
      PASSWORD
    </label>
    <div className="mb-4">
      <div className="mb-4 flex flex-col items-stretch md:flex-row md:items-center">
        <input
          placeholder="password"
          type="text"
          value={Pass}
          readOnly
          ref={passRef}
          className="w-full text-lg mt-1 p-2 border border-gray-300 rounded-lg md:mt-0 md:mb-0"
        />
        <button
          onClick={copytoclipboard}
          className="w-full mt-2 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 sm:w-20 sm:ml-4 sm:mt-0 sm:px-2"
        >
          Copy
        </button>
      </div>
    </div>
    <div className="mb-4 flex flex-col items-start md:flex-row md:items-center">
      <div className="w-full mb-2 md:mb-0">
        <input
          type="range"
          min="5"
          max="25"
          value={length}
          className="cursor-pointer w-full mt-1"
          onChange={(e) => { setlength(e.target.value); }}
        />
      </div>
      <label className=" block text-gray-700 font-bold w-full text-center md:w-full md:text-left md:ml-4 ">
        Length: {length}
      </label>
      <div className="w-full mb-2 md:mb-0 md:ml-5 md: mr-0">
        <label className="inline-flex items-center w-full">
          <input
            type="checkbox"
            defaultChecked={numAllowed}
            onChange={() => { setNumAllowed((prev) => !prev); }}
            className="form-checkbox"
          />
          <span className="ml-2 text-gray-700">Numbers</span>
        </label>
      </div>
      <div className="w-full ml-0">
        <label className="inline-flex items-center w-full">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => { setcharAllowed((prev) => !prev); }}
            className="form-checkbox"
          />
          <span className="ml-2 text-gray-700">Characters</span>
        </label>
      </div>
    </div>
  </div>
  
  )
}

export default App
