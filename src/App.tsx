import React from "react";
import CompanyProvider from "./contexts/CompanyContext";
import Router from "./routes/Router";

function App() {
  return (
    <main>
      <CompanyProvider>
        <Router />
      </CompanyProvider>
    </main>
  );
}

export default App;
