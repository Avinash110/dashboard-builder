import React from 'react';
import ReactDOM from 'react-dom';
import './DashboardList.css';
import Dashboard from "../Dashboard/Dashboard.js";

export default class DashboardList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (          
        	this.props.createdDashboards.map((d, i) => {
        		return (
                    <Dashboard key={i} item={d}/>
                );
        	})
        );
    }
}