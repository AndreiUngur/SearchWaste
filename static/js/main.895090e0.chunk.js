(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{146:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(16),c=a.n(s),i=(a(58),a(47)),o=a(48),l=a(51),u=a(49),d=a(52),h=a(24),f=a.n(h);a(60),a(62);function m(e){return e.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#039;/g,"'")}var p=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={data:[],searchResults:[],searchText:""},a}return Object(d.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000").then(function(e){return e.json()}).then(function(t){return e.setState({data:t.map(function(e,t){return e.index=t,e})})})}},{key:"findKeywordsInText",value:function(e,t){return e.split(", ").some(function(e){return t.includes(e)})||t.split(" ").some(function(t){return e.includes(t)})}},{key:"manageSearch",value:function(e){var t=this;""!==this.state.searchText&&this.setState({searchResults:this.state.data.filter(function(e){return t.findKeywordsInText(e.keywords,t.state.searchText)})})}},{key:"manageFavourites",value:function(e,t){this.state.data[t.index].favorite?(this.state.data[t.index].color="#000000",this.state.data[t.index].favorite=!1):(this.state.data[t.index].color="#237e7f",this.state.data[t.index].favorite=!0),this.forceUpdate()}},{key:"manageTextBoxChange",value:function(e){this.setState({searchText:e.target.value}),""===e.target.value&&this.setState({searchResults:[]})}},{key:"renderFavouritesHeaderText",value:function(){return 0===this.state.data.filter(function(e){return e.favorite}).length?"":"Favourites"}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},"Toronto Waste Lookup"),r.a.createElement("div",{className:"App-searchbar"},r.a.createElement("input",{text:!0,value:this.state.searchText,onChange:function(t){return e.manageTextBoxChange(t)},className:"App-searchbox"}),r.a.createElement(f.a,{type:"submit",onClick:function(t){return e.manageSearch(t)},variant:"contained",style:{backgroundColor:"#237e7f",fontSize:"24px"}},r.a.createElement("i",{class:"fa fa-search icon-flipped"}))),r.a.createElement("div",{className:"App-results"},this.state.searchResults.map(function(t){return r.a.createElement("div",{class:"row result"},r.a.createElement("div",{class:"col-left"},r.a.createElement(f.a,{onClick:function(a){return e.manageFavourites(a,t)},style:{fontSize:"24px",color:t.color}},r.a.createElement("i",{class:"fa fa-star"})),r.a.createElement("span",{class:"title"},t.title)),r.a.createElement("div",{class:"col-right",dangerouslySetInnerHTML:{__html:m(t.body)}}))})),r.a.createElement("div",{className:"App-favourites"},r.a.createElement("h1",{className:"App-favourites-header"},this.renderFavouritesHeaderText),this.state.data.filter(function(e){return e.favourite}).map(function(t){return r.a.createElement("div",{class:"row result"},r.a.createElement("div",{class:"col-left"},r.a.createElement(f.a,{onClick:function(a){return e.manageFavourites(a,t)},style:{fontSize:"24px",color:t.color}},r.a.createElement("i",{class:"fa fa-star"})),r.a.createElement("span",{class:"title"},t.title)),r.a.createElement("div",{class:"col-right",dangerouslySetInnerHTML:{__html:m(t.body)}}))})))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(p,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},53:function(e,t,a){e.exports=a(146)},58:function(e,t,a){},62:function(e,t,a){}},[[53,2,1]]]);
//# sourceMappingURL=main.895090e0.chunk.js.map