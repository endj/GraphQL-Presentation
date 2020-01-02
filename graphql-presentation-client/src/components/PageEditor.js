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
import Grid from '@material-ui/core/Grid';

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
              <ExpansionPanelSummary onClick={() => navigator.clipboard.writeText(pres.id)}>
                <Grid container item xs={3}>
                  <p>Title: {pres.title}</p>
                </Grid>
                <Grid container item xs={3}>
                  <p>{ pres.id ? `Id: ${pres.id}` : pres.id}</p>
                </Grid>
                <Grid container item xs={3}>
                  <p>{ pres.author ?  `Author: ${pres.author.firstName} ${pres.author.lastName}` : pres.author}</p>
                </Grid>
                <Grid container item xs={3}>
                  <p>{ numberOfPages ? `Number of Slides: ${numberOfPages}` : numberOfPages }</p>
                </Grid>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
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

    const container = {
        background: theme ? theme.colour.secondary : "white",
        height: "100%",
        width: "100%"
    }

    return (
      <div style={container}>
        {errorMsg ? <h1>{JSON.stringify(errorMsg)}</h1> : null}
        <>
          { errorMsg || !!!compiledQuery
              ?  <FallBack data={lastGoodResult}/>
              :  <Query query={compiledQuery} setResult={setLastGoodResult} />
          }
        </>

        <div style={editorContainer}>

          <div style={halfWidth}>
            <Paper elevation={2}>
             <div style={textContainer}>
               <TextField
                 label="Query Editor"
                 multiline
                 fullWidth
                 value={query}
                 color="secondary"
                 onChange={event => setQuery(event.target.value)}
               />
             </div>
            </Paper>
            <Button variant="outlined" onClick={() => setTriggerSearch(t => !t)}>Trigger</Button>
          </div>

          <div style={halfWidth}>
            <pre style={schemaContainer}>
              {schema}
            </pre>
          </div>

        </div>
      </div>
    )
}

const maxWidth = {
    width:"100%"
}

const halfWidth = {
    width: "50%"
}

const editorContainer = {
    width: "100%",
    display: "flex"
}

const schemaContainer = {
 padding: "20px",
 height: "50vh",
 overflow: "scroll",
 background:"white",
 borderRadius: "5px",
 border: "1px solid black",
 fontSize: "30px"
}
const textContainer = {
    padding: "20px",
    margin: "20px"
}

const schema = `
type Presentation {
    id: ID!
    title: String!
    author: Author
    meta: Meta
    theme: Theme
    pages: [Page]
}

type Page {
    bulletPoints: [String]
    header: String
    image: String
    id: ID!
}

type Author {
    age: Int
    firstName: String
    lastName: String
    id: ID!
}

type Meta {
    createdAt: String
    numberOfSlides: Int
}

type Theme {
    font(theme: FontTheme): Font
    colour(theme: ColourTheme!): Colour
}

type Font {
    family: String
    size: String
    colour: String
}

type Colour {
    primary: String
    secondary: String
    accent: String
}

enum ColourTheme {
    DARK,
    LIGHT,
    GREEN
}

enum FontTheme {
    MONO,
    MONO_LIGHT,
    PRESENTATION,
    PRESENTATION_LIGHT
}

type Query {
    presentations: [Presentation]
    presentation(id: ID!): Presentation!
}
`

export default PageEditor