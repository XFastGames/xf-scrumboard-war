import React, { Component } from 'react';
import TaskCard from "./TaskCard";
import ProjectCard from "./ProjectCard";

class Projects extends Component {
    constructor() {
        super();
        this.state = { projects:[] };
    }

    componentDidMount() {
        fetch('http://localhost:57531/xf-scrumboard-api/api/projects/')
            .then(result=>result.json())
            .then(projects=>this.setState({projects}))
    }

    render() {
        return (
          <div className="md-grid">
              {
                  this.state.projects.map( project => {
                      return  <ProjectCard className="md-cell" key={project.id} id={project.id}/>
                  })
              }

          </div>
        );
    }
}


export default Projects;