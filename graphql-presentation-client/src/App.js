import React from "react";
import PresentationSelector from "./components/PresentationSelector";
import { PresentationDataProvider } from "./components/Presentation";
import DataProvider from "./contexts/DataProvider";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export const App = () => {
  return (
    <DataProvider>
    <div >
      <Router>
        <Switch>
          <Route path="/slide/:id">
            <PresentationDataProvider />
          </Route>
          <Route path="/">
            <PresentationSelector />
          </Route>
        </Switch>
      </Router>
      </div>
    </DataProvider>
  );
};

export default App;
