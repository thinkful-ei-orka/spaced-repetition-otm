import React, { Component } from 'react';
import './LearningRoute.css';
import { Link } from 'react-router-dom';
import GuessWordContext from '../../contexts/GuessWordContext';


class LearningRoute extends Component {

  static contextType = GuessWordContext;

  componentDidMount() {
    this.context.updateLearningWord();
    // resets the guess to empty
    this.context.handleChange('');
  }

  render() {
    let word = '';
    let correct_count;
    let incorrect_count;
    let total_score;


    if (this.context.word) {
      word = this.context.word.original;
      correct_count = this.context.word.correct_count;
      incorrect_count = this.context.word.incorrect_count;
    }

    if (this.context.language) {
      total_score = this.context.language.total_score;
    }

    return (
      <div>
        <section>
          <h2 className="learning-h2">Translate the word:</h2>
          <div className="word-to-guess">{word}</div>
          <form className="learning-form" onSubmit={e => this.context.handleSubmit(e)}>
            <label className="Label" htmlFor='guess'>What's the translation for this word?</label>
            <input type="text" id="guess" value={this.context.guess} onChange={e => this.context.handleChange(e.target.value)}></input>
            <button className="learning-btn" type="submit">Submit your answer</button>
          </form>
        </section>
        <section className="score-feedback">
          <h3>Your total score is: <span>{total_score}</span></h3>
          <p>
            You have answered this word correctly <span>{correct_count}</span> times.<br /> <br />
            You have answered this word incorrectly <span>{incorrect_count}</span> times.
          </p>
          <Link className="exit-link" to="/"><button className="exit-btn">Exit</button></Link>
        </section>
      </div>
    );
  }
}

export default LearningRoute;



// handleChange = (value) => {
  //   this.setState({ guess: value });
  // }

  // handleSubmit = (e) => {
  //   e.preventDefault();

  //   let guess = {
  //     wordId: this.state.word.id,
  //     guess: this.state.guess
  //   }

  //   console.log(guess);

  //   fetch(`${config.API_ENDPOINT}/language/guess`, {
  //     method: 'POST',
  //     headers: {
  //       'authorization': `bearer ${TokenService.getAuthToken()}`,
  //       'content-type': 'application/json',
  //     },
  //     body: JSON.stringify(guess),
  //   })
  //     .then(res => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //     })
  //     .then(json => {
  //       console.log(json);
  //       this.context.updateContext();

  //       console.log(this.state.word.translation)
  //       console.log(this.props.history)
  //       console.log(this.state.guess.toLowerCase())
  //       if (this.state.guess.toLowerCase() === this.state.word.translation) {
  //         this.props.history.push('/correct')
  //       }
  //       else {
  //         this.props.history.push('/incorrect')
  //       }
  //     })
  //     .catch(e => console.log(e))
  // }

  // componentDidMount() {
  //   this.context.updateContext();

  //   fetch(`${config.API_ENDPOINT}/language/head`, {
  //     headers: {
  //       'authorization': `bearer ${TokenService.getAuthToken()}`,
  //     },
  //   })
  //     .then(res => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //     })
  //     .then(json => {
  //       this.setState({ word: json.word });
  //       console.log(this.state);
  //     })
  //     .catch(e => console.log(e));
  // }


   // if (this.state.guess) {
    //   if (this.state.guess.toLowerCase() === this.state.word.translation) {
    //     return (
    //       <CorrectPage state={this.state} />
    //     )
    //   }
    //   else if (this.state.guess.toLowerCase() !== this.state.word.translation) {
    //     return (
    //       <IncorrectPage />
    //     )
    //   }
    // }
