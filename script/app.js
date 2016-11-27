(function() {
  'use strict';

angular.module('BuyApp',[])
.controller('BuyController', BuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ItemsListService', ItemsListService)

//it could simply be done with two arrays after controllers instead of this service, but the rules are rules

BuyController.$inject=['ItemsListService'];
function BuyController (ItemsListService){
  var buyList =this;
  buyList.items = ItemsListService.getItems();
  buyList.buyFunc=function(index){
    ItemsListService.buyFunc(index);
  }
}

AlreadyBoughtController.$inject=['ItemsListService'];
function AlreadyBoughtController(ItemsListService){
var boughtList=this;
  boughtList.items = ItemsListService.getBoughtItems();//['eggs','milk'];
  boughtList.cancelBuyFunc = function(index){
    ItemsListService.cancelBuyFunc(index);
  }
}

function ItemsListService(){
var service = this;
var items = [{name:'Cookies', quantity: 10}, {name:'Marmelade', quantity: 3}, { name: 'Chocolade', quantity: 5}, {name: 'Wine', quantity: 4}, {name: 'eggs', quantity: 20}];
var boughtItems =[];

service.buyFunc = function(index){
  boughtItems.push(items[index]);
  items.splice(index,1);

}

service.cancelBuyFunc = function(index){
  items.push(boughtItems[index]);
  boughtItems.splice(index,1);


}

service.getItems = function(){
  return items;
}

service.getBoughtItems = function(){
  return boughtItems;
}

}

  })();
