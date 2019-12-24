import React from 'react'

export const Header = ({theme, text}) => {

    const style = {
        background: theme.colour.primary,
        margin:"0px"
    }

    return (
    <h1 style={style}>{text}</h1>
    )
}

export default Header