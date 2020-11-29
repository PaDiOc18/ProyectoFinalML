import React, { Component } from 'react'
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class main extends Component {

    state = {
        columns: [],
        data: []
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

    render() {
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
            </React.Fragment>
        )
    }
}

export default main;
