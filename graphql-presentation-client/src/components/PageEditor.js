import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { SCHEMA } from "../client/schema";
import { parse } from "graphql/language";
import { validate } from "graphql/validation";
import { buildASTSchema } from "graphql";
import PresentationsList from './PresentationsList'


const Query = ({ query, setResult }) => {
  const { loading, error, data } = useQuery(query, { fetchPolicy: "no-cache" });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( `${JSON.stringify(error)}`</p>;

  setResult(data);

  const presentations = data.presentation
    ? [data.presentation]
    : data.presentations;

  return <PresentationsList presentations={presentations} />;
};

const FallBack = ({ data }) => {
  return (
    <PresentationsList
      presentations={
        data.presentation ? [data.presentation] : data.presentations
      }
    />
  );
};

const validationSchema = buildASTSchema(
  gql`
    ${SCHEMA}
  `
);
const isValidQuery = query => !validate(validationSchema, query).length;

const PageEditor = ({ theme }) => {
  const [query, setQuery] = useState("");
  const [compiledQuery, setCompiledQuery] = useState();
  const [invalidQuery, setInvalidQuery] = useState(true);
  const [lastGoodResult, setLastGoodResult] = useState();

  useEffect(() => {
    try {
      const parsedQuery = parse(query);

      if (isValidQuery(parsedQuery)) {
        try {
          setCompiledQuery(
            gql`
              ${query}
            `
          );
          setInvalidQuery(false);
        } catch (e) {
          setInvalidQuery(true);
        }
      }
    } catch (e) {
      setInvalidQuery(true);
    }
  }, [query]);

  const container = {
    background: theme ? theme.colour.secondary : "white",
    height: "100vh",
    width: "100%"
  };

  return (
    <div style={container}>
      {
      invalidQuery || !!!compiledQuery
        ? (lastGoodResult && <FallBack data={lastGoodResult} />)
        : (<Query query={compiledQuery} setResult={setLastGoodResult} />)
      }

      <div style={{width: "100%", display: "flex"}}>
        <EditorWindow error={invalidQuery} value={query} setQuery={setQuery}/>
        <SchemaWindow/>
      </div>
    </div>
  );
};

const EditorWindow = ({error, value, setQuery}) => {
     return  <div style={{width: "50%"}}>
          <Paper elevation={2}>
            <div style={{padding: "20px",margin: "20px"}}>
              <TextField
                label="Query Editor"
                multiline
                fullWidth
                error={error}
                value={value}
                color="primary"
                onChange={event => setQuery(event.target.value)}
              />
            </div>
          </Paper>
        </div>
}

const SchemaWindow = () => <div style={{width: "50%"}}><pre style={schemaContainer}>{SCHEMA}</pre></div>

const schemaContainer = {
  padding: "20px",
  height: "90vh",
  overflow: "scroll",
  background: "white",
  borderRadius: "5px",
  border: "1px solid black",
  fontSize: "22px"
};

export default PageEditor;
