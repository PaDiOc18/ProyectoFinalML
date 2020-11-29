import React, { Fragment } from 'react';
import Papa from 'papaparse';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { DataGrid } from '@material-ui/core/data-grid';


class FileReader extends React.Component {
    state = {
        csvFile: undefined,
        csvData: undefined,
        columnDefs: [],
        data: []
    }
    
    handleChange = event => {
        this.setState({
            csvfile: event.target.files[0]
        });
    };
  
    importCSV = () => {
        const { csvfile } = this.state;
        Papa.parse(csvfile, {
          complete: (results) => {this.saveData(results)},
          header: true
        });
    };
    
    saveData = (results) => { 
        const { columnDefs } = this.state;

        //Aqui genera las columnas
        for(let i = 0; i < results.meta['fields'].length; i++){
            columnDefs.push({headerName: results.meta['fields'][i], field: results.meta['fields'][i]})
        }
        console.log(columnDefs)
        this.setState({columnDefs: columnDefs}, () => {
            this.setState({
                csvData: results.data //Y aqui actualiza los datos
            }, () => console.log(this.state.csvData))
        })
    }

    render() {
      //console.log(this.state.csvfile);
      return (
        <Fragment>
            <h2>Import CSV File!</h2>
            <input className="csv-input" type="file"  name="file" placeholder={null} onChange={this.handleChange}/>
            <p/>
            <button onClick={this.importCSV}> Enviar Datos</button>

            <div style={{ height: '500px', width: '100%' }} className="ag-theme-alpine">
                <DataGrid rows={this.state.csvData} columns={this.state.columnDefs} pageSize={5} checkboxSelection />
            </div>
        </Fragment>
      );
    }
  }
  
  export default FileReader;
  