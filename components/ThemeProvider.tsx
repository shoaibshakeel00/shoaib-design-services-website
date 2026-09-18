'use client';
import {createContext,useContext,useEffect,useState} from 'react';
type Ctx={dark:boolean;toggle:()=>void}; const C=createContext<Ctx>({dark:true,toggle:()=>{}});
export function ThemeProvider({children}:{children:React.ReactNode}){const [dark,setDark]=useState(true);useEffect(()=>{const saved=localStorage.getItem('theme'); if(saved)setDark(saved==='dark')},[]);useEffect(()=>{document.documentElement.dataset.theme=dark?'dark':'light';localStorage.setItem('theme',dark?'dark':'light')},[dark]);return <C.Provider value={{dark,toggle:()=>setDark(x=>!x)}}>{children}</C.Provider>};
export const useTheme=()=>useContext(C);
