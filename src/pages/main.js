import React, { Component } from 'react'
import KNN from "../components/knn";
import Selecter from "../components/selecter";
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class main extends Component {

	state = {
		columns: [],
		data: [],
		predictors: [],
		label: []
	}

	componentDidMount(){
		//console.log(this.props.location.data);
		if(this.props.location.data == null){
			alert('No se pudo obtener ningun dato, reedireccionando....');
			this.props.history.push({
				pathname: '/loaddata'
			});
		}
		else{
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
		let obj = new Object();
		for(let columnName of columnsName){
			obj[columnName] = new Array();
			for(let data of this.state.data){
				obj[columnName].push(data[columnName]);
			}
		}
		return obj;
	}

	selecterCallback(predictors,label){
		this.setState({predictors:predictors,label:label});
	}
	

	render() {
		console.log(this.state.columns);


		const data = this.getColumnsData(this.state.predictors.concat(this.state.label));
		const label_value = data[this.state.label],
			predictors_value = this.state.predictors.map(p=>data[p]);
		
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
			<KNN x={predictors_value} y={label_value} knn={3} predictors={this.state.predictors}/>
			</div>
			<div className="col-2">
			<Selecter columns={this.state.columns} predictors={this.state.predictors} label={this.state.label} selecterCallback={this.selecterCallback.bind(this)}/>
			</div>
			<div className="col-8">
			</div> 
			</div>
			</div>
			</React.Fragment>
		)
	}
}

export default main;
