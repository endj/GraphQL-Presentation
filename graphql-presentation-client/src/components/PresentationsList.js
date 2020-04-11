import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";

import Page from "./Page";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const PresentationsList = ({ presentations }) => {
  const [expanded, setExpanded] = useState();
  const handleChange = panel => (event, isExpanded) => setExpanded(isExpanded ? panel : false);

  return (
    <>
      {presentations.map(pres => {

        const pages = pres.pages && <Pages theme={pres.theme} pages={pres.pages}/>
        const numberOfPages = pres.meta && pres.meta.numberOfSlides;

        return (
          <ExpansionPanel key={pres.id} expanded={expanded === pres.id} onChange={handleChange(pres.id)} >

            <ExpansionPanelSummary onClick={() => navigator.clipboard.writeText(pres.id)}>
              <PanelText text={`Title: ${pres.title}`} />
              <PanelText text={`Id: ${pres.id}`} />
              { pres.author && (<PanelText text={`Author: ${pres.author.firstName} ${pres.author.lastName}`} /> )}
              { numberOfPages && (<PanelText text={`Number of Slides: ${numberOfPages}`} /> )}
            </ExpansionPanelSummary>

            <ExpansionPanelDetails>
              <div style={{width: "100%"}}>
                <List>{pages}</List>
              </div>
            </ExpansionPanelDetails>

          </ExpansionPanel>
        );
      })}
    </>
  );
};
const Pages = ({theme, pages}) => pages.map(page => <ListItem divider><Page theme={theme} page={page} /></ListItem> );
const PanelText = ({ text }) => <Grid container item xs={3}><p>{text}</p></Grid>

export default PresentationsList
