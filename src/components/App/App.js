import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import Header from '../Header/Header'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import PublicOnlyRoute from '../PublicOnlyRoute/PublicOnlyRoute'
import RegistrationRoute from '../../routes/RegistrationRoute/RegistrationRoute'
import LoginRoute from '../../routes/LoginRoute/LoginRoute'
import DashboardRoute from '../../routes/DashboardRoute/DashboardRoute'
import LearningRoute from '../../routes/LearningRoute/LearningRoute'
import NotFoundRoute from '../../routes/NotFoundRoute/NotFoundRoute'
import './App.css'
import CorrectPage from '../../routes/LearningRoute/CorrectPage'
import IncorrectPage from '../../routes/LearningRoute/IncorrectPage'
import config from '../../config';
import TokenService from '../../services/token-service';
import WordsContext from '../../contexts/WordsContext';
import GuessWordContext from '../../contexts/GuessWordContext';

class App extends Component {
  state = {
    hasError: false,
    word: {},
    guess: '',
  }

  static contextType = WordsContext;

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true, }
  }

  componentDidMount() {
    this.context.updateContext();

    fetch(`${config.API_ENDPOINT}/language/head`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(json => {
        this.setState({ word: json.word });
        console.log(this.state);
      })
      .catch(e => console.log(e));
  }



  handleChange = (value) => {
    this.setState({ guess: value });
  }

  //Handle the submission of user's guess for a word translation
  handleSubmit = (e) => {
    e.preventDefault();

    let guess = {
      wordId: this.state.word.id,
      guess: this.state.guess
    }

    console.log(guess);

    fetch(`${config.API_ENDPOINT}/language/guess`, {
      method: 'POST',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(guess),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(json => {
        console.log(json);
        this.context.updateContext();

        console.log(this.state.word.translation)
        console.log(this.props.history)
        console.log(this.state.guess.toLowerCase())
        if (this.state.guess.toLowerCase() === this.state.word.translation) {
          this.props.history.push('/correct')
        }
        else {
          this.props.history.push('/incorrect')
        }
      })
      .catch(e => console.log(e))
  }



  render() {
    let language = this.context.language
    const { hasError } = this.state
    return (
      <GuessWordContext.Provider
        value={{
          word : this.state.word,
          guess: this.state.guess,
          handleChange: this.handleChange,
          handleSubmit: this.handleSubmit,
          language: language,
          updateContext: this.context.updateContext
        }}
      >
      <div className='App'>
        <Header />
        <main>
          {hasError && (
            <p>There was an error! Oh no!</p>
          )}
          <Switch>
            <PrivateRoute
              exact
              path={'/'}
              component={DashboardRoute}
            />
            <PrivateRoute
              path={'/learn'}
              component={LearningRoute}
            />
            <PrivateRoute
              path={'/correct'}
              component={CorrectPage}
            />  
             <PrivateRoute
              path={'/incorrect'}
              component={IncorrectPage}
            />  
            <PublicOnlyRoute
              path={'/register'}
              component={RegistrationRoute}
            />
            <PublicOnlyRoute
              path={'/login'}
              component={LoginRoute}
            />
            {/* <Route exact path={'/CorrectPage'} component={CorrectPage} /> */}
            <Route
              component={NotFoundRoute}
            />
            
          </Switch>
        </main>
        </div>
        </GuessWordContext.Provider>
    );
  }
}


export default withRouter(App);