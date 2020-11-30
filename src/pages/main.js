import React, { Component } from 'react'
import KNN from "../components/knn";
import Selecter from "../components/selecter";
import GraphSelector from "../components/pages/graphSelector";
import Graph from "../components/graph";

import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class main extends Component {

	state = {
		columns: [],
		data: [],
		predictors: [],
		label: "",
		xlabel: "", 
		ylabel:"",
		x: [],
		y: [],
		c: []
	}

	componentDidMount(){
		if(this.props.location.data == null){
			alert('No se pudo obtener ningun dato, reedireccionando....');
			this.props.history.push({
				pathname: '/loaddata'
			});
		}
		else{
			console.log(this.props.location.data.columnas)
			this.setState({
				columns: this.props.location.data.columnas,
				data: this.props.location.data.datos
			});
		}
	}

	regresarAload = () => {
		this.props.history.replace({
			pathname: "/loaddata"
		})
	}

	getColumnsData = (columnsName) =>{
		let obj = new Object(),num=0;
		for(let col of columnsName){
			obj[col] = new Array();
			for(let data of this.state.data){
				num = (data[col] == null || data[col] == undefined) ? 0:data[col];
				obj[col].push(num);
			}
		}
		return obj;
	}

	selecterCallback(predictors,label){
		this.setState({predictors:predictors,label:label});
	}

	graphSelectorCallbackX1(ylabel){
		this.setState({
			ylabel: ylabel
		}, () => { 
			this.setState({
				y: this.getColumnsData([this.state.ylabel])
			})
		});
	}

	graphSelectorCallbackX2(xlabel){
		this.setState({
			xlabel:xlabel
		}, () => {
			this.setState({
				x: this.getColumnsData([this.state.xlabel])
			});
		});
	}

	onlyUnique(value, index, self) {
		return self.indexOf(value) === index;
	}

	encoder(label){
		var classes = label;
		var uniqueClasses = classes.filter(this.onlyUnique);
		var classified_pairs = new Array();

		for (var i = 0; i < classes.length; i++) {
			classified_pairs[i] = uniqueClasses.indexOf(classes[i]);
		}
		return classified_pairs;
	}
	
	
	render() {
		const x_1 = this.getColumnsData([this.state.xlabel])[this.state.xlabel],
			  x_2 = this.getColumnsData([this.state.ylabel])[this.state.ylabel],
			  c = this.getColumnsData([this.state.label])[this.state.label],
			  y = this.encoder(c),
			  labels = c.filter(this.onlyUnique);

		return (
			<React.Fragment>
			<div style={{ height: '500px', width: '100%' }} className="ag-theme-alpine">
			<AgGridReact
			columnDefs={this.state.columns}
			rowData={this.state.data}
			pagination={true}>
			</AgGridReact>
			</div>
			<button onClick={this.regresarAload}>Usar otro dataset</button>
			<div className="container">
			<div className="row">
			<div className="col-2">
			<KNN x={x_1} y={y} knn={3} predictors={[this.state.xlabel]} labels={labels}/>
			</div>
			<div className="col-2">
			<Selecter columns={this.props.location.data.columnas} predictors={this.state.predictors} label={this.state.label} selecterCallback={this.selecterCallback.bind(this)}/>

			</div>
			<div className="col-8">
				x1:<GraphSelector columns={this.props.location.data.columnas} returnData={this.graphSelectorCallbackX1.bind(this)}></GraphSelector>
				x2:<GraphSelector columns={this.props.location.data.columnas} returnData={this.graphSelectorCallbackX2.bind(this)}></GraphSelector>
			</div> 


			<Graph xlabel={this.state.xlabel} ylabel={this.state.ylabel} x={x_1} y={x_2} c={c} ></Graph>

			</div>
			</div>
			</React.Fragment>
		)
	}
}

export default main;
