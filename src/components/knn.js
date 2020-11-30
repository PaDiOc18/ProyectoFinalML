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

	norm(x1,x2) {
     		 return math.subtract(x1,x2)._data.map(x=>x**2)
    	}
	
	predict(new_x) {
		let nb_distance = new Array(),
			k_nearest_neighbours = new Array(),
			k_neighbours_label = new Array(),
			nb_distance_clone = new Array(),
			label_counter = math.zeros(this.props.y.length)._data,
			d = 0.0;
		
		// Calculating distance between 'x' and 'x_i' 
		for(let i=0;i<this.props.x.length;i++){
			d = this.norm(new_x,this.props.x[i])
			nb_distance.push(d)
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


	render_form(){
		let out = this.props.predictors.map((p)=>{ return p})
		return(out);
	}

	


	render() {
		return (
			<div className="container">
			<div className="row">
			Predictors:
			</div>
			<div className="row">
			{this.render_form()}
			</div>
			<div className="row">
				<button type="button" className="btn btn-primary">Predict</button>
			</div>
			
			</div>
		);
	}
}
export default KNN;


