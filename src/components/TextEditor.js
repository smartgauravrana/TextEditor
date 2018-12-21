import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import {BoldMark, ItalicMark } from './index';

const initialValue = Value.fromJSON({
    document: {
      nodes: [
        {
          object: 'block',
          type: 'paragraph',
          nodes: [
            {
              object: 'text',
              leaves: [
                {
                  text: 'A line of text in a paragraph.',
                },
              ],
            },
          ],
        },
      ],
    },
  });

export default class TextEditor extends Component {   
    state = {
        value: initialValue,
    };

    onKeyDown = (e, change) => {
        if(!e.ctrlKey) { return ; }
        e.preventDefault();

        switch(e.key) {
            case 'b': {
                change.toggleMark('bold')
                return true;
            }

            case 'i': {
                change.toggleMark('italic')
                return true;
            }

            default: {
                return;
            }
        }

    }

    renderMark = props => {
        switch(props.mark.type){
            case 'bold': 
                return <BoldMark {...props} />

            case 'italic': 
                return <ItalicMark {...props} />
        }
    }

    //On change, update the app's react state with the new editor value
    onChange = ({value}) => {
        this.setState({ value });
    }

    render() {
        return (
            <Editor 
                value={this.state.value} 
                onChange={this.onChange}
                onKeyDown={this.onKeyDown}
                renderMark={this.renderMark}/>
        );
    }
}