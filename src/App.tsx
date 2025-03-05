import { useState, useEffect } from "react";
import Game from "./pages/Game";
import LandingPage from "./pages/LandingPage";

const App = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const savedName = localStorage.getItem("username");
    if (savedName) setUsername(savedName);
  }, []);
  return (
    <>
      {username ? (
        <Game username={username} />
      ) : (
        <LandingPage onLogin={setUsername} />
      )}
    </>
  );
};

export default App;
