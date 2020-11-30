import React from 'react'


class Selecter extends React.Component{

	state = {
		labelsHtml: [],
		checkBoxes: []
	}

	componentDidMount(){
		if(this.props.columns.length > 0){
			let { labelsHtml,checkBoxes } = this.state;
	
			for(let i = 0; i < this.props.columns.length; i++){
				labelsHtml.push(<option value={this.props.columns[i]['field']}>{this.props.columns[i]['field']}</option>)
				checkBoxes.push(
					<div className="form-check form-check-inline">
					{this.props.columns[i]['field']}
					<input className='ml-1' name={this.props.columns[i]['field']} type="checkbox" onChange={this.onChangePredictors.bind(this)}/>
					</div>);
			}
	
			this.setState({
				labelsHtml: labelsHtml,
				checkBoxes: checkBoxes
			})
		}
		else{
			this.setState({
				labelsHtml: <option value='Nada'>Nullptr</option>,
				checkBoxes: <input type="checkbox"/>
			})
		}
	}

	onChangeLabel(e){
		//console.log(e.target.value)
		this.props.selecterCallback(this.props.predictors,e.target.value);
	}
		
	onChangePredictors(e){
		let p = this.props.predictors;
		if(p.includes(e.target.name)){
			let indice = p.indexOf(e.target.name)
			p.pop(indice)
		}else p.push(e.target.name);
		this.props.selecterCallback(p,this.props.label);
	}

	render(){
		const { labelsHtml, checkBoxes} = this.state;
		return(
			<React.Fragment>
				<div className='col-6'>
					<label htmlFor='elSelect'><h6>Selecciona tu respuesta (Y):</h6></label>
					<select name='elSelect' onChange={this.onChangeLabel.bind(this)}>
						{ labelsHtml }
					</select>
				</div>

				<div className='col-6'>
					<label htmlFor='losCheckboxes'><h6>Marca los predictores a usar (X):</h6></label>
					<div name ='losCheckboxes' className='list-group pt-2'>
						{ checkBoxes }
					</div>
				</div>
			</React.Fragment>
		)
	}
}

export default Selecter;
