import React from "react";

const Page = ({ theme, page }) => {
  const fontSize = theme && theme.font ? theme.font.size : "36px";
  const fontFamily = theme && theme.font ? theme.font.family : "roboto";

  const colors = {
    primary: theme && theme.colour ? theme.colour.primary : "white",
    secondary: theme && theme.colour ? theme.colour.secondary : "white",
    accent: theme && theme.colour ? theme.colour.accent : "black"
  };

  const headerStyle = {
    marginTop: "0px",
    textAlign: "center",
    padding: "10px",
    background: colors.primary,
    color: colors.accent,
    fontFamily: fontFamily
  };

  const container = {
    background: colors.secondary,
    height: "100%",
    width: "100%"
  };

  const bulletPoint = {
    fontFamily: fontFamily,
    fontSize: fontSize,
    color: colors.accent,
    background: colors.secondary
  };


  const image = page.image ? (
    <img style={imageStyle} src={"data:image/jpeg;base64," + page.image} />
  ) : null;

  const bulletPoints =
    page.bulletPoints && page.bulletPoints.length > 0 ? (
      <ul style={bulletPointsStyle}>
        {page.bulletPoints.map(point => (
          <li key={point} style={bulletPoint}>{point}</li>
        ))}
      </ul>
    ) : null;

  return (
    <div style={container}>
      <h1 style={headerStyle}>{page.header}</h1>
      {bulletPoints}
      {image}
    </div>
  );
};

const bulletPointsStyle = {
  padding: "100px"
};

const imageStyle = {
  width: "100%"
};

export default Page;
