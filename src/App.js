import React from 'react'
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Summary from './pages/SummaryPage'
import Details from './pages/DetailsPage'
import Header from './components/Header'
import { WatchListContextProvider } from './context/WatchListContext';


function App() {
  return(
    <div className="container">
      <WatchListContextProvider>
      <BrowserRouter>
      <Header />
      <Route exact path='/' component={Summary}/>
      <Route path='/coins/:id' component={Details}/>
      </BrowserRouter>
      </WatchListContextProvider>
    </div>
  )
}

export default App;
