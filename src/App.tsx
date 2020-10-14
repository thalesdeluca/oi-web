import React from "react";
import StoreProvider from "./components/StoreProvider";
import Router from "./navigation/Router";

function App() {
  return (
    <main>
      <StoreProvider>
        <Router />
      </StoreProvider>
    </main>
  );
}

export default App;
