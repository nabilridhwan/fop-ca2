// offering.js is a file that returns a variable of what the restaurant offers.

class Offering {
    constructor() {
        this.menu = [{
                name: 'Pizza (Slice)',
                items: [{
                        name: 'Pepperoni',
                        price: 3,
                        options: ['chilli flakes', 'extra cheese', 'ranch dressing']
                    },
                    {
                        name: 'Cheese',
                        price: 3,
                        options: ['chilli flakes', 'extra cheese', 'ranch dressing']
                    },
                    {
                        name: 'Hawaiian',
                        price: 3,
                        options: ['chilli flakes', 'extra cheese', 'ranch dressing']
                    }
                ]
            },
            {
                name: 'Burgers',
                items: [{
                        name: 'Beef',
                        price: 4,
                        options: ['more sauce', 'more vegetables']
                    },
                    {
                        name: 'Chicken',
                        price: 4,
                        options: ['more sauce', 'more vegetables']
                    },
                    {
                        name: 'Fish',
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
                ]
            }
        ]

        // Extract every name is this.menu
        this.categories = this.menu.map(function(item) {
            return item.name;
        })
    }

    addItemOnMenu(category, item_name, item_price, item_options){
        // Iterate through categories and get index of where category is found
        var index = this.categories.indexOf(category);
        // If category is found, add item to menu
        if (index > -1) {
            item_options = item_options.split(",")
            if(!item_options){
                item_options = ["None"]
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