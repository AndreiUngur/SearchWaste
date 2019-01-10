import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';


function escapeHtml(unsafe) {
  return unsafe
       .replace(/&amp;/g,'&')
       .replace(/&lt;/g, '<')
       .replace(/&gt;/g, '>')
       .replace(/&quot;/g, '"')
       .replace(/&#039;/g,"'");
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    fetch(`https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=10`)
    .then(result=>result.json())
    .then(items=>this.setState({data: items}))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        Toronto Waste Lookup
        </header>
        <div className="App-searchbar">
          <input text className="App-searchbox"></input>
          <Button type="submit" variant="contained" style={{backgroundColor: "#237e7f", fontSize: '24px'}}>
            <i class="fa fa-search icon-flipped"></i>
          </Button>
        </div>
        <div className="App-results">
        {this.state.data.map(function(i){
          return <div class="row result">
                  <div class="col-left">
                    <Button><i class="fa fa-star"></i></Button>
                    <span class="title">{i.title}</span>
                  </div>
                  <div class="col-right" dangerouslySetInnerHTML={{ __html: escapeHtml(i.body) }}></div>
                </div>
        })}
        </div>
      </div>
    );
  }
}

export default App;
