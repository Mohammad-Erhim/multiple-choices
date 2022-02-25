import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { createBrowserHistory } from "history";
import App from "../App";

import { Provider } from "react-redux";

import { BrowserRouter, Router } from "react-router-dom";
import store, { authActions } from "../store/";
import axios from "axios";

describe("login with no errors", () => {
  test("app  if user do not have token", async () => {
    const history = createBrowserHistory();
    const getSpy = jest.spyOn(axios, "post");

    render(
      <BrowserRouter>
        <Provider store={store}>
          <Router history={history}>
            <App />
          </Router>
        </Provider>
      </BrowserRouter>
    );

    const emailInput = await screen.findByTestId("email-input");
    const passwordInput = await screen.findByTestId("password-input");
    const loginButton = await screen.findByTestId("login-button");

    fireEvent.change(emailInput, {
      target: { value: "test@gmail.com" },
    });
    fireEvent.change(passwordInput, {
      target: { value: "111111" },
    });
       fireEvent.click(loginButton);
  expect(getSpy).toHaveBeenCalledTimes(1);
    await screen.findByTestId("home");
  
    expect(history.location.pathname).toBe("/home");
    getSpy.mockReset();
    getSpy.mockRestore();
  });
});
