import React, { useState, useEffect} from 'react'
import {useParams} from "react-router";
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

export const Presentation = ({presentation}) => {
    const [page,setPage] = useState(0)

    const onDown = (key) => {
      if (key === "ArrowRight") setPage(page => page+1)
      if (key === "ArrowLeft") setPage(page => Math.max(page-1,0))
    }

    useEffect(() => {
        window.addEventListener("keydown", e =>  onDown(e.key))
        return () => window.removeEventListener("keydown", onDown)
    }, [])

    const pageToRender = presentation.pages ? presentation.pages[page] : null
    return (
      <>
        {
        pageToRender
          ? <Page theme={presentation.theme} page={pageToRender}/>
          : <PageEditor theme={presentation.theme}/>
        }
      </>
    )
}

export default Presentation;