import { useState ,useCallback ,useEffect ,useRef} from 'react'


function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null); // be defualt the value of passwordRef is null.

  const passwordGenerator = useCallback(()=>{
let pass = "";
let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  
if (numberAllowed){
  str = str + "0123456789";
}  

if(characterAllowed){
  str = str + "@#$`(*)&^%?/}][";
}

for (let i = 1; i <= length; i++) {

  let char = Math.floor(Math.random() * str.length + 1);
  // console.log("string length",str.length);
  // console.log("char: " + char);
  pass = pass +  str.charAt(char);
  // console.log("pass: " + pass);
  
}

setPassword(pass);



   } ,[length,numberAllowed,characterAllowed , setPassword])


   const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
   window.navigator.clipboard.writeText(password); // to copy the password from clipboard using window object(of js).
   }, [password])

useEffect(() =>{
  passwordGenerator();
} ,

[length,characterAllowed,numberAllowed,passwordGenerator])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-600'> 
   <h1 className ="text-white text-center my-3">Password Generator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4 '>


      <input type="text" 
      value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='password'
      readOnly
      ref={passwordRef} // binding the input field to line 12.
      />

<button 
onClick={copyPasswordToClipboard}
className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
    </div>

<div className='flex text-sm gap-x-2'>
  <div className='flex items-center gap-x-1'>

    <input
     type="range"
     min={6} 
     max={100}
     value={length}
     className='cursor-pointer'
     onChange={(e) => {setLength(e.target.value)}}
     />
     <label >Length:{length}</label>
  
  </div>

<div className='flex items-center gap-x-1'>

  <input 
  type="checkbox"
  defaultChecked = {numberAllowed} 
  id='numberInput'
  onClick={(e) => {
   // setNumberAllowed((prev) => !prev);
   // console.log(e.target.checked);
  setNumberAllowed(() => (e.target.checked));
  }}
  />
  <label htmlFor="numberInput">Numbers</label>
</div>

<div className='flex items-center gap-x-1'>

  <input
  type="checkbox"
  defaultChecked = {characterAllowed} 
  id ='characterInput'
 onChange={() =>{
  setCharacterAllowed((prev) => !prev);
 }}
  
  />
  <label htmlFor="characterInput">Characters</label>
</div>


    </div>

    </div>
    </>
  )
}

export default App
