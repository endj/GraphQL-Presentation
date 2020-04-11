import React from "react";
import { LIST_ALL_PRESENTATIONS } from "../client/queries";
import { useQuery } from "@apollo/react-hooks";

import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const PresentationSelector = () => {
  const { loading, error, data } = useQuery(LIST_ALL_PRESENTATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <h2>Presentations</h2>
      <div style={{padding: "70px"}}>
        <Grid container spacing={10}>
          <FormattedPresentations presentations={data.presentations} />
        </Grid>
      </div>
    </>
  );
};

const FormattedPresentations = ({presentations}) => {
  const history = useHistory();

  return presentations.map(presentation => (
                   <Grid onClick={() => history.push(`/slide/${presentation.id}`)}
                     container item xs={4} key={presentation.id + presentation.title}>
                     <PresentationItem presentation={presentation} />
                   </Grid>
                 ))
}


const PresentationItem = ({ presentation }) => {
  const { theme } = presentation;

  const colour = {
    primary: !!theme ? theme.colour.primary : "white",
    secondary: !!theme ? theme.colour.secondary : "white",
    accent: !!theme ? theme.colour.accent : "#f3f3f3"
  }

  const infoStyle = {
    padding: "10px",
    minWidth: "300px",
    background: colour.secondary,
    fontFamily: !!theme ? presentation.theme.font.family : "white"
  };

  return (
    <Paper elevation={3}>
      <div style={{background: colour.primary, color: colour.accent, padding:"10px"}}>
        <p>{presentation.title}</p>
      </div>
      <div style={infoStyle}>
       <PresentationInfo author={presentation.author} createdAt={presentation.meta.createdAt} colour={colour}/>
      </div>
    </Paper>
  );
};

const PresentationInfo = ({author, createdAt, colour}) => {

return  <>
          <p style={{color: colour.accent}}>
             Author: {author.firstName} {author.lastName}
          </p>
          <p style={{color: colour.accent}}>Created: {createdAt}</p>
        </>
}

export default PresentationSelector;
