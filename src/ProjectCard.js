import React, { Component } from 'react';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import Chip from 'react-md/lib/Chips';
import Subheader from 'react-md/lib/Subheaders';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';
import FontIcon from 'react-md/lib/FontIcons';
import Avatar from 'react-md/lib/Avatars';
import Divider from 'react-md/lib/Dividers';
import Button from 'react-md/lib/Buttons/Button';

class ProjectCard extends Component {
    constructor() {
        super();
        this.state = {  project:
                        {
                            name:"" ,
                            release:null,
                            sprints: [],
                            team: []
                        }
                    };
        this._save = this._save.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:57531/xf-scrumboard-api/api/projects/'+ this.props.id)
        .then(result=>result.json())
        .then(project=>this.setState({project}))
    }


    _save(){
        alert("saving!");
        fetch('http://localhost:57531/xf-scrumboard-api/api/projects/'+ this.props.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.task)})
            .then( function(data){

            })
    }

    _delete(){
        fetch('http://localhost:57531/xf-scrumboard-api/api/tasks/'+ this.props.id, {
            method: 'DELETE',
        })
    }


    render() {
        const nav = <Button icon onClick={this._closeDialog}>close</Button>;
        const action = <Button flat label="Save" onClick={this._save} />;
        return(
            <div className={this.props.className}>
                <Card>
                    <CardTitle
                        title={this.state.project.name}
                    />
                    <CardActions expander>
                        <Chip label={new Date(this.state.project.release).toDateString()} />
                        { (this.state.project.sprints.length>0) ?
                            <Chip   label={this.state.project.sprints.length}
                                    avatar={<Avatar icon={<FontIcon>donut_large</FontIcon>} />}
                                    expander/>
                            : null }
                    </CardActions>
                        <div expandable>
                            <List className="md-paper--1">
                                { (this.state.project.sprints.length>0) ?
                                    <Subheader primaryText="Assigned to"  primary />
                                 : null }
                                {
                                    this.state.project.sprints.map( sprint => {
                                        return <ListItem    key={sprint.id}
                                                            primaryText={sprint.release}/>
                                    })
                                }
                                <Divider inset />
                                <div className="md-grid">
                                    <Button className="md-cell" primary icon onClick={this._openDialog}>edit</Button>
                                    <Button className="md-cell" secondary icon>delete</Button>
                                </div>
                            </List>
                        </div>
                </Card>
            </div>
        );
    }
}


export default ProjectCard;