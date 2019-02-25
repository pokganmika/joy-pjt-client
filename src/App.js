import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';

import Course from './components/Course/Course';
// import Lecture from './components/Lecture/Lecture';
import Books from './components/Books/Books';
import Book from './components/Book/Book';
import Instructors from './components/Instructors/Instructors';
import Instructor from './components/Instructor/Instructor';
import Topics from './components/Topics/Topics';
import Topic from './components/Topic/Topic';
import Lectures from './components/Lectures/Lectures';
import Lecture from './components/Lecture/Lecture';
import Courses from './components/Course/Course';
import Setting from './components/Setting/Setting';
import NotFound from './components/notFound';
import NavBar from './components/NavBar/NavBar';
import LoginForm from './components/LoginForm/LoginForm';
import Logout from './components/Logout';
import ProtectedRoute from './components/common/ProtectedRoute';
import Movies from './components/Movies/Movies';
import Admin from './components/Admin/Admin';
import MenuAppBar from './components/MenuAppBar/MenuAppBar.jsx';
import auth from './services/authService';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
  state = {};

  componentDidMount = () => {
    console.log('[+] NODE_ENV =', process.env.REACT_APP_NODE_ENV);

    const user = auth.getCurrentUser();
    this.setState({
      user
    });
  };

  render() {
    return (
      <React.Fragment>
        {/* <MenuAppBar user={this.state.user} /> */}
        <NavBar user={this.state.user} />
        <main className="content">
          <Switch>
            {/* <Route path="/register" component={RegisterForm} /> */}
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/admin" exact component={Admin} />
            <ProtectedRoute path="/courses" component={Course} />
            <ProtectedRoute path="/setting" exact component={Setting} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/movies" component={Movies} />
            {/* <Route path="/b/:topic" render={topic => <Books topic={topic} />} /> */}
            <Route path="/t/:topic" render={topic => <Topic topic={topic} />} />
            <Route
              path="/c/:topic"
              render={topic => <Courses topic={topic} />}
            />
            <Route
              path="/l/:topic"
              render={topic => <Lectures topic={topic} />}
            />
            <Route
              path="/i/:topic"
              render={topic => <Instructors topic={topic} />}
            />
            <Route path="/b/:topic" render={topic => <Books topic={topic} />} />
            <ProtectedRoute
              path="/book/:name"
              render={name => <Book name={name} />}
            />
            <ProtectedRoute
              path="/course/:name"
              render={name => <Course name={name} />}
            />
            <ProtectedRoute
              path="/lecture/:name"
              render={name => <Lecture name={name} />}
            />
            <ProtectedRoute
              path="/instructor/:name"
              render={name => <Instructor name={name} />}
            />
            {/* <Route path="/" exact component={Topic} /> */}
            <Route path="/" exact component={Topics} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
