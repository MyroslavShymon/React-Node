import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import {
  LinksPage,
  CreatePage,
  DetailPage,
  AuthPage,
} from "./components/pages/index";

export const useRoutes = (usAuthenticated) => {
  if (usAuthenticated) {
    return (
      <Switch>
        <Route path="/links" exact>
          <LinksPage />
        </Route>
        <Route path="/create" exact>
          <CreatePage />
        </Route>
        <Route path="/detail/:id">
          <DetailPage />
        </Route>
        <Redirect to="/create" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
