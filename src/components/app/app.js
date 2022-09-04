import React, {Component} from 'react';

import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import PostStatusFilter from '../post-status-filter/post-status-filter';
import PostList from '../post-list/post-list';
import PostAddForm from '../post-add-form/post-add-form';


import './app.css'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {label: 'Going to learn React', important: true, like: false, id: 1 },
                {label: 'Just something', important: false, like: false, id: 2},
                {label: 'Need a break', important: false, like: false, id: 3},
            ],
            search: '',
            filter: 'all'
        }
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);

        this.maxId = this.state.data.length + 1;
    }

    deleteItem(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);

            const before = data.slice(0, index);
            const after = data.slice(index + 1);

            const newArr = [...before, ...after];

            console.log(data);

            return {
                data: newArr
            }            
        })
    }

    addItem(text) {
        const newItem = {
            label: text,
            important: false,
            like: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    onToggleImportant(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = {...old, important: !old.important};

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {
                data: newArr
            }
        })
    }

    onToggleLiked(id) {        
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = {...old, like: !old.like};

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {
                data: newArr
            }
        })
    }

    searchPost(items, search) {
        if (search.length === 0) {
            return items
        }

        return items.filter((item) => {
            return item.label.indexOf(search) > -1
        })
    }

    updateSearch(search) {
        this.setState({search})
    }

    filterPost(items, filter) {
        if (filter === 'like') {
            return items.filter(item => item.like)
        } else {
            return items
        }
    }

    onFilterSelect(filter) {
        this.setState({filter})
    }

    render() {
        const {data, search, filter} = this.state;

        const allLike = data.filter(item => item.like).length;
        const allPost = data.length;

        const visiblePosts = this.filterPost(this.searchPost(data, search), filter);
        return (
            <div className='app'>
                <AppHeader 
                    allLike = {allLike}
                    allPost = {allPost} />
                <div className='search-panel d-flex'>
                    <SearchPanel 
                        updateSearch = {this.updateSearch} />
                    <PostStatusFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}/>
                </div>
                <PostAddForm
                    onAdd={this.addItem}/>
                <PostList 
                    posts = {visiblePosts} 
                    onDelete = {this.deleteItem}
                    onToggleImportant = {this.onToggleImportant}
                    onToggleLiked = {this.onToggleLiked}/>
            </div>
        )
    }
}