// Normally agar aapko data App → Child → GrandChild tak bhejna ho, to props drilling karni padti hai.

// But Context API aapko allow karti hai ki data ko globally share karein:

// Ek context banate ho → createContext()

// Ek provider banate ho → <Context.Provider>

// Phir koi bhi nested component directly data le sakta hai through → useContext(Context)

import { createContext, useState, useEffect } from "react";
import { runChat } from "../config/gemini";

export const Context = createContext(); // return object and object contains two component Provider and Consumer but we mostly use Provider and useContext, Provider is a component which is used to share information globally.

const ContextProvider = (props) => { // if start name with Capital Letter then react treat as Component
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");


  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData(prev => prev + nextWord)
    }, 50 * index)
  }
  
  const newChat = () =>{
    setLoading(false);
    setShowResult(false);

  }
  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if(prompt !== undefined){
      response = await runChat(prompt);
      setRecentPrompt(input);
    }else{
      setPrevPrompt(prev=>[...prev,input]);
      setRecentPrompt(input)
      response = await runChat(input)

    }
   
    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("<br>")
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }

    setLoading(false)
    setInput("")

  };

  // Run only once when app starts
  // useEffect(() => {
  //   onSent("what is react js");
  // }, []);

  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
