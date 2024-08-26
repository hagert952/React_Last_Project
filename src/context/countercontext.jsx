import { data } from "autoprefixer";
import { createContext, useState } from "react";

export let CounterContext=createContext()
export default function CounterContextProvider(){
const [counter, setcounter]=useState(0)
   
   function changecounter(){
    setcounter(Math.random)
   }
   return<CounterContext.Provider value={data}>

    </CounterContext.Provider>
}