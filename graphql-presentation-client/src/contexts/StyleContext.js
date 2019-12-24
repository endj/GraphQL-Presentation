import React, { useState, createContext } from 'react'

const DEFAULT_STYLE = {}
export const StyleContext = createContext(DEFAULT_STYLE)

const StyleContextProvider = ({children}) => {
    const [style, setStyle] = useState(DEFAULT_STYLE)

    return (
      <StyleContext.Provider value={{style:style, setStyle: setStyle}}>
        { children }
      </StyleContext.Provider>
    )
}

export default StyleContextProvider