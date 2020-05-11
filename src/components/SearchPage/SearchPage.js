import React, { Component } from 'react';
import { connect } from "react-redux";
// import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';
import './SearchPage.css';
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

import { Jumbotron} from 'reactstrap';

import { Table } from 'reactstrap';

//word cloud test
// import ReactWordcloud from 'react-wordcloud';
// import words from './words';

import swal from 'sweetalert';

import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;




const mapStateToProps = reduxState => ({
  reduxState
});

class SearchPage extends Component {

  

  componentDidMount() {
    console.log('what is in the counter', this.props.reduxState.searchReducer);

  }

  state = {
    search: "",
    hasSearched: false,
  };

  handleChange = event => {
    this.setState({
      ...this.state,
      search: event.target.value
    });
  };



  handleSubmit = event => {
    console.log(this);
    event.preventDefault();
    console.log('after clicking the submit, the search in the state',this.state.search);
    this.props.dispatch({ type: "GET_TWT", payload: this.state.search });
    this.state.hasSearched = true;
    
  };

  handleSave = (event) => {
    swal("Successful!", "You have saved the pie chart!");
  };

  addToFav = (tweet) => {
    console.log('In addToFav', tweet);
    swal("Successful!", "You have saved the tweet!");
    this.props.dispatch({ type: "POST_FAV", payload: { saved_tweet: tweet  } })
  }

  render() {
    if (this.state.hasSearched && this.props.reduxState.searchReducer.length>0) {
      

      // Canvas component
      const options = {
        theme: "light1",
        animationEnabled: true,
        exportFileName: "Sentiment Result",
        exportEnabled: true,
        title: {
          text: "Sentiment Analysis Result"
        },
        data: [{
          type: "pie",
          startAngle: 75,
          toolTipContent: "<b>{label}</b>: {y}%",
          showInLegend: "true",
          legendText: "{label}",
          indexLabelFontSize: 16,
          indexLabel: "{label} - {y}%",
          dataPoints: [
            // { y: 32, label: "Health" },
            // { y: 22, label: "Finance" },
            // { y: 15, label: "Education" },
            { y: this.props.reduxState.searchReducer[this.props.reduxState.searchReducer.length - 1].counter[1].toFixed(2), label: "Neutral" },
            { y: this.props.reduxState.searchReducer[this.props.reduxState.searchReducer.length - 1].counter[0].toFixed(2), label: "Negative" },
            { y: this.props.reduxState.searchReducer[this.props.reduxState.searchReducer.length - 1].counter[2].toFixed(2), label: "Positive" }
          ]
        }]
      }


        
      // console.log(this.props.reduxState.searchReducer[0].text);
      console.log(this.props.reduxState.searchReducer && this.props.reduxState.searchReducer.length > 0 &&
         this.props.reduxState.searchReducer[this.props.reduxState.searchReducer.length-1].counter.Negative);
      // console.log('what is in the?????', this.props.reduxState.searchReducer[searchReducer.length]); 
      return (
        
          <div className="search">
            <header><h2>Search for a Twitter Keyword!</h2></header>
            <p>Type in any hashtag or keyword and press enter to visualize Tweet Sentiment.</p>
            <div className="input-form">
              <InputGroup >
                <Input size="lg" placeholder="search a keyword" value={this.state.search} onChange={this.handleChange} />
                <InputGroupAddon addonType="append">
                  <Button color="secondary" onClick={this.handleSubmit}>Search!!</Button>
                </InputGroupAddon>
              </InputGroup>
            </div>
            <br/>
          <table><tr>
            
            <th><div style={{ height: 400, width: 600 }}>
              <CanvasJSChart options={options}
              /* onRef={ref => this.chart = ref} */
              />
          </div> </th>
          
          {/* <th>
              <div style={{ height: 400, width: 600 }}>
                <ReactWordcloud words={words} />
              </div>
          </th> */}
            <div>
              {/* <h1>React Pie Chart with Index Labels Placed Inside</h1> */}
              
              {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
          </tr></table>
          
          <br/>
          < Button aligh="right" color="secondary" onClick={this.handleSave}> Save</Button>
          <br />
          <br />
          <br />
            <Table>
              <thead>
                <tr>
                  <th>Tweet Text</th>
                  <th>Sentiment</th>
                  <th>Score</th>
                  <th>Save</th>
                </tr>
              </thead>
              {/* <h1>Showing {this.props.reduxState.searchReducer.pagination.count} of {this.props.reduxState.searchReducer.pagination.total_count}</h1> */}
            {this.props.reduxState.searchReducer.map(tweet => {
              return (
                <>
                  <tbody>
                    {/* <img src={tweet.images.fixed_height_downsampled.url}></img> */}

                    <tr>
                      <td>{tweet.tweet}</td>
                      <td>{tweet.sentiment}</td>
                      <td>{tweet.score}</td>
                      <td><Button variant="contained" color="primary" onClick={(event) => this.addToFav(tweet)} color="secondary" size="sm">Save</Button></td>
                      {/* <td><button variant="contained" color="primary" onClick={(event) => this.addToFav(tweet)}>Save</button></td> */}
                    </tr>
                    
                    {/* <p>{JSON.stringify(tweet.counter)}</p> */}

                    
                  </tbody>
                </>


              );
            })}
            </Table>
          </div>
            
        
      );
    } else {
      return (
        <>
          {/* <div className="search">
            <header><h2>Search for a Twitter Keyword!</h2></header>
            <input value={this.state.search} onChange={this.handleChange} />
            <button variant="contained" color="primary" onClick={this.handleSubmit}>Search</button>
          </div> */}
          <div>
            <Jumbotron>
              <h1 className="display-3">Twitter Sentiment Analyzer</h1>
              <p className="lead">Type in any hashtag or keyword and press enter to visualize Tweet Sentiment.</p>
              <hr className="my-2" />
              <p>This tool can help business to monitor and understand the social sentiment of their brand, product or services. </p>
              <p className="lead">
                <div className="input-form">
                  <br />
                  <br />
                  <InputGroup >
                    <Input size="lg" placeholder="search a keyword" value={this.state.search} onChange={this.handleChange} />
                    <InputGroupAddon addonType="append">
                      <Button color="secondary" onClick={this.handleSubmit}>Search!!</Button>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              </p>
            </Jumbotron>
          </div>
          {/* <header><h2>Adrian Niu!</h2></header> */}
          
          
          
        </>
      );
    }
  }
}

// export default withStyles()(connect(mapStateToProps)(SearchPage));

export default connect(mapStateToProps)(SearchPage);


