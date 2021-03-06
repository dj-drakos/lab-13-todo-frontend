import React, { Component } from 'react'
import { getTodos, createTodo, completeTodo } from './fetch-utils.js';

export default class Todos extends Component {

    //set state
    state = {
        todos: [],
        todo: ''
    }

    //mount component
    componentDidMount = async () => {
        await this.newFetch()
    }

    //new fetch 
    newFetch = async () => {
        const todos = await getTodos(this.props.token);
        this.setState({ todos: todos })
    }
    //onchange handler
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value});
    }

    //submit handler
    handleSubmit = async e => {
        e.preventDefault();
        await createTodo(this.state.todo, this.props.token);
        await this.newFetch();
    }
    
    render() {
        console.log(this.state);
        return (
            <div>
                TODOs page

                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" name="todo" onChange={this.handleChange} placeholder="new to-do" />
                    </label>
                    <button>Submit</button>
                </form>

                {this.state.todos.map(
                    item => {
                    return <li 
                    className={item.completed ? 'complete' : 'incomplete' } 
                    key={item.id} 
                    onClick={
                        async () => {
                        await completeTodo(item.id, this.props.token)
                        await this.newFetch()
                    }}>
                        {item.todo}
                    </li>
                })
                }
                
            </div>
        )
    }
}
