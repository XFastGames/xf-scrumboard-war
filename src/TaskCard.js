import React, { Component } from 'react';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import Chip from 'react-md/lib/Chips';
import SelectionControl from 'react-md/lib/SelectionControls/SelectionControl';
import Subheader from 'react-md/lib/Subheaders';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';
import FontIcon from 'react-md/lib/FontIcons';
import Avatar from 'react-md/lib/Avatars';
import Divider from 'react-md/lib/Dividers';
import Dialog from 'react-md/lib/Dialogs';
import TextField from 'react-md/lib/TextFields';
import Toolbar from 'react-md/lib/Toolbars';
import Button from 'react-md/lib/Buttons/Button';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';

class TaskCard extends Component {
    constructor() {
        super();
        this.state = {  task:
                        {
                            description:"" ,
                            visible:false,
                            due: "",
                            id: 1,
                            name:"",
                            complete:false,
                            sprintid:"",
                            assignedTo:[]
                        }
                    };
        this._openDialog = this._openDialog.bind(this);
        this._closeDialog = this._closeDialog.bind(this);
        this._save = this._save.bind(this);
        this.changeComplete = this.changeComplete.bind(this);
    }

    changeComplete(){
        var task = this.state.task;
        task.complete = !task.complete;
        this.setState({task});
        this._save();
    }

    componentDidMount() {
        fetch('http://localhost:57531/xf-scrumboard-api/api/tasks/'+ this.props.id)
        .then(result=>result.json())
        .then(task=>this.setState({task}))
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


    _save(){
        alert("saving!");
        fetch('http://localhost:57531/xf-scrumboard-api/api/tasks/'+ this.props.id, {
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
                        title={this.state.task.name}
                        subtitle={this.state.task.description}
                    />
                    <CardActions expander>
                        <SelectionControl
                            id="isComplete"
                            name="done[]"
                            type="checkbox"
                            checked={this.state.task.complete}
                            onChange={this.changeComplete}
                        />
                        <Chip label={new Date(this.state.task.due).toDateString()} />
                        { (this.state.task.assignedTo.length>0) ?
                            <Chip   label={this.state.task.assignedTo.length}
                                    avatar={<Avatar icon={<FontIcon>person</FontIcon>} />}
                                    expander/>
                            : null }
                    </CardActions>
                        <div expandable>
                            <List className="md-paper--1">
                                { (this.state.task.assignedTo.length>0) ?
                                    <Subheader primaryText="Assigned to"  primary />
                                 : null }
                                {
                                    this.state.task.assignedTo.map( member => {
                                        return <ListItem    key={member.id}
                                                            leftAvatar={<Avatar icon={<FontIcon>person</FontIcon>} />}
                                                            primaryText={member.name}/>
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

                <Dialog
                    visible={false}
                    id="fullPageExample"
                    onHide={this._closeDialog}
                    {...this.state}
                    fullPage
                    aria-label="New Event">
                    <Toolbar
                        colored
                        nav={nav}
                        actions={action}
                        title={this.state.task.name}
                        fixed
                    />
                    <form className="md-toolbar-relative">
                        <TextField
                            id="name"
                            placeholder="Name"
                            block
                            defaultValue={this.state.task.name}
                            paddedBlock/>
                        <Divider />

                        <TextField
                            id="eventDescription"
                            placeholder="Description"
                            block
                            paddedBlock
                            value={this.state.task.description}
                            defaultValue={this.state.task.description}
                            rows={4}/>
                        <Divider />

                        <section className="md-grid">
                            <DatePicker
                                id="due"
                                defaultValue={new Date(this.state.task.due)}
                                label="Select the due date"
                                className="md-cell"
                                lineDirection="center"
                            />
                            <SelectionControl
                                id="done"
                                name="done"
                                label="Complete"
                                type="checkbox"
                                value="complete"
                                className="md-cell"
                                checked={this.state.task.complete}
                            />
                        </section>


                    </form>
                </Dialog>
            </div>
        );
    }
}


export default TaskCard;