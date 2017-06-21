import React, { Component } from 'react';
import MemberCard from "./MemberCard";

class Members extends Component {
    constructor() {
        super();
        this.state = { members:[] };
    }

    componentDidMount() {
        fetch('http://localhost:57531/xf-scrumboard-api/api/members/')
            .then(result=>result.json())
            .then(members=>this.setState({members}))
    }

    render() {
        return (
          <div className="md-grid">
              {
                  this.state.members.map( member => {
                      return  <MemberCard className="md-cell" key={member.id} id={member.id}/>
                  })
              }

          </div>
        );
    }
}


export default Members;