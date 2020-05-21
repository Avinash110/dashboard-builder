import React from 'react';
import ReactDOM from 'react-dom';
import './BarChart.css';

import Options from "../Options/Options.js";

import { Resizable, ResizableBox } from 'react-resizable';
import * as d3 from "d3";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import BuildIcon from '@material-ui/icons/build';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import {mergeDeep, setId} from "../Utils.js";

export default class BarChart extends React.Component {
    settingsToUpdate = setId([
        {name: "Color", type: "color", path: ["color"]},
        {name: "Data Labels", type: "object", items: [
            {name: "Format", type: "dropdown", path: ["labels", "format"]},
            {name: "Show", type: "boolean", path: ["labels", "show"]}
        ]},
        {name: "X-Axis", type: "object", items: [
            {name: "Title", type: "text", path: ["xaxis", "title"]},
            {name: "Color", type: "color", path: ["xaxis", "color"]}
        ]},
        {name: "Y-Axis", type: "object", items: [
            {name: "Title", type: "text", path: ["xaxis", "title"]},
            {name: "Color", type: "color", path: ["yaxis", "color"]}
        ]},
        {name: "Data", type: "object", items: [
            {name: "Sort-By", type: "list", values: [{name: "X-Axis", value: "xaxis"}, {name: "Y-Axis", value: "yaxis"}], path: ["sort", "axis"]},
            {name: "Sort-Func", type: "list", values: [{name: "Asc", value: "asc"}, {name: "Desc", value: "desc"}], path: ["sort", "func"]}
        ]}
    ])
    constructor(props) {
        super(props);
        const margin = {top: 0, right: 48, bottom: 30, left: 40};
        this.state = {
            openSettings: false,
            componentProps: mergeDeep({
                clientWidth: 960,
                clientHeight: 500,
                color: "black",
                margin: margin,
                xaxis: {
                    columnName: 'salesperson'
                },
                yaxis: {
                    columnName: 'sales'
                },
                labels: {
                    show: false
                },
                sort: {

                },
                data: [{salesperson: "Bob", sales: 33},
                    {salesperson: "Robin", sales: 12},
                    {salesperson: "Anne", sales: 41},
                    {salesperson: "Mark", sales: 16},
                    {salesperson: "Joe", sales: 59},
                    {salesperson: "Eve", sales: 38},
                    {salesperson: "Karen", sales: 21},
                    {salesperson: "Kirsty", sales: 25},
                    {salesperson: "Chris", sales: 30},
                    {salesperson: "Lisa", sales: 47},
                    {salesperson: "Tom", sales: 5},
                    {salesperson: "Stacy", sales: 20},
                    {salesperson: "Charles", sales: 13},
                    {salesperson: "Mary", sales: 29}
                ]
            }, props.savedProps || {})
        };
    }

    getState = () => {
        return this.state.componentProps;
    }

    openSettings = () => {
        this.setState({
            openSettings: true
        });
    }

    componentDidMount = () => {
		this.createBarChart();
    }

    createXAxis = (margin, data, xaxis) => {
    	const width = this.getWidth();
    	var x = d3.scaleBand()
              .range([0, width])
              .padding(0.1);

        x.domain(data.map((d) => d[xaxis.columnName]));
        return x;
    }

    createYAxis = (margin, data, yaxis) => {
    	const height = this.getHeight();
    	var y = d3.scaleLinear()
              .range([height, 0]);

        y.domain([0, d3.max(data, (d) => d[yaxis.columnName])]);
        return y;
    }

    createLabels = (data, x, y, height, color) => {
        return data.map((d, index) => {
            return <text
                        fill={color}
                        key={index} 
                        className="data-label" 
                        x={x(d.salesperson) + (x.bandwidth() / 2)}
                        y={y(d.sales)}
                    >
                        {d.sales}
                    </text>
        });
    }

    createBars = (data, x, y, height, color) => {
    	return data.map((d, index) => {
    		return <rect 
                        fill={color}
    					key={index} 
    					className="bar" 
    					x={x(d.salesperson)}
    					y={y(d.sales)}
    					width={x.bandwidth()}
    					height={height - y(d.sales)}
    				>
    				</rect>
    	});
    }

    getWidth = () => {
    	return this.state.componentProps.clientWidth - this.state.componentProps.margin.left - this.state.componentProps.margin.right
    }

    getHeight = () => {
    	return this.state.componentProps.clientHeight - this.state.componentProps.margin.top - this.state.componentProps.margin.bottom
    }

    handleClose = ()=> {
        this.setState({
            openSettings: false
        });
    }

    onStateUpdate = (newState) => {
        this.setState({
            componentProps: mergeDeep(this.state.componentProps, newState),
            openSettings: false
        });
    }

    createBarChart = () => {
    	const {margin, data, color, labels, xaxis, yaxis, sort} = this.state.componentProps;
        
        if(sort.axis){
            const keyToSort = this.state.componentProps[sort.axis].columnName;
            const multiplier = sort.func == "desc" ? -1 : 1;
            function compare(a, b) {
              if (a[keyToSort] > b[keyToSort]) return multiplier*1;
              if (b[keyToSort] > a[keyToSort]) return multiplier*-1;

              return 0;
            }
            data.sort(compare);
        }
    	const width = this.getWidth();
    	const height = this.getHeight();
		const x = this.createXAxis(margin, data, xaxis);
		const y = this.createYAxis(margin, data, yaxis);
    	return (
			<svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
				<g transform= {"translate(" + margin.left + "," + margin.top + ")"}>
					{this.createBars(data, x, y, height, color)}
                    {labels.show ? this.createLabels(data, x, y, height, color) : null}
					<g ref={node => d3.select(node).call(d3.axisBottom(x))} transform= {"translate(0," + height + ")"}>
					</g>
					<g ref={node => d3.select(node).call(d3.axisLeft(y))}>
					</g>
				</g>
			</svg>
    	);
    }

    onResize = (event, {element, size, handle}) => {
		this.setState({componentProps: {...this.state.componentProps, clientWidth: size.width, clientHeight: size.height}});
	};

    render() {
        let boundingRect = {};
        if (this.refs["container-ref"]){
            boundingRect = this.refs["container-ref"].getBoundingClientRect();
        }
        return (
            <Card className="chart-card" ref="container-ref">
                <CardContent>
                    {
                        !this.props.disable ? <Tooltip title="Build">
                            <IconButton className="build-icon" style = {{backgroundColor: "white"}} onClick={this.openSettings} edge="start" color="inherit" aria-label="menu">
                                <BuildIcon />
                            </IconButton>
                        </Tooltip> : null
                    }
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={"modal-container"}
                        open={this.state.openSettings}
                        onClose={this.handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500
                        }}
                      >
                        <Fade in={this.state.openSettings}>
                            <div className="options-modal-body" style={{position:'absolute', height: boundingRect.height, width: boundingRect.width, top: boundingRect.top, left: boundingRect.left}}>
                                <Options settings={this.settingsToUpdate} componentProps={this.state.componentProps} onStateUpdate={this.onStateUpdate}/>
                            </div>
                        </Fade>
                    </Modal>
        			<ResizableBox minConstraints={[600, 350]} maxConstraints={[960, 500]} width={this.state.componentProps.clientWidth} height={this.state.componentProps.clientHeight} onResize={this.onResize} axis={this.state.disable ? "none" : "both"}>
        			{
        				this.createBarChart()
        			}
        			</ResizableBox>
                </CardContent>
            </Card>
        );
    }
}