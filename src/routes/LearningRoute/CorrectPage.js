import React from 'react';
import WordsContext from '../../contexts/WordsContext';


export default class CorrectPage extends React.Component {

    static contextType = WordsContext;

    render() {
        console.log(this.context.word)
        return (
            <div>
                
            </div>
        )
    }
}