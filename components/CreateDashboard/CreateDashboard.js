import React from 'react';
import ReactDOM from 'react-dom';
import './CreateDashboard.css';

import BarChart from "../BarChart/BarChart.js";

export default class CreateDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	components: []
        };
    }

    createBarChart = () => {
		this.setState({
			components: [...this.state.components, <BarChart id={this.state.components.length} key={this.state.components.length}/>]	
		});
    }

    render() {
        return (
        	<div>
        		<button onClick={this.createBarChart}>Add</button>
        		{
        			this.state.components.map((item, index) => item)
        		}
        	</div>
        );
    }
}