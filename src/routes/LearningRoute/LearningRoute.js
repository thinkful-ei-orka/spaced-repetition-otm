import React, { Component } from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';


class LearningRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: ''
    }
  }

  handleChange = (value) => {
    this.setState({word: value});
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let guess = {
      word: this.state.word
    }

    fetch(`${config.API_ENDPOINT}/api/language/guess`, {
      method: 'POST',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json',

      },
      body: JSON.stringify(guess),
    })
      .then(res => console.log(res))
      .catch(e => console.log(e))
  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/api/language/head`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res => console.log(res))
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
            <input type="text" id="guess" value={this.state.word} onChange={e => this.handleChange(e.target.value)}></input>
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
