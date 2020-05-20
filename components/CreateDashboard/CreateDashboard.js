import React from 'react';
import ReactDOM from 'react-dom';
import './CreateDashboard.css';

import BarChart from "../BarChart/BarChart.js";
import SelectChart from "../SelectChart/SelectChart.js";

import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../../theme.js';
import { GlobalStyles } from "../../global.js";
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const Charts = [
	"Bar Chart",
	"Pie Chart",
	"Line Chart",
	"Bubble Chart",
	"Scatter Chart",
	"Grouped Bar Chart",
];

const getRandomId = (len) => {
	var ans = '';
    var arr = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = len; i > 0; i--) { 
        ans += arr[Math.floor(Math.random() * arr.length)];
    } 
    return ans;
}

export default class CreateDashboard extends React.Component {
	ids= {}
    constructor(props) {
        super(props);
        this.state = {
        	theme: 'light',
        	openSelectModal: false,
        	components: []
        };
    }

    createBarChart = () => {
    	let id = getRandomId(8);
    	const idsCreated = this.state.components.map(d => d.id);
    	while(idsCreated.includes(id)){
			id = getRandomId(8);
    	}
		this.setState({
			components: [...this.state.components, {component: <BarChart key={id} ref={ref => this.ids[id] = ref} />, id:id}]
		});
    }

    openChartList = () => {
		this.setState({
			openSelectModal: true
		});
    }

    onSelectModalClose = () => {
    	this.setState({
			openSelectModal: false
		});	
    }

    onCardClick = (chart) => {
		switch (chart) {
			case "Bar Chart":
				this.onSelectModalClose();
				this.createBarChart();
				break;
			case "Pie Chart":
				
				break;
			case "Line Chart":
				
				break;
			case "Bubble Chart":
				
				break;
			case "Scatter Chart":
				
				break;
			case "Grouped Bar Chart":
				
				break;
			default:
				// statements_def
				break;
		}
    }

    onDashboardSave = () => {
		const components = this.state.components.map((d,i) => {
			return {
				component: d.component,
				id: d.id,
				properties: this.ids[d.id].getState()
			};
		});
    	this.props.onDashboardSave(components);
    }

    render() {
        return (
        	<div className="dashboard-container">
        		<ThemeProvider theme={this.state.theme == 'light' ? lightTheme : darkTheme}>
        			<GlobalStyles />
        			<div className="dashboard-controls">
	        			<Tooltip title="Save Dashboard">
		        			<IconButton className="icon-button save-icon" onClick={this.onDashboardSave} edge="start" color="inherit" aria-label="menu">
				            	<SaveIcon />
				          	</IconButton>
			          	</Tooltip>
			          	<Tooltip title="Add Component">
			        		<IconButton className="icon-button add-icon" onClick={this.openChartList} edge="start" color="inherit" aria-label="menu">
				            	<AddIcon />
				          	</IconButton>
			          	</Tooltip>
        			</div>
	        		<SelectChart 
						open={this.state.openSelectModal}
						handleClose={this.onSelectModalClose}
						onCardClick={this.onCardClick}
						Charts={Charts}
	        		/>
	        		{
	        			this.state.components.map((item, index) => {
	        				return item.component
	        			})
	        		}
        		</ThemeProvider>
        	</div>
        );
    }
}