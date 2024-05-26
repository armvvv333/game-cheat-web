import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Categories from './components/Categories';
import Cheats from './components/Cheats';
import Login from './components/Login';
import CategoryForm from './components/CategoryForm';
import CheatForm from './components/CheatForm';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Categories} />
          <Route path="/category/:id" component={Cheats} />
          <Route path="/login" component={Login} />
          <Route path="/category-form/:id?" component={CategoryForm} />
          <Route path="/cheat-form/:id?" component={CheatForm} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
