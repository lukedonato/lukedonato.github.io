var React = require('react');

var NavBar = React.createClass({

  render: function () {
    return (
        <div className = "nav-bar clrfix">
          <ul>
            <li className="ws-header">WorkShop</li>
            <li><a href= "#/add">Add Inventory</a></li>
            <li><a href= "#/shop">Shop</a></li>
            <li><a href= "#/cart">Cart</a></li>
          </ul>
        </div>
    );
  }
});

module.exports = NavBar;
