import React from "react";
import { CardWithForm } from "./components/CardWithForum";

export default function App() {
  return (
    <>
      <React.Fragment>
        <h1 className="text-5xl text-center font-medium m-3 mb-4">Card Demo</h1>
        <CardWithForm />
      </React.Fragment>
    </>
  );
}
