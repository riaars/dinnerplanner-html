/** ExampleView Object constructor
 * 
 * This object represents the code for one specific view (in this case the Example view). 
 * 
 * It is responsible for:
 * - constructing the view (e.g. if you need to create some HTML elements procedurally) 
 * - populating the view with the data
 * - updating the view when the data changes
 * 
 * You should create a view Object like this for every view in your UI.
 * 
 * @param {jQuery object} container - references the HTML parent element that contains the view.
 * @param {Object} model - the reference to the Dinner Model
 */
var SummaryView = function(container, model) {

    /**
     * We use the @method find() on @var {jQuery object} container to look for various elements 
     * inside the view in orther to use them later on. For instance:	
     * 
     * @var {jQuery object} numberOfGuests is a reference to the <span> element that 
     * represents the placeholder for where we want to show the number of guests. It's
     * a reference to HTML element (wrapped in jQuery object for added benefit of jQuery methods)
     * and we can use it to modify <span>, for example to populate it with dynamic data (for now 
     * only 'Hello world', but you should change this by end of Lab 1).
     * 
     * We use variables when we want to make the reference private (only available within) the
     * ExampleView.
     * 
     * IMPORTANT: Never use $('someSelector') directly in the views. Always use container.find
     * or some other way of searching only among the containers child elements. In this way you
     * make your view code modular and ensure it dosn't break if by mistake somebody else
     * in some other view gives the same ID to another element.
     * 
     */
     var totalGuests = model.getNumberOfGuests();
    


    // Select option for guests number
    var numberOfGuests = container.find(".guest");
    for (var i = 1; i < 10; i++) {
        numberOfGuests.append(`<option value="${i}" ${(i===1)?"selected":""}>${i}</option>`);
    }

    // Dropdown Select for Dishes Type
    var dishType = container.find('#dishType');
    var arrDishes = model.getDishType();
    arrDishes.splice(0, 0, 'all');
    arrDishes = arrDishes.map(dish => {
        return dish.replace(
            /\w\S*/g,
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    });


   
    for (var i = 0; i < arrDishes.length; i++) {
        dishType.append(`<li class="dropdown-item">${arrDishes[i]}</a></li>`);
    }


    // Total Cost
    var totalCost = container.find('.totalCost');
    totalCost.html(`SEK 0.00`)
    console.log(arrDishes);

    
    // ===========================
    // 	 summary.html 
    // ===========================


    //LOAD DATA MENU OVERVIEW
    var loadAllMenuOverview = function() {
        var selectedMenu = container.find("#selected-wrapper");
        var allMenu = model.getFullMenu();
        console.log(allMenu);
        allMenu.forEach(dish => {
            selectedMenu.append(`
			<div class="col-sm-6 col-md-3">				
					<div class="menu">
						<img src="images/${dish.image}" alt="${dish.name}">
						<div class="caption">
							<h5>${dish.name}</h5>
						</div>
					</div>
				
						<div class="caption" style="padding-top: 5px">
							<h6 class="text-danger" style="text-align: right;">${
                        Number(
                            dish.ingredients.map(ingredient => {
                                return ingredient.quantity * ingredient.price;
                            })
                            .reduce((acc, cur) => {
                                return acc + cur;
                            })
                        ).toFixed(2)*totalGuests
                    } SEK</h6>
						</div>
					</div>
				`)
        })
    }

    loadAllMenuOverview();

    //LOAD TOTAL GUEST
    var totalGuest = container.find("#guestOverview");
    totalGuest.append(`My Dinner: ${totalGuests}  People`);
    


    //LOAD TOTAL PRICE OF SELECTED MENU ON OVERVIEW
    var getTotalMenuPrice = function() {
        console.log(model.getNumberOfGuests());
        var priceAcc = container.find("#totalPrice");
        var totalPrice = model.getTotalMenuPrice();
        priceAcc.append(`
		${Number(totalPrice).toFixed(2)} SEK`);
    }
    getTotalMenuPrice();



    /**
     * When we want references to some view elements to be available from outside of view, we 
     * define them as this.someName. We don't need this in Lab 1 yet, but in Lab 2 it 
     * will be important for assigning listeners to these buttons, because the listeners
     * should not be assigned in the view, but rather in controller.
     * 
     * We can then, in some other code, use exampleView.plusButton to reference the 
     * this button and do something with it (see Lab 2).
     * 
     */
  




}