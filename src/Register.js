import React from 'react';
import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons/Button';


class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: 'Initial data...'
        }

        this.updateState = this.updateState.bind(this);

    };

    updateState(e) {
        this.setState({data: e.target.value});
    }

    send(){
        alert("sending");
    }

    render() {
        return (
            <div>
                <input type = "text" value = {this.state.data}
                       onChange = {this.updateState} />
                <h4>{this.state.data}</h4>
                <form className="md-grid" onSubmit={this.send}>
                    <TextField
                        id="username"
                        label="Username"
                        customSize="title"
                        className="md-cell md-cell--12"
                        pattern="/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/"
                        required
                    />
                    <TextField
                        id="username"
                        label="Price"
                        type="number"
                        className="price md-cell md-cell--1-phone md-cell--3"
                    />
                    <TextField
                        id="applicationLocation"
                        label="Location (optional)"
                        defaultValue="Fremont Bridge"
                        className="location md-cell md-cell--3-phone md-cell--5-tablet md-cell--9-desktop"
                    />
                    <TextField
                        id="applicationDescription"
                        label="Description"
                        rows={2}
                        defaultValue="Unique and rare dress from 1952. Made out of cotton with front pockets. Sleeveless with button closures."
                        className="md-cell md-cell--12"
                    />
                    <Button raised primary label="Submit" />
                </form>
            </div>
        );
    }
}

export default Register;