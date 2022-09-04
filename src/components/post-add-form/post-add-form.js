import React, {Component} from "react";

import '../post-add-form/post-add-form.css'

export default class PostAddForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
        this.valueChange = this.valueChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    valueChange(event) {
        // event.preventDefault();
        this.setState({
            text: event.target.value
        })
    }

    onSubmit(event) {
        event.preventDefault();
        if (this.state.text !== '') {            
            this.props.onAdd(this.state.text);
            this.setState({
                text: ''
            })
        }        
    }

    render() {
        return (
            <form 
                className="bottom-panel d-flex"
                onSubmit={this.onSubmit}>
                <input
                    type='text'
                    placeholder="О чем вы думаете?"
                    className="form-control new-post-label"
                    onChange={this.valueChange}
                    value={this.state.text}
                />
                <button
                    type="submit"
                    className="btn btn-outline-secondary">
                    Добавить
                </button>
            </form>
        )
    }
}