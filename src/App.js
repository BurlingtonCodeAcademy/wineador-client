import { useEffect, useState } from 'react';
import './App.css';
import Auth from './components/Auth/Auth';
import CreateWine from './components/CreateWine';

function App() {

  const [ sessionToken, setSessionToken ] = useState(undefined)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"))
    }
  })

  const updateLocalStorage = newToken => {
    localStorage.setItem("token", newToken)
    setSessionToken(newToken)
  }

  const viewConductor = () => {
    return sessionToken !== undefined ?
    <CreateWine sessionToken={sessionToken} /> : <Auth updateLocalStorage={updateLocalStorage} />
  }

  // Logout functionality
  const logout = () => {
    localStorage.clear()
    setSessionToken(undefined)
  }

  return (
    <>
    <nav><div onClick={logout}>Logout</div></nav>
    {viewConductor()}
    </>
  );
}

export default App;
