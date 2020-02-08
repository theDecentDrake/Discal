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
    this.state.costs.forEach((x) => sum1 += x ? parseInt(x) : 0)

    //console.log(sum1);

    if (sum1 === NaN) {
      return
    }

    var discountedPrice = (parseInt(sum1) - parseInt(this.state.discount || 0)) + parseInt(this.state.tax || 0);//100 - 30 = 70
    console.log(discountedPrice)
    // let costPercent;
    // let netCost;
    let effectiveCosts = this.state.costs.map(function (el, index) {

      let costPercent = (el / sum1) * 100
      console.log(Math.round(costPercent))
      let netCost = (costPercent / 100) * discountedPrice
      console.log(Math.round(netCost))

      return Math.round(netCost)
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
      () => { this.calculate(); console.log(this.state.discount) }
    )

  }
  handleTax = (e) => {
    this.setState(
      {
        tax: e.target.value
      },
      () => { this.calculate(); console.log(this.state.tax) }
    )

  }


  addClick1() {
    this.setState(
      { costs: [...this.state.costs, ''] }
    )
  }
  handleChange1(e, index) {
    this.state.costs[index] = e.target.value
    this.setState({ costs: this.state.costs },
      () => { this.calculate(); }
    )

  }
  handleRemove1(e, index) {
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
              <h1 style={{ fontFamily: 'Open Sans', fontSize: '48px', fontWeight: 'bold' }}>Discal
              <span style={{ fontFamily: 'Open Sans', fontSize: '15px', fontWeight: 'normal', fontStyle: 'italic', color: 'green', marginLeft: '10px' }}>Helps to find the discounted price</span>
              </h1>
            </Col>
            <Col xs={6} className='verticalLine'>
              <Row>
                <Col xs={12}><h2 className='columnFont'>Items</h2></Col>
              </Row>
              {
                this.state.costs.map((cost, index) => {

                  return (
                    <Row key={index} bottom='xs'>
                      <Col xs={4}><input type="text" placeholder={'Item Name'} className='calcInput' /></Col>
                      <Col xs={4}><input type="number" placeholder={'Enter Amount:'} size="20" onChange={(e) => this.handleChange1(e, index)} value={cost} className='calcInput rupee' /></Col>
                      <Col xs={4}>
                        {(this.state.costs.length === 1)
                          ? <button disabled={true} onClick={(e) => this.handleRemove1(e)} className='deleteButtons disabledButtons' >Delete</button>
                          : <button onClick={(e) => this.handleRemove1(e, index)} className='deleteButtons' >Delete</button>}
                      </Col>
                    </Row>
                  )
                }
                )
              }
              <Row>
                <Col xs={3}><button onClick={(e) => this.addClick1(e)} className='addNewButtons' >Add More</button></Col>
                <Col xs={5}><p style={{textAlign: 'left', fontSize: '30px', fontWeight: 'bold'}}>Total Amount:</p></Col>
                <Col xs={4}><h1 name='total' className='calcInput columnFont totalRupee'>{parseInt(this.state.costs) && parseInt(this.state.costs.map(x => sum1 += x ? parseInt(x) : 0)) && parseInt(sum1) || 0}</h1></Col>
              </Row>
            </Col>
            <Col xs={5} xsOffset={1}>
              <Row>
                <Col xs={12}><h2 className='columnFont'>Effective Price</h2></Col>
              </Row>
              {
                newCosts.map((cost, index) => {
                  return (
                    <Row key={index}>
                      <Col xs={8}><h1 name='effectivePrice' className='calcInput columnFont effectivePrice'>{cost || 0}</h1></Col>
                      <Col xs={4}></Col>
                    </Row>
                  )
                })
              }
            </Col>
            <Col xs={12}>
              <Row>
                <Col xs={12}>
                 <Row>
                  <Col xs={3}><h2 className='columnFont'>Total Discount:</h2></Col>
                  <Col xs={3}><input type="number" placeholder='Enter Discount Amount' value={this.state.discount} name="discount" onChange={this.handleDiscount} className='discountInput rupee' /></Col>
                </Row>
                <Row>
                  <Col xs={3}><h2 className='columnFont'>Total Tax:</h2></Col>
                  <Col xs={3}><input type="number" placeholder='Enter Tax Amount' value={this.state.tax} name="tax" onChange={this.handleTax} className='taxInput rupee' /></Col>
                </Row>
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