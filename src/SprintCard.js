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

class MemberCard extends Component {
    constructor() {
        super();
        this.state = {  sprint:
                            {
                                id: 1,
                                project:null,
                                release:null,
                                tasks:[]
                            }
                    };

    }


    componentDidMount() {
        fetch('http://localhost:57531/xf-scrumboard-api/api/sprints/'+ this.props.id)
        .then(result=>result.json())
        .then(sprint=>this.setState({sprint}))
    }



    render() {
        let list = null;
        let header = null;
        if (this.state.sprint.tasks != null && this.state.sprint.tasks.length>0) {
            header =  <Subheader primaryText="Tasks"  primary />;
            list = this.state.sprint.tasks.map( task => {
                  return <ListItem  key={task.id} primaryText={task.due}/>
            })
        }

        return(


            <div className={this.props.className}>
                <Card>
                    <CardTitle
                        title={this.state.sprint.id}
                        subtitle={this.state.sprint.release}
                    />
                    <CardActions expander>

                    </CardActions>
                        <div expandable>
                            <List className="md-paper--1">
                                { header }
                                { list }
                            </List>
                        </div>
                </Card>
            </div>
        );
    }
}


export default MemberCard;