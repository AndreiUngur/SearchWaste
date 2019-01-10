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
      data: [],
      searchResults: [],
      searchText: ""
    };
  }

  componentDidMount() {
    fetch(`https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000`)
    .then(result=>result.json())
    .then(items=>this.setState({data: items.map((i, index) => {i.index = index; return i;})}))
  }

  handleClick(e, i){
    if (this.state.data[i.index].favorite){ 
      this.state.data[i.index].color = "#000000";
      this.state.data[i.index].favorite = false;
    } else {
      this.state.data[i.index].color = "#237e7f";
      this.state.data[i.index].favorite = true;     
    }
    this.forceUpdate();
  }

  validateText(keywords, text){
    return keywords.split(", ").some(i => text.includes(i)) || text.split(" ").some(i => keywords.includes(i))
  }

  handleSecondClick(e){
    if (this.state.searchText === ""){
      return;
    }

    this.setState({searchResults: this.state.data.filter(i => this.validateText(i.keywords, this.state.searchText))});
  }

  handleChange(event){
    this.setState({searchText: event.target.value});
    if (event.target.value === ""){
      this.setState({searchResults: []});
    }
  }

  renderIfFavorites(){
    if (this.state.data.filter(i => i.favorite).length > 0){
      return "Favorites"
    }
    return "None"
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        Toronto Waste Lookup
        </header>
        <div className="App-searchbar">
          <input text value={this.state.searchText} onChange={(e) => this.handleChange(e)} className="App-searchbox"></input>
          <Button type="submit" onClick={(e) => this.handleSecondClick(e)} variant="contained" style={{backgroundColor: "#237e7f", fontSize: '24px'}}>
            <i class="fa fa-search icon-flipped"></i>
          </Button>
        </div>
        <div className="App-results">
        {this.state.searchResults.map(i => {
          return <div class="row result">
                  <div class="col-left">
                    <Button onClick={(e) => this.handleClick(e, i)} style={{fontSize: '24px', color: i.color}}><i class="fa fa-star"></i></Button>
                    <span class="title">{i.title}</span>
                  </div>
                  <div class="col-right" dangerouslySetInnerHTML={{ __html: escapeHtml(i.body) }}></div>
                </div>
          }, this)
        }
        </div>
        <div className="App-favorites">
          <h1 className="App-favorites-header">{this.state.data.filter(i => i.favorite).length === 0 ? "" : "Favorites"}</h1>
        {this.state.data.filter(i => i.favorite).map(i => {
          return <div class="row result">
                  <div class="col-left">
                    <Button onClick={(e) => this.handleClick(e, i)} style={{fontSize: '24px', color: i.color}}><i class="fa fa-star"></i></Button>
                    <span class="title">{i.title}</span>
                  </div>
                  <div class="col-right" dangerouslySetInnerHTML={{ __html: escapeHtml(i.body) }}></div>
                 </div>
          })
        }
        </div>
      </div>
    );
  }
}

export default App;
