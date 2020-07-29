import React, { Component } from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';
import './LearningRoute.css';

import WordsContext from '../../contexts/WordsContext';

class LearningRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: null,
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
        this.setState({word: json.word});
        console.log(this.state);
      })
      .catch(e => console.log(e));
  }

  render() {
    let word = '';
    let correct_count;
    let incorrect_count;
    let total_score;

    if (this.state.word) {
      word = this.state.word.original;
      correct_count = this.state.word.correct_count;
      incorrect_count = this.state.word.incorrect_count;
    }

    if (this.context.language) {
      total_score = this.context.language.total_score;
    }

    return (
      <div>
        <section>
          <h2 className="learning-h2">Translate the word:</h2>
          <div className="word-to-guess">{word}</div>
          <form className="learning-form" onSubmit={e => this.handleSubmit(e)}>
            <label className="Label" htmlFor='guess'>What's the translation for this word?</label>
            <input type="text" id="guess" value={this.state.guess} onChange={e => this.handleChange(e.target.value)}></input>
            <button className="learning-btn" type="submit">Submit your answer</button>
          </form>
        </section>
        <section className="score-feedback"> 
          <h3>Your total score is: {total_score}</h3>
          <p>
            You have answered this word correctly {correct_count} times.<br/> <br/>
            You have answered this word incorrectly {incorrect_count} times.
          </p>
        </section>
      </div>
    );
  }
}

export default LearningRoute;
