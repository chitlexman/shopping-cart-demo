;!function() {

  'use strict';

  angular
  .module('app')
  .controller('BasketCtrl', BasketCtrl);

  BasketCtrl.$inject = ['config'];

  function BasketCtrl(config) {
    /*jshint validthis: true */
    var vm = this;

    vm.product = '';
    vm.products = [];
    vm.totalDisc = 0;

    vm.add = add;
    vm.apply = apply;
    vm.remove = remove;

    function add() {
      vm.products.push({
        product: vm.product,
        price: vm.price
      });

      calcTotalDiscount();
      clear();
    };

    function remove(index) {
      vm.products.splice(index, 1);
      calcTotalDiscount();
    }

    function clear() {
      vm.product = '';
      vm.price = '';
    }

    function getTotalAmmount() {
      var totalAmount = 0;

      for (var i = 0; i < vm.products.length; i++ ) {
        totalAmount = totalAmount + vm.products[i].price;
      }
      return totalAmount;
    }

    function getTotalDiscount() {
      return round( getTotalAmmount() * config.discPerc * .01 );
    }

    function calcTotalDiscount() {
      vm.totalDisc = getTotalDiscount();
    }

    function getExpensiveProdIndex() {
      var expProdInd = 0;

      for (var i = 0; i < vm.products.length; i++ ) {
        if ( vm.products[expProdInd].price < vm.products[i].price) {
          expProdInd = i;
        }
      }
      return expProdInd;
    }

    function round(value) {

      switch (config.roundRule) {
        case 'round': return Math.round(value); 
        case 'floor': return Math.floor(value);
        case 'ceil': return Math.ceil(value);
        default: return Math.round(value); 
      }
    }

    function apply() {
      var totalAmount = getTotalAmmount(),
          totalDiscount = getTotalDiscount(),
          expProdInd = getExpensiveProdIndex()
          vm.totalDisc = totalDiscount;

      for (var i = 0; i < vm.products.length; i++ ) {
        if (i != expProdInd) {
          var discount = round(vm.products[i].price * config.discPerc * .01);
          totalDiscount -= discount;
          vm.products[i].discount = discount;
          vm.products[i].discountPrice = vm.products[i].price - discount; // todo remake
        }
      }

      vm.products[expProdInd].discount = totalDiscount;
      vm.products[expProdInd].discountPrice = vm.products[expProdInd].price - totalDiscount;

    };
  }

}();
