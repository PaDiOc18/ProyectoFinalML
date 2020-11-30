import React from 'react'


class Selecter extends React.Component{

	constructor(props){
		super(props);
	}



	renderAvailableLabels(){
		let labelsHtml = new Array();
		for(let col of this.props.columns){
			if(!this.state.label.includes(col.headerName)) labelsHtml.push(<option value={col.headerName}>{col.headerName}</option>);
		}
		return labelsHtml;
	}

	renderAvailablePredictors(){
		let predictorsHtml = new Array();
		for(let col of this.props.columns){
			if(!this.state.predictors.includes(col.headerName)) predictorsHtml.push(
				<input
				name={col.headerName} type="checkbox"
				checked={this.state.isGoing}
				onChange={this.handleInputChange} />
				<input name={col.headerName} type="text" value={col.headerName} onChange={()=>{this.props.selecterCallback(this.state.predictors)}}/>
			);
		}
		return predictorsHtml;
	}

	onChangeLabel(e){
		this.props.selecterCallback(this.props.predictors,e.target.value);
	}

	onChangePredictors(){
		
	}

	render(){
		return(
			<div className="row">
			<div className="col-6">
				<select onChange={this.onChangeLabel}>
					{this.renderAvailableLabels()}
				</select>
			</div>
			<div className="col-6">
				{this.renderAvailablePredictors()}
			</div>
			</div>
		)
	}
}

export default Selecter;
