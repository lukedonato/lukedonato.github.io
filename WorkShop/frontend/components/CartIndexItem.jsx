var React = require('react');
var ClientActions = require('./../actions/client_actions');

var CartIndexItem = React.createClass({
  handleRemove: function () {
    var itemData = {};
    itemData.uniqueId = this.props.uniqueId;
    itemData.itemQuant = this.props.indexItem[2];
    ClientActions.removeFromCart(itemData);
  },
  render: function () {
    var total = (this.props.indexItem[1]*this.props.indexItem[2]).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

    return (
      <li className="index-item clrfix">
        <div className="float-left">
          {this.props.indexItem[0]} <br/><br/>
          {"Price    $" + this.props.indexItem[1]} <br/>
          {"Quantity    " + this.props.indexItem[2]} <br/><br/>
          {"Total    $" + total}
        </div>
        <div className="float-right">
          <button onClick={this.handleRemove}>Remove from Cart</button>
        </div>
      </li>
    );
  }
});

module.exports = CartIndexItem;
