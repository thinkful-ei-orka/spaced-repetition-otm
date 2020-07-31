import React from 'react';
import './Feedback.css';
import GuessWordContext from '../../contexts/GuessWordContext';

export default class CorrectPage extends React.Component {

    static contextType = GuessWordContext;



    render() {
        console.log(this.context.word);

        const word = this.context.word;
        const total_score = this.context.language.total_score
        const guess = this.context.guess;

        return (
            <div className="feedback-page-wrapper">
                <h3 className="feedback-header">Congratulations! <br />👏<br />You were correct!</h3>
                <p className="feedback-p">The correct translation for <span>{word.original}</span> was <span>{word.translation}</span> and you chose <span>{guess}</span>!</p>
                <button onClick={() => this.props.history.push('/learn')} className="next-word-btn">Try another word!</button>
                <section className="score-feedback">
                    <h3>Your total score is: <span>{total_score}</span></h3>
                    <p>
                        You have answered this word correctly <span>{word.correct_count}</span> times.<br /> <br />
                        You have answered this word incorrectly <span>{word.incorrect_count}</span> times.
                    </p>
                </section>

            </div>
        )
    }
}