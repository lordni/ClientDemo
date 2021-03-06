'use strict';

var app = app || {};

(function (){

	app.productModule = {
		create: function (http) {
			return {
				mapProduct: function(productName) {
					var productMap = {
						'produkt-1': '2f40e0f6-80ad-4110-9cb9-67f814fe6576',
						'produkt-2': '7797efff-99bf-4a88-a503-0b30f421a07d',
						'produkt-3': '9b9032ac-0aae-4739-b6bb-49b1847bdcc1',
					}
					
					return productMap[productName];
				}
			};
		}
	};
})();
