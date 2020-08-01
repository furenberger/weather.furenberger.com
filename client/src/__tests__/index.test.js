import React from "react";
import ReactDOM from "react-dom";

import App from "../App";
import * as serviceWorker from "../serviceWorker";

jest.mock("react-dom", () => ({ render: jest.fn() }));
jest.mock("../serviceWorker", () => ({ unregister: jest.fn() }));

describe("index.js testing", () => {
  const div = document.createElement("div");
  div.id = "map";

  beforeEach(() => {
    document.body.appendChild(div);
    require("../index.js");
  });

  it("should call ReactDOM.render", () => {
    expect(ReactDOM.render).toHaveBeenCalledWith(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById("map")
    );
  });

  it("should call serviceWorker.unregister", () => {
    expect(serviceWorker.unregister).toHaveBeenCalled();
  });
});
