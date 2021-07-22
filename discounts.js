// A variable called discounts that is an array of object with key values name and percentage.
// The name is the name of the discount and the percentage is the percentage of the discount.
// The percentage is a number between 0 and 100.
// Example: [{name: "20% off", percentage: 20}]

let discounts = [{
        description: "20% off (Minimum spend $5. Capped at $5)",
        code: "NICEMEAL-20",
        minSpent: 5,
        cappedValue: 5,
		percentage: 1/20
	},
	{
        description: "25% off (Minimum spend $20. Capped at $10)",
        code: "NICEMEAL-25",
        minSpent: 20,
        cappedValue: 10,
		percentage: 1/25
	},
];

module.exports = discounts