import React from 'react';
import ReactDOM from 'react-dom';
import './BarChart.css';
import { Resizable, ResizableBox } from 'react-resizable';

import * as d3 from "d3";

export default class BarChart extends React.Component {
    constructor(props) {
        super(props);
        const margin = {top: 20, right: 20, bottom: 30, left: 40};
        this.state = {
        	clientWidth: 960,
        	clientHeight: 500,
			margin: margin,
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
		};
    }

    componentDidMount = () => {
		this.createBarChart();
    }

    createXAxis = () => {
    	const {margin, data} = this.state;
    	const width = this.getWidth();
    	var x = d3.scaleBand()
              .range([0, width])
              .padding(0.1);

        x.domain(data.map(function(d) { return d.salesperson; }));
        return x;
    }

    createYAxis = () => {
    	const { margin, data} = this.state;
    	const height = this.getHeight();
    	var y = d3.scaleLinear()
              .range([height, 0]);

        y.domain([0, d3.max(data, function(d) { return d.sales; })]);
        return y;
    }

    createBars = (data, x, y, height) => {
    	return data.map((d, index) => {
    		return <rect 
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
    	return this.state.clientWidth - this.state.margin.left - this.state.margin.right
    }

    getHeight = () => {
    	return this.state.clientHeight - this.state.margin.top - this.state.margin.bottom
    }

    createBarChart = () => {
    	const {margin, data} = this.state;
    	const width = this.getWidth();
    	const height = this.getHeight();
		const x = this.createXAxis();
		const y = this.createYAxis();
    	return (
			<svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
				<g transform= {"translate(" + margin.left + "," + margin.top + ")"}>
					{this.createBars(data, x, y, height)}
					<g ref={node => d3.select(node).call(d3.axisBottom(x))} transform= {"translate(0," + height + ")"}>
					</g>
					<g ref={node => d3.select(node).call(d3.axisLeft(y))}>
					</g>
				</g>
			</svg>
    	);
    }

    onResize = (event, {element, size, handle}) => {
		this.setState({clientWidth: size.width, clientHeight: size.height});
	};

    render() {
        return (
			<ResizableBox minConstraints={[600, 350]} width={this.state.clientWidth} height={this.state.clientHeight} onResize={this.onResize}>
			{
				this.createBarChart()
			}
			</ResizableBox>
        );
    }
}