import React, { Component } from 'react';
import SprintCard from "./SprintCard";

class Projects extends Component {
    constructor() {
        super();
        this.state = { sprints:[] };
    }

    componentDidMount() {
        fetch('http://localhost:57531/xf-scrumboard-api/api/sprints/')
            .then(result=>result.json())
            .then(sprints=>this.setState({sprints}))
    }

    render() {
        return (
          <div className="md-grid">
              {
                  this.state.sprints.map( sprint => {
                      return  <SprintCard className="md-cell" key={sprint.id} id={sprint.id}/>
                  })
              }

          </div>
        );
    }
}


export default Projects;