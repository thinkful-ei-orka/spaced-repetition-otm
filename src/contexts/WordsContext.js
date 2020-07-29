import React, { Component } from 'react'
import config from '../config';
import TokenService from '../services/token-service';

const WordsContext = React.createContext({
  language: null,
  words: null,
  updateContext: () => {},
  setContext: () => {},
})

export default WordsContext

export class WordsProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      language: null,
      words: null
    }
  }

  updateContext = () => {
    fetch(`${config.API_ENDPOINT}/language`, {
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
        this.setState({
          language: json.language,
          words: json.words
        })
      })
      .catch(e => console.log(e));
  }

  render() {
    const value = {
      language: this.state.language,
      words: this.state.words,
      updateContext: this.updateContext,
    }
    return (
      <WordsContext.Provider value={value}>
        {this.props.children}
      </WordsContext.Provider>
    )
  }
}
