;!function() {

  'use strict';

  angular
  .module('app')
  .controller('BasketCtrl', BasketCtrl);

  function BasketCtrl() {
    /*jshint validthis: true */
    var vm = this;

    vm.product = '';
    vm.products = [{
      product: 'Телефон',
      price: 100
    }, {
      product: 'Магнитофон',
      price: 200,
    }, {
      product: 'Миелофон',
      price: 400
    }];

    vm.totalDiscount = 7;
    vm.totalAmount = getTotalAmount();

    vm.add = add;
    vm.apply = apply;
    vm.remove = remove;

    function add() {
      vm.products.push({
        product: vm.product,
        price: vm.price
      });

      clear();
    };

    function remove(index) {
      vm.products.splice(index, 1);
      calcTotalAmount();
    }

    function clear() {
      vm.product = '';
      vm.price = '';
      calcTotalAmount();
    }

    function calcTotalAmount() {
      vm.totalAmount = getTotalAmount();
    }

    function getTotalAmount() {
      var totalAmount = 0;

      for (var i = 0; i < vm.products.length; i++) {
        totalAmount = totalAmount + vm.products[i].price;
      }
      return totalAmount;
    }

    function getExpensiveProdIndex() {
      var expProdInd = 0;

      for (var i = 0; i < vm.products.length; i++) {
        if ( vm.products[expProdInd].price < vm.products[i].price) {
          expProdInd = i;
        }
      }
      return expProdInd;
    }

    function apply() {
      var expProdInd = getExpensiveProdIndex();
      var discountPerc, discount, sum = 0;

      for(var i = 0; i < vm.products.length; i++) {
        sum += vm.products[i].discount = Math.floor(vm.products[i].price / vm.totalAmount * vm.totalDiscount);
        vm.products[i].discountPrice = vm.products[i].price - vm.products[i].discount;
      }

      vm.products[expProdInd].discount += vm.totalDiscount - sum;
      vm.products[expProdInd].discountPrice = vm.products[expProdInd].price - vm.products[expProdInd].discount;
    };
  }

}();
