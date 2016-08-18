//React
var React = require('react');
var ReactDOM = require('react-dom');

//Router
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;

//Components
var App = require('./components/App');
var Shop = require('./components/Shop');
var AddForm = require('./components/AddForm');
var Cart = require('./components/Cart');

//testing

var InventoryStore = require('./stores/inventory_store');


var Router = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={AddForm}/>
      <Route path="add" component={AddForm}/>
      <Route path="shop" component={Shop}/>
      <Route path="cart" component={Cart}/>
    </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', function(){
  var root = document.getElementById('content');
  ReactDOM.render(Router, root);
});
