import React from 'react'


class Selecter extends React.Component{

	constructor(props){
		super(props);
	}



	renderAvailableLabels(){
		let labelsHtml = new Array();
		for(let col of this.props.columns){
			if(!this.props.label.includes(col.headerName)) labelsHtml.push(<option value={col.headerName}>{col.headerName}</option>);
		}
		return labelsHtml;
	}

	renderAvailablePredictors(){
		let predictorsHtml = new Array();
		for(let col of this.props.columns){
			if(!this.props.predictors.includes(col.headerName)) {
				predictorsHtml.push(
					<div>
					{col.headerName}

					<input
					name={col.headerName} type="checkbox"
					onChange={this.onChangePredictors.bind(this)} />
					</div>
				);
			}

		}
		return predictorsHtml;
	}

	onChangeLabel(e){
		this.props.selecterCallback(this.props.predictors,e.target.value);
	}

	onChangePredictors(e){
		let p = this.props.predictors;
		if(p.includes(e.target.name)){
			p.slice(p.indexOf(e.target.name),1);
		}else p.push(e.target.name);
		this.props.selecterCallback(p,this.props.label);
	}

	render(){
		return(
			<div className="row">
			<div className="col-6">
				<select onChange={this.onChangeLabel.bind(this)}>
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
