import React, { Component } from 'react'

class graphSelector extends Component {

	state = {
		labelsHtml: [],
		checkBoxes: []
	}

    componentDidMount(){
		if(this.props.columns.length > 0){
			let { labelsHtml,checkBoxes } = this.state;
	
			for(let i = 0; i < this.props.columns.length; i++){
				labelsHtml.push(<option value={this.props.columns[i]['field']}>{this.props.columns[i]['field']}</option>)
				checkBoxes.push(<div className='d-flex justify-content-around'>{this.props.columns[i]['field']}<input name={this.props.columns[i]['field']} type="checkbox" onChange={this.onChangePredictors} /></div>);
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
    
    render() {
        const { labelsHtml } = this.state;
        return (
            <React.Fragment>
                <div className="col-6">
                    <select>
                        { labelsHtml }
                    </select>
			    </div>
            </React.Fragment>
        )
    }
}

export default graphSelector;
