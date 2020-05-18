import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import NavBar from "../NavBar/NavBar.js";
import AppDrawer from "../AppDrawer/AppDrawer.js";
import CreateDashboard from "../CreateDashboard/CreateDashboard.js";
import DashboardList from "../DashboardList/DashboardList.js";

const MenuItemList = [
	{name: "Create Dashboard", component: CreateDashboard},
	{name: "Dashboards", component: DashboardList}
];


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	openDrawer: false,
        	selectedMenuItem: null
        };
    }
	
	componentDidMount(){
    	this.setState({
    		data: ["Avinash"]
    	});
	}

	onDrawerToggle = () => {
		this.setState({
			openDrawer: !this.state.openDrawer
		});
	}

	selectMenuItem = (index) => {
		this.setState({
			selectedMenuItem: index
		});
	}

    render() {
		let MenuComponent;
		if (this.state.selectedMenuItem !== null){
			MenuComponent = MenuItemList[this.state.selectedMenuItem].component;
		}

        return (
        	<div>
        		<NavBar
        			onDrawerToggle={this.onDrawerToggle}
				/>
				<AppDrawer 
					open={this.state.openDrawer}
					onDrawerToggle={this.onDrawerToggle}
					selectMenuItem={this.selectMenuItem}
					menuItemList={MenuItemList}
				/>
				{
					MenuComponent && <MenuComponent />
				}
        	</div>
        );
    }
}