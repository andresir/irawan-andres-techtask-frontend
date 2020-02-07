import React from 'react';
import { Card, Alert, CardHeader, CardFooter } from 'reactstrap';
import axios from 'axios';
import  CheckBox  from './checkbox';
import Recipes from './recipes';

class Showdata extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      arrCheckeds: [],
      arrDataRecipes: [],
      notifCheked: false,
      notifExpiredDate: false
    };
  }

  onBtnIngredients = () => {
    axios.get('https://lb7u7svcm5.execute-api.ap-southeast-1.amazonaws.com/dev/ingredients')
    .then((res) => {
      let datas = [];
      res.data.map(item => {
        if (this.props.date <= item['use-by']) {
          item.isChecked = false;
          datas.push(item) 
        } else {
          this.setState({
            notifExpiredDate: true
          })
          return this.notifExpDate();
        }
      })
      this.setState({
        data: datas
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  notifExpDate = () => {
    let dates = new Date(this.props.date).toDateString();
    if (this.state.notifExpiredDate) {
      return (
        <div>
          <Alert color="danger">
            <font className="alert-link">Tanggal {dates}, tidak ada persediaan bahan masakan, atau bahan Anda sudah expired!</font>
          </Alert>
        </div>
      )
    }
  }

  handleCheckChieldElement = (event) => {
    let data = this.state.data;
    data.map(item => {
      if (item.title === event.target.value){
        item.isChecked =  event.target.checked
      }
    })
    this.setState({
      data: data
    })
    let dataCheckeds = this.state.data;
    let checkeds = [];
    dataCheckeds.map(item => {
      if (item.isChecked === true) {
        checkeds.push(item.title)
      }
    })
    this.setState({
      arrCheckeds: checkeds
    })
  }

  alert = () => {
    if (this.state.notifCheked) {
      return (
        <div>
          <Alert color="danger">
            <font className="alert-link">Anda belum memilih bahan! Silahkan pilih bahan terlebih dahulu.</font>
          </Alert>
        </div>
      )
    }
  }

  onBtnRecipesSubmit = () => {
    this.setState({
      notifCheked: false
    })
    let dataParams = this.state.arrCheckeds.toString();
    if (dataParams.length === 0) {
      this.setState({
        notifCheked: true
      })
      return this.alert();
    }
    axios.get('https://lb7u7svcm5.execute-api.ap-southeast-1.amazonaws.com/dev/recipes/?ingredients='+dataParams)
    .then((res) => {
      this.setState({
        arrDataRecipes: res.data
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  dataRecipes = () => {
    let count = 1;
    let objRecipes = this.state.arrDataRecipes.map((item) => {
      return (
        <div>
          <Card body outline color='primary'>
            <CardHeader><b>REKOMENDASI RESEP {count++}</b></CardHeader>
          </Card>
          <Card body>
            <CardHeader><b>{item.title}</b></CardHeader>
          </Card>
          <ul className='list-group'>
          {
            item.ingredients.map((bahan) => {
              return (<Recipes title={bahan} />)
            })
          }
          </ul>
        </div>
      )
    })
    return objRecipes;
  }

  bodyIngredients = () => {
    if (this.state.data.length > 0 && this.state.arrDataRecipes.length === 0) {
      return (
        <div>
          <Card body outline>
            <CardHeader><b>Silahkan Pilih Bahan Masakan :</b></CardHeader>
          </Card>
          <ul className='list-group'>
          {
            this.state.data.map((bahan) => {
              return (<CheckBox handleCheckChieldElement={this.handleCheckChieldElement} {...bahan} />)
            })
          }
          </ul>
          <Card>
            <CardFooter><button type='button' className='btn btn-secondary btn-sm float-right' onClick={this.onBtnRecipesSubmit}>Request Resep »</button></CardFooter>
          </Card>
        </div>
      )
    }
  }

  btn = () => {
    if (this.state.arrDataRecipes.length === 0) {
      return <button type='button' className='btn btn-primary btn-sm float-right' onClick={this.onBtnIngredients}>Request Bahan</button>
    }
    return (
      <div>
        <a href='/'>
          <button type='button' className='btn btn-primary btn-sm float-right'>Back</button>
        </a>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.btn()}
        <div className='clearfix' />
        {this.alert()}
        <div className='clearfix' />
        {this.bodyIngredients()}
        {this.dataRecipes()}
        {this.notifExpDate()}
      </div>
    );
  }
}

export default Showdata;
