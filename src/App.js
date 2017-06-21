import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import NavLink from './NavLink';

import Dashboard from './Dashboard';
import Tasks from './Tasks';
import Sprints from './Sprints';
import Projects from './Projects';
import Teams from './Members';
import Register from './Register';


const navItems = [{
  exact: true,
  label: 'Dashboard',
  to: '/',
  icon: 'home',
}, {
  label: 'Tasks',
  to: '/tasks',
  icon: 'assignment',
}, {
  label: 'Sprints',
  to: '/sprints',
  icon: 'donut_large',
}, {
  label: 'Project',
  to: '/projects',
  icon: 'work',
}, {
    label: 'Team',
    to: '/team',
    icon: 'people',
}];

class App extends Component {
  render() {
    return (
      <Route
        render={({ location }) => (
          <NavigationDrawer
            drawerTitle="Scrumboard"
            toolbarTitle="Dashboard"
            navItems={navItems.map(props => <NavLink {...props} key={props.to} />)} >
              <Switch key={location.key}>
                <Route exact path="/" location={location} component={Dashboard} />
                <Route path="/tasks" location={location} component={Tasks} />
                <Route path="/sprints" location={location} component={Sprints} />
                <Route path="/projects" location={location} component={Projects} />
                <Route path="/team" location={location} component={Teams} />
                <Route path="/register" location={location} component={Register} />
              </Switch>
          </NavigationDrawer>
        )}
      />
    );
  }
}

export default App;
