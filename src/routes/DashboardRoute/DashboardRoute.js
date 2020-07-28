import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import TokenService from '../../services/token-service';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCheckCircle, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

class DashboardRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: null,
      words: null
    }
  }


  componentDidMount() {
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
    let languageName = '';
    let totalScore = 0;
    let words = [];

    console.log(this.state.words)
    if (this.state.language) {
      languageName = this.state.language.name;
      totalScore = this.state.language.total_score;

    }

    if (this.state.words) {
      this.state.words.forEach((word, i) => {
        words.push(
          {
            key: word.id,
            original: word.original,
            correct_count: word.correct_count,
            incorrect_count: word.incorrect_count
          }
          // <div key={word.id}>
          //   <div>{word.original}</div>
          //   <div>{word.correct_count}</div>
          //   <div>{word.incorrect_count}</div>
          // </div>
        )
      })
    }

    return (
      <>
        <section className="dashboard-header">
          <h2>{languageName}</h2>
          <h4>Total Score: {totalScore}</h4>
        </section>
        <div className="start-practicing">
          <button className="start-practicing-btn"><Link className="start-practicing-link" to="/learn">Start Practicing</Link></button>
        </div>
        <section className="dashboard-grid-wrapper">
          <div className="grid-header">
            <div className="words-to-practice">Words to practice</div>
            {/* Choose the plain or circle icon */}
            <div className="grid-icons"><FontAwesomeIcon icon={faCheck}/><FontAwesomeIcon icon={faTimes}/></div>
          </div>
          <div className="dashboard-grid">
            {console.log(words)}
            {words.map(word =>
              <React.Fragment key={word.key}>
                <span>{word.original}</span>
                <span>{word.correct_count}</span>
                <span>{word.incorrect_count}</span>
              </React.Fragment>
            )}
          </div>
        </section>
      </>
    );
  }
}

export default DashboardRoute
