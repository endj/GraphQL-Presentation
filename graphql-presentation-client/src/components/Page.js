import React from 'react'

const Page = ({theme, page}) => {

    let fontSize = theme && theme.font ? theme.font.size : "36px"
    let colors = {
        primary: theme ? theme.colour.primary : "white",
        secondary: theme ?  theme.colour.secondary : "white",
        accent: theme ? theme.colour.accent : "black"
    }

    const headerStyle = {
      marginTop: "0px",
      textAlign: "center",
      padding: "10px",
      background: colors.primary,
      color: colors.accent
    }

    const container = {
        background: colors.secondary,
        height: "100%"
    }

    const bulletPoint = {
        fontFamily: "roboto",
        fontSize:   fontSize,
        color:      colors.accent,
        background: colors.secondary
    }

    const bulletPointsStyle = {
        padding: "100px"
    }

    const header = page.header ? <h1 style={headerStyle}>{page.header}</h1> : null;
    const bulletPoints = page.bulletPoints
                          ? <ul style={bulletPointsStyle}>
                              {page.bulletPoints.map(point => <li style={bulletPoint} key={point}>{point}</li>)}
                            </ul>
                          : null;

    return (
      <div style={container}>
        {header}
        {bulletPoints}
      </div>
    )
}

export default Page