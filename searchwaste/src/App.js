import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

/**
 * Converts string with escaped HTML characters
 * to regular string.
 * @param {string} unsafe 
 */
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

  /**
   * Fetches data from Toronto Waste API and stores it in `state`.
   */
  componentDidMount() {
    fetch(`https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000`)
    .then(result=>result.json())
    .then(items=>this.setState({data: items.map((item, index) => {item.index = index; return item;})}))
  }

  /**
   * Searches whether the user's text appears in a set of keywords.
   * @param {string} keywords 
   * @param {string} text 
   */
  findKeywordsInText(keywords, text){
    return keywords.split(", ").some(item => text.includes(item)) || text.split(" ").some(item => keywords.includes(item))
  }

  /**
   * Stores search results in `state`.
   * Used with the search bar button.
   * @param {Object} e 
   */
  manageSearch(e){
    if (this.state.searchText === ""){
      return;
    }

    this.setState({searchResults: this.state.data.filter(item => this.findKeywordsInText(item.keywords, this.state.searchText))});
  }

  /**
   * Tracks whether an item is considered a `favourite` or not.
   * Used with the star button.
   * @param {Object} e 
   * @param {Object} item 
   */
  manageFavourites(e, item){
    if (this.state.data[item.index].favorite){ 
      this.state.data[item.index].color = "#000000";
      this.state.data[item.index].favorite = false;
    } else {
      this.state.data[item.index].color = "#237e7f";
      this.state.data[item.index].favorite = true;     
    }
    this.forceUpdate();
  }

  /**
   * Detects changes to search bar input and clears search results
   * when search bar is empty.
   * @param {Object} event 
   */
  manageTextBoxChange(event){
    this.setState({searchText: event.target.value});
    if (event.target.value === ""){
      this.setState({searchResults: []});
    }
  }

  /**
   * Returns label for `Favourites` header if favourites exist.
   */
  renderFavouritesHeaderText(){
    return this.state.data.filter(item => item.favorite).length === 0 ? "" : "Favourites";
  }

  render() {
    return (
      <div className="App">

        <header className="App-header">
        Toronto Waste Lookup
        </header>

        <div className="App-searchbar">

          <input text value={this.state.searchText} onChange={(e) => this.manageTextBoxChange(e)} className="App-searchbox"></input>
          <Button type="submit" onClick={(e) => this.manageSearch(e)} variant="contained" style={{backgroundColor: "#237e7f", fontSize: '24px'}}>
            <i class="fa fa-search icon-flipped"></i>
          </Button>

        </div>

        <div className="App-results">
        
          {this.state.searchResults.map(result => {
            return <div class="row result">
                    <div class="col-left">
                      <Button onClick={(e) => this.manageFavourites(e, result)} style={{fontSize: '24px', color: result.color}}>
                        <i class="fa fa-star"></i>
                      </Button>
                      <span class="title">{result.title}</span>
                    </div>
                    <div class="col-right" dangerouslySetInnerHTML={{ __html: escapeHtml(result.body) }}/>
                  </div>
            })
          }

        </div>

        <div className="App-favourites">

          <h1 className="App-favourites-header">{this.renderFavouritesHeaderText}</h1>
          {this.state.data.filter(item => item.favourite).map(favourite => {
            return <div class="row result">
                    <div class="col-left">
                      <Button onClick={(e) => this.manageFavourites(e, favourite)} style={{fontSize: '24px', color: favourite.color}}>
                        <i class="fa fa-star"></i>
                      </Button>
                      <span class="title">{favourite.title}</span>
                    </div>
                    <div class="col-right" dangerouslySetInnerHTML={{ __html: escapeHtml(favourite.body) }}/>
                   </div>
            })
          }

        </div>
      </div>
    );
  }
}

export default App;
