import React, { Component, Fragment } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import {BoldMark, CodeMark, ItalicMark, FormatToolbar, ListMark, UnderlineMark } from './index';

import Icon from 'react-icons-kit';
import { bold, italic, code, list, underline } from 'react-icons-kit/feather';

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

    onKeyDown = (e, editor) => {
        this.editor = editor;

        if(!e.ctrlKey) { return ; }
        e.preventDefault();

        switch(e.key) {
            case 'b': {
                editor.toggleMark('bold')
                return true;
            }

            case 'i': {
                editor.toggleMark('italic')
                return true;
            }

            case 'c':
            editor.toggleMark('code');
            return true;
        
            case 'l':
                editor.toggleMark('list');
                return true;
            
            case 'u':
                editor.toggleMark('underline');
                return true;

            default: {
                return true;
            }
        }

    }

    renderMark = props => {
        switch(props.mark.type){
            case 'bold': 
                return <BoldMark {...props} />

            case 'italic': 
                return <ItalicMark {...props} />

            case 'code':
                return <CodeMark {...props} />
            case 'list':
                return <ListMark {...props} />
            case 'underline':
                return <UnderlineMark {...props} />

            default :
                return props;
        }
    }

    //On editor, update the app's react state with the new editor value
    onChange = ({value}) => {
        this.setState({ value });
    }

    onMarkClick = (e, type) => {
        e.preventDefault();

        if (this.editor) {
            this.editor.toggleMark(type);
        }
    }

    render() {
        return (
            <Fragment>
                <FormatToolbar>
                    <button 
                        className="tooltip-icon-button"
                        onPointerDown={(e) => this.onMarkClick(e, 'bold')}>
                        <Icon icon={bold} />
                    </button>
                    <button 
                        className="tooltip-icon-button"
                        onPointerDown={(e) => this.onMarkClick(e, 'italic')}>
                        <Icon icon={italic} />
                    </button>
                    <button
                        className="tooltip-icon-button"
                        onClick={(e) => this.onMarkClick(e, 'code')}
                    >
                        <Icon icon={code} />
                    </button>
                    <button
                        className="tooltip-icon-button"
                        onClick={(e) => this.onMarkClick(e, 'list')}
                    >
                        <Icon icon={list} />
                    </button>
                    <button
                        className="tooltip-icon-button"
                        onClick={(e) => this.onMarkClick(e, 'underline')}
                    >
                        <Icon icon={underline} />
                    </button>
                </FormatToolbar>
            
                <Editor 
                    value={this.state.value}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    renderMark={this.renderMark}/>
            </Fragment>
        );
    }
}