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
        this.state = {  member:
                        {
                            id: 1,
                            name:"",
                            email:"",
                            verified:false,
                            assignedTasks:[]
                        }
                    };
        this._openDialog = this._openDialog.bind(this);
        this._closeDialog = this._closeDialog.bind(this);
        this.changeComplete = this.changeComplete.bind(this);
    }

    changeComplete(){
        var task = this.state.task;
        task.complete = !task.complete;
        this.setState({task});
        this._save();
    }

    componentDidMount() {
        fetch('http://localhost:57531/xf-scrumboard-api/api/members/'+ this.props.id)
        .then(result=>result.json())
        .then(member=>this.setState({member}))
    }

    _openDialog(e) {
        let { pageX, pageY } = e;
        if (e.changedTouches) {
            const [touch] = e.changedTouches;
            pageX = touch.pageX;
            pageY = touch.pageY;
        }
        this.setState({ visible: true, pageX, pageY });
    }

    _closeDialog() {
        this.setState({ visible: false });
    }


    render() {
        let list = null;
        let header = null;
        if (this.state.member.assignedTasks != null && this.state.member.assignedTasks.length>0) {
            header =  <Subheader primaryText="Doing tasks"  primary />;
            list = this.state.member.assignedTasks.map( task => {
                  return <ListItem  key={task.id} leftAvatar={<Avatar icon={<FontIcon>clone</FontIcon>} />} primaryText={task.name}/>
            })
        }

        return(


            <div className={this.props.className}>
                <Card>
                    <CardTitle
                        title={this.state.member.name}
                        subtitle={this.state.member.email}
                    />
                    <CardActions expander>
                        { (this.state.member.verified) ?
                            <Chip   label="verified"
                                    avatar={<Avatar icon={<FontIcon>check</FontIcon>} />}
                                    expander/>
                            : null }
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