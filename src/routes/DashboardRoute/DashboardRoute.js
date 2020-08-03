import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

import WordsContext from '../../contexts/WordsContext';

class DashboardRoute extends Component {
  static contextType = WordsContext;

  componentDidMount() {
    this.context.updateContext();
  }

  render() {
    let languageName = '';
    let totalScore = 0;
    let words = [];

    if (this.context.language) {
      languageName = this.context.language.name;
      totalScore = this.context.language.total_score;
    }

    if (this.context.words) {
      this.context.words.forEach((word, i) => {
        words.push(
          {
            key: word.id,
            original: word.original,
            correct_count: word.correct_count,
            incorrect_count: word.incorrect_count
          }
        )
      })
    }

    return (
      <section>
        <section className="dashboard-header">
          <h2>{languageName}</h2>
          <h4>Total correct answers: {totalScore}</h4>
        </section>
        <div className="start-practicing">
          <Link className="start-practicing-link" to="/learn"><button className="start-practicing-btn">Start Practicing</button></Link>
        </div>
        <section className="dashboard-grid-wrapper">
          <div className="grid-header">
            <h3 className="words-to-practice">Words to practice</h3>
            <div className="grid-icons"><FontAwesomeIcon icon={faCheck} /><FontAwesomeIcon icon={faTimes} /></div>
          </div>
          <div className="dashboard-grid">
            {words.map(word =>
              <React.Fragment key={word.key}>
                <li><h4>{word.original}</h4></li>
                <li>{word.correct_count}</li>
                <li>{word.incorrect_count}</li>
              </React.Fragment>
            )}
          </div>
        </section>
      </section>
    );
  }
}

export default DashboardRoute
