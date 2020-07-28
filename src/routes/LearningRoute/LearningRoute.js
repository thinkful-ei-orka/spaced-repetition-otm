import React, { Component } from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';

import WordsContext from '../../contexts/WordsContext';


class LearningRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: null,
      totalScore: null,
      guess: '',
    }
  }

  static contextType = WordsContext;

  handleChange = (value) => {
    this.setState({guess: value});
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let guess = {
      wordId: this.state.wordId,
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
        this.setState({word: json.word});
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
