import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/common/Home'
import Navbar from './components/common/Nav'
import Cocktail from './components/cocktails/Cocktail'
import Error from './components/common/Error'
console.log(process.env.REACT_APP_MY_API_KEY)
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="wallPaper">
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route exact path="/cocktail" component={ Cocktail } />
            <Route path="/*" component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  )
}
export default App