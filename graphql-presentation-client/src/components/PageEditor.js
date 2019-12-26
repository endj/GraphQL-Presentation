import React, { useState, useEffect } from 'react'
import { gql } from "apollo-boost";
import { useQuery } from '@apollo/react-hooks';
import Page from './Page'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

const edit = `
{
  presentations {
    title
    id
  }
}`

const Presentations = ({presentations}) => {
    const [expanded, setExpanded] = useState(false)

    const handleChange = panel => (event, e) => {
      setExpanded(e ? panel : false);
    };

    return (
      <>
       {
         presentations.map(pres => {
           const pages = pres.pages
             ? pres.pages.map(page => {
               return (
                   <>
                     <ListItem>
                       <Page theme={pres.theme} page={page}/>
                     </ListItem>
                     <Divider />
                   </>
                 )
               })
             : null

           const numberOfPages = pres.meta ? pres.meta.numberOfSlides : null

           return <ExpansionPanel key={pres.id}  expanded={expanded === pres.id} onChange={handleChange(pres.id)}>
              <ExpansionPanelSummary>
                <div style={flexEvenly}>
                  <p>Title: {pres.title}</p>
                  <p>{ pres.id ? `Id: ${pres.id}` : pres.id}</p>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <p>{ numberOfPages ? `Number of Slides: ${numberOfPages}` : numberOfPages }</p>
                <div style={maxWidth}>
                  <List>
                    { pages }
                  </List>
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>

        })
        }
      </>
    )
}

const Query = ({ query, setResult }) => {
    const { loading, error, data } = useQuery(query, { fetchPolicy: 'no-cache' });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( `${JSON.stringify(error)}`</p>;

    setResult(data)
    const presentations = data.presentation ? [data.presentation] : data.presentations;

    return <Presentations presentations={presentations}/>
}

const FallBack = ({data}) => {
    if(!data) return null
    return <Presentations presentations={data.presentation ? [data.presentation] : data.presentations}/>
}

const PageEditor = ({theme}) => {
    const [query, setQuery] = useState(edit)
    const [compiledQuery,setCompiledQuery] = useState()
    const [errorMsg, setErrorMsg] = useState()
    const [lastGoodResult, setLastGoodResult] = useState()
    const [triggerSearch, setTriggerSearch] = useState(false)

    useEffect(() => {
      try {
        setCompiledQuery(gql`${query}`)
        setErrorMsg()
      } catch(e) {
        setErrorMsg(e)
      }
    }, [triggerSearch])

    const header = {
        marginTop: "0px",
        textAlign: "center",
        padding: "10px",
        background: theme ? theme.colour.primary : "white",
        color: theme ?  theme.colour.accent : "black"
    }

    const container = {
        background: theme ? theme.colour.secondary : "white",
        height: "100%"
    }

    const centered = {
        marginLeft: "auto",
        marginRight: "auto"
    }

    return (
      <div style={container}>
       <h1 style={header}>{JSON.stringify(errorMsg)}</h1>
       <div style={flexStyle}>
         <div style={wide}>
           { errorMsg || !!!compiledQuery
               ?  <FallBack data={lastGoodResult}/>
               :  <Query query={compiledQuery} setResult={setLastGoodResult} />
           }
         </div>
         <div>
           <div style={centered}>
            <Paper elevation={2}>
             <div style={textContainer}>
               <TextField
                 label="Query Editor"
                 multiline
                 value={query}
                 color="secondary"
                 onChange={event => setQuery(event.target.value)}
               />
             </div>
             </Paper>
           </div>
           <Button variant="outlined" onClick={() => setTriggerSearch(t => !t)}>Trigger</Button>
         </div>
       </div>
      </div>
    )
}
const wide = {
    width:"75%"
}

const maxWidth = {
    width:"100%"
}

const textContainer = {
    padding: "20px",
    margin: "20px"
}

const flexStyle = {
    display: "flex",
    justifyContent: "space-around",
    width: "100%"
}

const flexEvenly = {
        display: "flex",
        justifyContent: "space-between",
        width: "100%"
}

export default PageEditor