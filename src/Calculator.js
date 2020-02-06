import React from 'react';
import { Row, Col, Grid } from 'react-flexbox-grid'

// var person = {
//   firstName: 'Faiz',
//   lastName: 'Khan',
//   fullName: function (){
//     return this.firstName + " " + this.lastName
//   }
//   }
//   console.log(person.fullName())
export class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      costs: [''],
      discount: '',
      tax: '',
      newCosts: [null],
    };
    this.calculate = this.calculate.bind(this);
  }


  calculate(e) {

    let sum1 = 0;
    //console.log(this.state)
    this.state.costs.map((x) => sum1 += parseInt(x))

    //console.log(sum1);

    if (sum1 === NaN) {
      return
    }

    var discountedPrice = (parseInt(sum1) - parseInt(this.state.discount || 0)) + parseInt(this.state.tax || 0);//100 - 30 = 70

    // let costPercent;
    // let netCost;
    let effectiveCosts = this.state.costs.map(function (el, index) {

      let costPercent = (parseInt(el) / parseInt(sum1)) * 100
      let netCost = (parseInt(costPercent) / 100) * parseInt(discountedPrice)

      return netCost
    });

    this.setState({
      newCosts: effectiveCosts
    })

  }

  handleDiscount = (e) => {
    this.setState(
      {
        discount: e.target.value
      },
      () => { this.calculate(); }
    )
  }
  handleTax = (e) => {
    this.setState(
      {
        tax: e.target.value
      },
      () => { this.calculate(); }
    )
  }


  addClick1() {
    this.setState(
      { costs: [...this.state.costs, ""] }
    )
  }
  handleChange1(e, index) {
    this.state.costs[index] = e.target.value
    this.setState({ costs: this.state.costs },
      () => { this.calculate(); }
    )

  }
  handleRemove1(index) {
    this.state.costs.splice(index, 1)

    console.log(this.state.costs, "$$$$");

    this.setState({ costs: this.state.costs },
      () => { this.calculate(); }
    )
  }

  render() {
    let sum1 = 0;
    let newCosts = this.state.newCosts;
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12}>
              <h1 style={{ fontFamily: 'Open Sans', fontSize: '48px', fontWeight: 'bold' }}>Discal</h1>
            </Col>
            <Col xs={6} className='verticalLine'>
              <Row>
                <Col xs={12}><h2 className='columnFont'>Items</h2></Col>
              </Row>
              {
                this.state.costs.map((cost, index) => {

                  return (
                    <Row key={index} bottom='xs'>
                      <Col xs={8}><input placeholder={'Item' + " " + (index + 1)} onChange={(e) => this.handleChange1(e, index)} value={cost} className='calcInput' /></Col>
                      <Col xs={4}>
                        {(this.state.costs.length === 1)
                          ? <button disabled={true} onClick={(e) => this.handleRemove1(e)} className='deleteButtons disabledButtons' >Delete</button>
                          : <button onClick={(e) => this.handleRemove1(e)} className='deleteButtons' >Delete</button>}
                      </Col>
                    </Row>
                  )
                }
                )
              }
              <Row>
                <Col xs={4}><button onClick={(e) => this.addClick1(e)} className='addNewButtons' >Add More</button></Col>
                <Col xs={8}></Col>
              </Row>
            </Col>
            <Col xs={5} xsOffset={1}>
              <Row>
                <Col xs={12}><h2 className='columnFont'>Effective Price</h2></Col>
              </Row>
              {
                this.state.newCosts.map((cost, index) => {
                  return (
                    <Row key={index}>
                      <Col xs={8}><h1 className='calcInput columnFont'>{cost || ('Item' + " " + (index + 1))}</h1></Col>
                      <Col xs={4}></Col>
                    </Row>
                  )
                })
              }
            </Col>
            <Col xs={12}>
              <Row>
                <Col xs={6}>
                  <Col xs={12}><h2 className='columnFont'>Total Discount</h2></Col>
                  <Col xs={6}><input placeholder='Enter Discount' type="text" value={this.state.discount} name="discount" onChange={this.handleDiscount} className='discountInput' /></Col>

                </Col>
                <Col xs={5} xsOffset={1}>
                  <Col xs={12}><h2 className='columnFont'>Total Tax</h2></Col>
                  <Col xs={6}><input placeholder='Enter Tax' type="text" value={this.state.tax} name="tax" onChange={this.handleTax} className='taxInput' /></Col>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
        <div className='footer'>Created by - Faiz Ahmad Khan</div>
      </div>
    );
  }
}

//<h1>{parseInt(this.state.costs) && parseInt(this.state.costs.map(x => sum1 += parseInt(x))) && parseInt(sum1)}</h1>