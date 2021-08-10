// offering.js is a file that returns a variable of what the restaurant offers.

class Offering {
    constructor() {
        this.menu = [{
                name: 'Pizza (Slice)',
                items: [{
                        name: 'Pepperoni Pizza',
                        price: 3,
                        options: ['chilli flakes', 'extra cheese', 'ranch dressing']
                    },
                    {
                        name: 'Cheese Pizza',
                        price: 3,
                        options: ['chilli flakes', 'extra cheese', 'ranch dressing']
                    },
                    {
                        name: 'Hawaiian Pizza',
                        price: 3,
                        options: ['chilli flakes', 'extra cheese', 'ranch dressing']
                    }
                ]
            },
            {
                name: 'Burgers',
                items: [{
                        name: 'Beef Burger',
                        price: 4,
                        options: ['more sauce', 'more vegetables']
                    },
                    {
                        name: 'Chicken Burger',
                        price: 4,
                        options: ['more sauce', 'more vegetables']
                    },
                    {
                        name: 'Fish Burger',
                        price: 4,
                        options: ['more sauce', 'more vegetables']
                    }
                ]
            },
            {
                name: 'Drinks',
                items: [{
                        name: 'Coffee',
                        price: 2,
                        options: ['hot', 'cold', 'milk', 'less sugar', 'more sugar']
                    },
                    {
                        name: 'Tea',
                        price: 2,
                        options: ['hot', 'cold', 'milk', 'less sugar', 'more sugar']
                    },
                    {
                        name: 'Milo',
                        price: 2,
                        options: []
                    },
                ]
            }
        ]

        // Extract every name is this.menu
        this.categories = this.menu.map(function(item) {
            return item.name;
        })
    }

    searchForItem(itemName){
        let categories = this.categories
        let foundItems = []
        // Traverse through each category, and check if the item is in the category
        for (var i = 0; i < categories.length; i++) {
            this.menu[i].items.forEach((items, j) => {
                if(items.name.toLowerCase().includes(itemName.toLowerCase())){

                    // Copy the objects such that it does not affect the original menu object
                    let fi = {
                        ...items,
                    }

                    fi.name = `${items.name} (${categories[i]})`
                    foundItems.push(fi)
                }
            })
        }

        if(foundItems.length > 0){
            return foundItems;
        }

        // Return false if nothing is found
        return false;
    }

    addItemOnMenu(category, item_name, item_price, item_options){
        // Iterate through categories and get index of where category is found
        var index = this.categories.indexOf(category);
        // If category is found, add item to menu
        if (index > -1) {
            if(!item_options || item_options == ''){
                item_options = []
            }else{
                item_options = item_options.split(",")
            }
            
            this.menu[index].items.push({
                name: item_name,
                price: item_price,
                options: item_options
            });
        }
    }
}

module.exports = Offering