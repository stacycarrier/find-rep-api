import React from 'react';
import {render} from 'react-dom';

var App = React.createClass({
    getInitialState: function () {
        return {
            searchResults: []
        }
    },
    showResults: function (response) {
        this.setState({
            searchResults: response.results
        })
    },

    search: function (URL) {
        $.ajax({
            type: "GET",
            dataType: 'jsonp',
            url: URL,
            success: function (response) {
                this.showResults(response);
            }.bind(this)
        });
    },


    render: function(){
        return (
            <div>
                <SearchBox search={this.search} />
                <Results searchResults={this.state.searchResults} />
            </div>
        );
    }
});

var SearchBox = React.createClass({
    render: function(){
        return (
            <div>
                <h2>Who represents You in the U.S. Congress?</h2>
                <h3>Enter Your State to Find Out</h3>
                <input type="text" ref="query" />
                <select ref="category">
                    <option value="sens">Senators</option>
                    <option value="reps">House of Representatives</option>
                </select>
                <input type="submit" onClick={this.createAjax} />
            </div>
        );
    },
 createAjax: function () {
     var query = ReactDOM.findDomNode(this.refs.query).value;
     var category = ReactDOM.findDOMNode(this.refs.category).value;
     var URL = 'http://whoismyrepresentative.com/getall_' + category + '_bystate.php?state=' + query + '&output=json';
     this.props.search(URL)
 }

});

var Results = React.createClass({
    render: function(){
        var resultItems = this.props.searchResults.map(function (result) {
            return <ResultItem  repNames={result.name} />
        });
        return(
            <ul>
                {resultItems}
            </ul>
        );
    }
});

var ResultItem = React.createClass({
    render: function(){
        return <li>{this.props.repNames}</li>;
    }
});

render(<App />,  document.getElementById("content"));