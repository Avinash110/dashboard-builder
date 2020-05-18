import React from 'react';
import ReactDOM from 'react-dom';
import './NavBar.css';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
			<AppBar position="static" >
				<Toolbar>
					<IconButton onClick={this.props.onDrawerToggle} edge="start" color="inherit" aria-label="menu">
		            	<MenuIcon/>
		          	</IconButton>
				</Toolbar>
			</AppBar>
        );
    }
}