import React, { Fragment } from 'react';
import Papa from 'papaparse';

class FileReader extends React.Component {
    state = {
        csvFile: undefined,
        columnDefs: []
    }
    
    handleChange = event => {
        this.setState({
            csvfile: event.target.files[0]
        });
    };
  
    importCSV = () => {
        const { csvfile } = this.state;
        if(csvfile !== undefined){
            Papa.parse(csvfile, {
                complete: (results) => {this.saveData(results)},
                header: true
              });
        }
        else{
            alert('Favor de seleccionar un dataset')
        }
    };
    
    saveData = (results) => { 
        const { columnDefs } = this.state;

        //Aqui genera las columnas
        for(let i = 0; i < results.meta['fields'].length; i++){
            columnDefs.push({headerName: results.meta['fields'][i].toString(), field: results.meta['fields'][i]})
        }

        this.setState({columnDefs: columnDefs}, () => {
            this.props.history.push({
                pathname: "/main",
                data: {
                    columnas: columnDefs,
                    datos: results.data
                }})
        })
    }

    render() {
      //console.log(this.state.csvfile);
      const { columnDefs , csvData} = this.state;
      return (
        <Fragment>
            <h2>Import CSV File!</h2>
            <input className="csv-input" type="file"  name="file" placeholder={null} onChange={this.handleChange}/>
            <p/>
            <button onClick={this.importCSV}> Enviar Datos</button>
        </Fragment>
      );
    }
  }
  
  export default FileReader;
  