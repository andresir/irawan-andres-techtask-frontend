import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import Datepicker from './components/Datepicker';

class App extends Component {
  constructor() {
    super();
    var today = new Date(),
      date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + (today.getDate());
    this.state = {
      date: date
    };
  }

  render() {
    return (
      <div className='w-25 py-5 my-5 mx-auto' style={{ minWidth: '60%' }}>
        <Alert color="primary">
          <font className="alert-link">REKOMENDASI RESEP MASAKAN</font>
        </Alert>
        <Datepicker label='Tanggal' value={this.state.date} />
      </div>
    );
  }
}

export default App;
