import React, { Component } from 'react';
import './home.css';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardText from 'react-md/lib/Cards/CardText';
import TeamCard from './TeamCard';

export default class Dashboard extends Component {
  render() {
    return (
        <div className="md-grid">

            <Card className="md-cell">
                <CardTitle title="Progress" />
                <CardText>
                    <p>Wowza</p>
                </CardText>
            </Card>

            <TeamCard className="md-cell" id={1}/>
        </div>
    );
  }
}
