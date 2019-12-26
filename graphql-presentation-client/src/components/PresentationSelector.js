import React from 'react'
import { LIST_ALL_PRESENTATIONS } from '../client/queries'
import { useQuery } from '@apollo/react-hooks';

import {useHistory} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const PresentationSelector = () => {
  const { loading, error, data } = useQuery(LIST_ALL_PRESENTATIONS);
  const history = useHistory();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <h2>Presentations</h2>
      <div style={containerPadding}>
        <Grid container spacing={10}>
          {
            data.presentations.map(presentation =>
              <Grid
              onClick={() => history.push(`/slide/${presentation.id}`)}
              container item xs={4}
              key={presentation.id + presentation.title}
              >
                <PresentationItem presentation={presentation} />
              </Grid>
            )
          }
        </Grid>
      </div>
    </>
  )
}


const PresentationItem  = ({presentation}) => {
  const hasTheme = !!presentation.theme

  const containerStyle = {
      padding: "10px",
      background: hasTheme ? presentation.theme.colour.primary : "white",
      color: hasTheme ? presentation.theme.colour.accent : "#f3f3f3"
  }

  const infoStyle = {
      padding: "10px",
      minWidth: "300px",
      background: hasTheme ?  presentation.theme.colour.secondary : "white",
      fontFamily: hasTheme ?  presentation.theme.font.family : "white"
  }

  const textStyle = {
    color: hasTheme ? presentation.theme.colour.accent  : "black"
  }

  return (
    <Paper elevation={3}>
      <div style={containerStyle}>
        <p>{ presentation.title }</p>
      </div>
      <div style={infoStyle}>
        <p style={textStyle}>Author: { presentation.author.firstName } {presentation.author.lastName}</p>
        <p style={textStyle}>Created: { presentation.meta.createdAt }</p>
      </div>
    </Paper>
  )
}


const containerPadding = {
    padding: "70px"
}

export default PresentationSelector