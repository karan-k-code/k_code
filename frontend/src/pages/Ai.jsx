import React, { useState } from 'react'
import { main } from '../components/al-text'

export default function Ai() {

    const [text,setText]=useState()
    const [aitext,setAiText]=useState()
    
    const inputFiled=(e)=>{

        setText(e.target.value)
    }

    const sendFuncation= async()=>{
        const vale = await main(text)
        setAiText(vale)
    }



  return (
    <div>
        <div>
            {aitext}
        </div>

        <div>
            <input type="text" name='text' onChange={inputFiled} />
            <button onClick={sendFuncation}>Send btn</button>
        </div>
      
    </div>
  )
}
