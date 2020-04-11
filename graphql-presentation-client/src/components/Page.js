import React from "react";

const Page = ({ theme, page }) => {

  const font = {
    fontFamily: theme && theme.font ? theme.font.family : "roboto",
    fontSize: theme && theme.font ? theme.font.size : "36px"
  }

  const colors = {
    primary: theme && theme.colour ? theme.colour.primary : "white",
    secondary: theme && theme.colour ? theme.colour.secondary : "white",
    accent: theme && theme.colour ? theme.colour.accent : "black"
  };

  const image = page.image && <Image image={page.image}/>;
  const bulletPoints = page.bulletPoints && page.bulletPoints.length > 0 && <BulletPoints theme={{font: font, colors: colors}} points={page.bulletPoints}/>

  return (
    <div style={{background: colors.secondary, height: "100vh", width: "100%"}}>
      <Header theme={{font: font, colors: colors}} header={page.header}/>
      {bulletPoints}
      {image}
    </div>
  );
};


const BulletPoints = ({theme, points}) => {

  const bulletPointStyle = {
    fontFamily: theme.font.fontFamily,
    fontSize: theme.font.fontSize,
    color: theme.colors.accent,
    background: theme.colors.secondary
  };

  return (<ul style={{padding:" 100px"}}>
            {points.map(point => <BulletPoint key={point} style={bulletPointStyle} text={point}/>)}
         </ul>);
}

const BulletPoint = ({style, text}) =>  <li style={style} >{text}</li>

const Image = ({image}) => (<img style={{width: "100%"}}  alt="whatever" src={`data:image/jpeg;base64,${image}`} />);

const Header = ({theme, header}) => {
  const headerStyle = {
    marginTop: "0px",
    textAlign: "center",
    padding: "10px",
    background: theme.colors.primary,
    color: theme.colors.accent,
    fontFamily: theme.font.fontFamily
  };
  return <h1 style={headerStyle}>{header}</h1>
}



export default Page;
