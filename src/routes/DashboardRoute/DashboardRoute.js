import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import TokenService from '../../services/token-service';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCheckCircle, faTimes, faTimesCircle  } from '@fortawesome/free-solid-svg-icons';

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


    if (this.state.language) {
      languageName = this.state.language.name;
      totalScore = this.state.language.total_score;

    }

    if (this.state.words) {
      this.state.words.forEach((word, i) => {
        words.push(
          <div key={i}>
            <div>{word.original}</div>
            <div>{word.correct_count}</div>
            <div>{word.incorrect_count}</div>
          </div>
        )
      })
    }

    return (
      <>
        <section className="dashboard-header">
          <h2>{languageName}</h2>
          <div>Total Score: {totalScore}</div>
          <Link to="/learn">Start Practicing</Link>
        </section>
        <section>
          <div>
            <div>Words to practice</div>
            {/* Choose the plain or circle icon */}
            <div><FontAwesomeIcon icon={faCheck} /><FontAwesomeIcon icon={faCheckCircle} /></div>
            <div><FontAwesomeIcon icon={faTimes} /><FontAwesomeIcon icon={faTimesCircle} /></div>
          </div>
          <div>
            {words}
          </div>
        </section>
      </>
    );
  }
}

export default DashboardRoute
