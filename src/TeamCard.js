import React, { Component } from 'react';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';
import Subheader from 'react-md/lib/Subheaders';
import Dialog from 'react-md/lib/Dialogs';
import FontIcon from 'react-md/lib/FontIcons';
import Avatar from 'react-md/lib/Avatars';

class TeamCard extends Component {
    constructor() {
        super();
        this.state = {  team: {members:[]} , visible:false };
    }

    componentDidMount() {
        fetch('http://localhost:57531/xf-scrumboard-api/api/teams/'+ this.props.id)
        .then(result=>result.json())
        .then(team=>this.setState({team}))
    }

    openDialog = () => {
        this.setState({ visible: true });
    };

    closeDialog = () => {
        this.setState({ visible: false });
    };

    render() {
        const { visible } = this.state;
        return(
            <div className={this.props.className}>
                <List className="md-paper--1">
                    <Subheader primaryText="Team" primary />
                    {
                        this.state.team.members.map( member => {
                            return <ListItem    key={member.id}
                                                leftAvatar={<Avatar icon={<FontIcon>person</FontIcon>} />}
                                                primaryText={member.name}
                                                secondaryText={member.id}
                                                onClick={this.openDialog}/>
                        })
                    }
                </List>

                <Dialog
                    id="simpleDialogExample"
                    visible={visible}
                    title="Simple Title"
                    onHide={this.closeDialog}>
                </Dialog>
            </div>
        );
    }
}


export default TeamCard;