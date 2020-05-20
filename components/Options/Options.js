import React from 'react';
import ReactDOM from 'react-dom';
import './Options.css';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';

import {mergeDeep} from "../Utils.js";

export default class Options extends React.Component {
    constructor(props) {
        super(props);
        this.state = {componentProps: mergeDeep({}, props.componentProps)};
    }

    onChange = (e, d, key) => {
		let source = {};
		let path = source;
		d.path.forEach((d1, i) =>{
		    if (i == d.path.length-1){
				path[d1] = e.target[key];
		    }else{
			    path[d1] = {};
			    path = path[d1];
		    }
		});
		
		this.setState({
			componentProps: mergeDeep(this.state.componentProps, source)
		});
    }

    getValue = (path) => {
		let value;
		let source = this.state.componentProps;
		path.forEach((d, i) => {
			if (i == path.length-1){
				value = source[d]; 
			} else{
				source = source[d];
			}
		});

		return value;
    }

    handleNestedClick = (id) => {
		this.setState({
			[id+"_open"]: !this.state[id+"_open"]
		});
    }
	
	renderOptions = (settings) => {
		const children = [];
		settings.forEach((d, i) => {
			switch (d.type) {
				case "boolean":
					var value = this.getValue(d.path);
					children.push(<ListItem key={d.id}>
						<label>{d.name}</label>
						<Checkbox
					        checked={value||false}
					        onChange={(e)=>this.onChange(e, d, "checked")}
					        inputProps={{ 'aria-label': 'primary checkbox' }}
				      	/>
					</ListItem>);

					break;
				case "color":
					var value = this.getValue(d.path);
					children.push(<ListItem key={d.id}>
						<label>{d.name}</label>
						<input onChange={(e)=>this.onChange(e, d, "value")} type="color" id="favcolor" name={d.name} value={value}/>
					</ListItem>);
					break;
				case "object":
					children.push(<React.Fragment key={d.id}>
						<ListItem button onClick={() => this.handleNestedClick(d.id)}>
				        	<ListItemText primary={d.name} />
				        	{this.state[d.id+"_open"] ? <ExpandLess /> : <ExpandMore />}
				      	</ListItem>
				      	<Collapse in={this.state[d.id+"_open"]} timeout="auto" unmountOnExit>
							{this.renderOptions(d.items)}
					  	</Collapse>
					</React.Fragment>);
					break;
				default:
					// statements_def
					break;
			}

		});
		return (
			<List
			    component="nav"
			    aria-labelledby="nested-list-subheader"
			>
				{
					children
				}
			</List>
		);
	}

    render() {
    	const {settings} = this.props;
        return (
        	<React.Fragment>
        		<IconButton className="icon-button save-icon" onClick={() => this.props.onStateUpdate(this.state.componentProps)} edge="start" color="inherit" aria-label="menu">
	            	<SaveIcon />
	          	</IconButton>
				{this.renderOptions(settings)}
        	</React.Fragment>
        );
    }
}