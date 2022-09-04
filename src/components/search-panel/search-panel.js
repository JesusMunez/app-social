import React, {Component} from "react";

import '../search-panel/search-panel.css'

export default class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
        this.onUpdateSearch = this.onUpdateSearch.bind(this)
    }

    onUpdateSearch(e) {
        const search = e.target.value;
        this.setState({search});
        this.props.updateSearch(search);
    }
    render() {
        return (
            <input
                className="form-control search-input"
                type='text'
                placeholder="Поиск по записям"
                onChange={this.onUpdateSearch}
            />
        )
    }
}