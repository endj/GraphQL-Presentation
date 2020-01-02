import React, { useState, useEffect} from 'react'
import { useParams } from "react-router";
import Page from './Page'
import PageEditor from './PageEditor'

import { FIND_PRESENTATION_BY_ID } from '../client/queries'
import { useQuery } from '@apollo/react-hooks';

export const PresentationDataProvider = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(FIND_PRESENTATION_BY_ID, { variables: { id } });

     if (loading) return <p>Loading...</p>;
     if (error) return <p>Error :(</p>;

     return <Presentation presentation={data.presentation}/>
}

const EndOfPresentation = ({theme}) => {
    const container = {
        background: theme.colour.secondary,
        height: "100%",
        width:"100%"
    }
  return <div style={container}></div>
}

export const Presentation = ({presentation}) => {
    const [page,setPage] = useState(0)
    const [showEditor, setShowEditor] = useState(false)

    const onDown = key => {
      if (key === "ArrowRight") setPage(oldPage => oldPage+1)
      if (key === "ArrowLeft") setPage(oldPage => Math.max(oldPage-1,0))
      if (key === "F1") setShowEditor(bool => !bool)
    }

    useEffect(() => {
        window.addEventListener("keydown", e =>  onDown(e.key))
        return () => window.removeEventListener("keydown", onDown)
    }, [])

    const pageToRender = presentation.pages ? presentation.pages[page] : null
    return (
      <>
        {
          showEditor
            ? <PageEditor theme={presentation.theme}/>
            : pageToRender
                  ? <Page theme={presentation.theme} page={pageToRender}/>
                  : <EndOfPresentation theme={presentation.theme}/>
        }
      </>
    )
}

export default Presentation;