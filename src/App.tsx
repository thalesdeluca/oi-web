import React from "react";
import StoreProvider from "./components/StoreProvider";
import CompanyProvider from "./contexts/CompanyContext";
import Router from "./routes/Router";

function App() {
  return (
    <main>
      <CompanyProvider>
        <StoreProvider>
          <Router />
        </StoreProvider>
      </CompanyProvider>
    </main>
  );
}

export default App;
