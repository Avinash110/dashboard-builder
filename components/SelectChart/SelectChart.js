import React from 'react';
import ReactDOM from 'react-dom';
import './SelectChart.css';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export default class SelectChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
        	<Modal
		        aria-labelledby="transition-modal-title"
		        aria-describedby="transition-modal-description"
		        className={"modal-container"}
		        open={this.props.open}
		        onClose={this.props.handleClose}
		        closeAfterTransition
		        BackdropComponent={Backdrop}
		        BackdropProps={{
		          timeout: 500
		        }}
		      >
		        <Fade in={this.props.open}>
	          		<div className="modal-body">
				        <div className="chart-select-container">
				        	{
				        		this.props.Charts.map((d, i) => {
				        			return (
				        				<Card key={i} onClick={() => this.props.onCardClick(d)} className="chart-select-item"><CardContent> {d} </CardContent> </Card>
				        			);
				        		})
				        	}
				        </div>
		       		</div>
		        </Fade>
	      	</Modal>
        );
    }
}