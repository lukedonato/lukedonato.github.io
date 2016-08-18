var React = require('react');
var NavBar = require('./../components/NavBar.jsx');


var App = React.createClass({

  render: function() {
    return (
      <div className = "app">
        <header>
          <NavBar/>
        </header>
        {this.props.children}
      </div>
    );
  }

});

module.exports = App;
