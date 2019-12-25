import React, {useState, useEffect} from 'react'
import { gql } from "apollo-boost";
import { useQuery } from '@apollo/react-hooks';
import Page from './Page'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

const edit = `
{
  presentations {
    title
  }
}`

const editorStyling = {
      background: "white",
      color: "black",
      marginLeft: "auto",
      marginRight: "auto",
      width: "auto",
      height: "50vh"
}

const Presentations = ({presentations}) => {
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

           return <ExpansionPanel key={pres.title}>
              <ExpansionPanelSummary> Title: {pres.title} </ExpansionPanelSummary>
              <ExpansionPanelDetails>
              { numberOfPages ? `Number of Slides: ${numberOfPages}` : numberOfPages }
                <List>
                  { pages }
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>
           })
        }
      </>
    )
}

const Query = ({ query, setResult}) => {
    const { loading, error, data } = useQuery(query, {fetchPolicy: 'no-cache'});

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
      <div  style={container}>
       <h1 style={header}>{JSON.stringify(errorMsg)}</h1>
       <div style={flexStyle}>
         <div>
           { errorMsg || !!!compiledQuery || !triggerSearch
               ?  <FallBack data={lastGoodResult}/>
               :  <Query query={compiledQuery} setResult={setLastGoodResult} />
           }
         </div>
         <div>
           <div style={centered}>
             <textarea
               onChange={event => setQuery(event.target.value)}
               style={editorStyling}
               value={query}/>
           </div>
           <button onClick={() => setTriggerSearch(t => !t)}>Trigger</button>
         </div>
       </div>
      </div>
    )
}

const flexStyle = {
    display: "flex",
    justifyContent: "space-evenly"
}

export default PageEditor