import React, {useState, useEffect} from 'react'
import { gql } from "apollo-boost";
import { useQuery } from '@apollo/react-hooks';
import {Presentation} from './Presentation'
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

const Query = ({ query, setResult}) => {
    const { loading, error, data } = useQuery(query, {fetchPolicy: 'no-cache'});

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :( `${JSON.stringify(error)}`</p>;

    setResult(data)
    const presentations = data.presentation ? [data.presentation] : data.presentations;

    return (
      <>
       {
         presentations.map(pres => {
           const pages = pres.pages
                       ? pres.pages.map(page => {
                           return <>
                                    <ListItem>
                                      <Page theme={pres.theme} page={page}/>
                                    </ListItem>
                                    <Divider />
                                  </>
                         })
                       : "No pages"

           return <ExpansionPanel>
              <ExpansionPanelSummary> Title: {pres.title} </ExpansionPanelSummary>
              <ExpansionPanelDetails>
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

const PageEditor = ({theme}) => {
    const [query, setQuery] = useState(edit)
    const [compiledQuery,setCompiledQuery] = useState()
    const [errorMsg, setErrorMsg] = useState()
    const [lastGoodResult, setLastGoodResult] = useState()
    const [triggerSearch, setTriggerSearch] = useState(false)


    useEffect(() => {
      try {
        let temp = gql`${query}`
        setCompiledQuery(temp)
        setErrorMsg()
      } catch(e) {
        setErrorMsg(e)
      }
    }, [query])

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

    const bulletPoint = {
        fontFamily: "roboto",
        fontSize:   theme ? theme.font.size : "36px",
        color:      theme ? theme.colour.accent : "black",
        background: theme ? theme.colour.secondary : "white"
    }

    const bulletPoints = {
        padding: "100px"
    }

    const border = {
      border: "1px solid black"
    }

    return (
      <div style={container}>
        <h1 style={header}>{JSON.stringify(errorMsg)}</h1>
        { errorMsg || !!!compiledQuery || !triggerSearch
            ? null
            :  <Query query={compiledQuery} setResult={setLastGoodResult}/>
        }
        <div style={centered}>
          <textarea
            onChange={event => setQuery(event.target.value)}
            style={editorStyling}
            value={query}/>
        </div>
        <p onClick={() => setTriggerSearch(true)}>Trigger</p>
      </div>
    )
}
export default PageEditor