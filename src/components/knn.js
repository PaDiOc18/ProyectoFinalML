import React, { Fragment } from 'react';
import * as math from "mathjs";

class KNN extends React.Component {
	constructor(props){
		super(props); 
		/**
		 * this.props.x
		 * this.props.y
		 * this.props.knn
		 * this.props.predictors
		 */
	}

	onClickPredict(){
		const pred = this.predict([22,10]);
		console.log(pred);
	}

	norm(x1,x2) {
     		 return math.subtract(x1,x2).map(x=>x**2)
    	}
	
	predict(new_x) {
		let nb_distance = new Array(),
			k_nearest_neighbours = new Array(),
			k_neighbours_label = new Array(),
			nb_distance_clone = new Array(),
			label_counter = math.zeros(this.props.y.length)._data,
			d = 0.0;
		
		// Calculating distance between 'x' and 'x_i'
		const X = math.matrix(this.props.x),
			size = X.size();
		if(size.length==1){
			nb_distance = this.norm(this.props.x,new_x)
		}else if(size.length==2){
			for(let i=0;i<size[1];i++){
				nb_distance.push(this.norm(math.flatten(math.column(X,i)),new_x));
			}
		}

		// picking 'k' nearest neighbours.
		nb_distance_clone = nb_distance.copyWithin()
		for(let i=0;i<this.props.knn;i++){
			k_nearest_neighbours.push(nb_distance_clone.indexOf(math.min(nb_distance)) + i);
			nb_distance_clone.splice(k_nearest_neighbours[i],1);
		}

		// Getting the label of the 'k' nearest neighbours
		// if the label is a string, save the whole label name; else it MUST be numeric, save the number of the class which belongs too. 
		k_neighbours_label = k_nearest_neighbours.map(index=>this.props.y[index]);

		// `Predicting`
		for(let label of k_neighbours_label){
			label_counter[label] += 1
		}
		return label_counter.indexOf(math.max(label_counter))
	}




	renderForm(){
		let out = this.props.predictors.map((p)=>{
			return(
				<div className="container">
				<div className="row justify-conetent-start">
				{p}
				</div>
				<div className="row justify-conetent-start">
				<input type="number" name={p} onChange={this.onChangeNewX}/>
				</div>
				</div>
				)})
		return(out);
	}

	onChangeNewX(e){
		const key = e.target.name,
			value = e.target.value;
		this.setState(prevState => ({
			new_x:{
			...prevState.new_x,
			key:value
			}
		}))
	}
	
	render(){
		return (
			<div className="container">
			<div className="row">
			<div className="col-12 d-flex justify-content-center">
			Predictors:
			</div>
			</div>
			<div className="row">
			<div className="col-12">
				{this.renderForm()}
			</div>
			</div>
			<div className="row">
			<div className="col-12">
			<button type="button" className="btn btn-primary w-100" onClick={this.onClickPredict.bind(this)}>Predict</button>
			</div>	
			</div>
			</div>
		);
	}
}
export default KNN;


