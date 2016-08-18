var AppDispatcher = require('../dispatcher/dispatcher');
var ItemConstants = require('../constants/item_constants');

module.exports = {
  addItemInv: function (item) {
    AppDispatcher.dispatch({
        actionType: ItemConstants.ADD_ITEM_INV,
        item: item
    });
  },
  addItemCart: function (item) {
    AppDispatcher.dispatch({
        actionType: ItemConstants.ADD_ITEM_CART,
        item: item
    });
  },
  removeFromCart: function (item) {
    AppDispatcher.dispatch({
      actionType: ItemConstants.REMOVE_ITEM_CART,
      item: item
    });
  }
};
