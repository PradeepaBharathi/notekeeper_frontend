import { createContext, useContext, useState } from "react";


const ThemeContext = createContext()

export const ThemeProvider = ({children})=>{
    const [darktheme,setdarkTheme] = useState("light")

    const toggleTheme=()=>{
        setdarkTheme(  ((prevTheme) => prevTheme=='light' ?"dark" :"light"))
    }
  

    return (
        <ThemeContext.Provider value={{ darktheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useThemeContext =()=>{
    return useContext(ThemeContext)
}