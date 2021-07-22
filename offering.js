// offering.js is a file that returns a variable of what the restaurant offers.

var offering = [{
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
];

module.exports = offering