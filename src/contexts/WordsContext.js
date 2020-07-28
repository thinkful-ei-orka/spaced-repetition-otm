import React, { Component } from 'react'

const WordsContext = React.createContext({
  language: null,
  words: null,
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

  setContext = (newContext) => {
    this.setState(newContext)
  }

  render() {
    const value = {
      language: this.state.language,
      words: this.state.words,
      setContext: this.setContext,
    }
    return (
      <WordsContext.Provider value={value}>
        {this.props.children}
      </WordsContext.Provider>
    )
  }
}
