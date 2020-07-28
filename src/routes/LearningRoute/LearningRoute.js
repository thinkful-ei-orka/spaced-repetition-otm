import React, { Component } from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';


class LearningRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      original: '',
      // is the translation pulled upon guessing or on pulling the word?
      translation: '',
      // is next important?
      // next: null
      correct_count: null,
      incorrect_count: null,
      totalScore: null,
      guess: '',
    }
  }

  handleChange = (value) => {
    this.setState({guess: value});
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let guess = {
      guess: this.state.guess
    }

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
      })
      .catch(e => console.log(e))
  }

  componentDidMount() {
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
        console.log(json);
      })
      .catch(e => console.log(e));
  }

  render() {
    return (
      <>
        <section>
          <h2>Translate the word:</h2>
          <div>Bonjour</div>
          <form onSubmit={e => this.handleSubmit(e)}>
            <label className="Label" htmlFor='guess'>What's the translation for this word?</label>
            <input type="text" id="guess" value={this.state.guess} onChange={e => this.handleChange(e.target.value)}></input>
            <button type="submit">Submit your answer</button>
          </form>
        </section>
        <section>
          <h3>Your total score is: 5000</h3>
          <p>
            You have answered this word correctly 123 times.
            You have answered this word incorrectly 123 times.
          </p>
        </section>
      </>
    );
  }
}

export default LearningRoute
