var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var ItemConstants = require('../constants/item_constants.js');
var InventoryStore = new Store(AppDispatcher);

var _items = {};

var changeQuantity = function(item) {
  if (_items[item.uniqueId]){
    _items[item.uniqueId][2] += parseInt(item.itemQuant);
  } else {
    _items[item.uniqueId] = [item.itemName, parseFloat(item.itemPrice), parseInt(item.itemQuant)];
  }
};

InventoryStore.all = function () {
  return _items;
};

InventoryStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ItemConstants.ADD_ITEM_INV:
    case ItemConstants.ADD_ITEM_CART:
    case ItemConstants.REMOVE_ITEM_CART:
      changeQuantity(payload.item);
      InventoryStore.__emitChange();
      break;
  }
};

module.exports = InventoryStore;
