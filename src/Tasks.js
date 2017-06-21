import React, { Component } from 'react';
import TaskCard from "./TaskCard";

class Tasks extends Component {
    constructor() {
        super();
        this.state = { tasks:[] };
    }

    componentDidMount() {
        fetch('http://localhost:57531/xf-scrumboard-api/api/tasks/')
            .then(result=>result.json())
            .then(tasks=>this.setState({tasks}))
    }

    render() {
        return (
          <div className="md-grid">
              {
                  this.state.tasks.map( task => {
                      return  <TaskCard className="md-cell" key={task.id} id={task.id}/>
                  })
              }

          </div>
        );
    }
}


export default Tasks;