import React from 'react';
import ReactDOM from 'react-dom';
import './Dashboard.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
    	const {item} = this.props;
        return (
			item.map((d, index) => React.cloneElement(d.component, {key:d.id, savedProps: {...d.properties}, disable: true}))
		);
    }
}