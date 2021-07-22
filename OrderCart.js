const offering = require("./offering");
const fs = require("fs")
class Cart {
    constructor() {
        this.cart = [];

        // Randomly generated Order ID (For use with sendOrder method)
        this.orderId = Math.floor(Math.random() * 100000) + 1
    }

    // Method to add item to the cart
    addItem(categoryIndex, itemIndex, option, quantity) {
        var item = offering[categoryIndex].items[itemIndex]

        var itemObj = {
            quantity: quantity,
            name: item.name,
            price: item.price,
            option: option,
            category: offering[categoryIndex].name
        }

        this.cart.push(itemObj)
        return itemObj
    }

    // This method allows for conversion of an array of [0,1] to something along the lines of ["more cheese", "more chilli"]
    getNamedOptions(optionObject, optionIndexes) {
        var options = []
        for (var i = 0; i < optionIndexes.length; i++) {
            options.push(optionObject[optionIndexes[i]])
        }

        return options
    }

    // Method for removing item from the cart
    removeItem(itemIndex) {
        this.cart.splice(itemIndex, 1)
    }

    // Method to send order (which currently outputs the file to a text file)
    sendOrder() {
        var totalCost = 0;
        var str = ""
        str += "Order Number: " + this.orderId + "\n"
        str += "=====================================\n"
        for (var i = 0; i < this.cart.length; i++) {
            var item = this.cart[i]
            str += `${i+1}. ${this.returnCartLine(item)}\n`

            totalCost += item.price * item.quantity
        }

        str += `Total Cost: $${totalCost.toFixed(2)}\n`

        fs.writeFileSync("./order-" + this.orderId + ".txt", str)
        console.log("\nWe have been notified of your order! Your order number is " + this.orderId)
    }

    // Prints the user's cart
    printCart() {

        if (this.cart.length > 0) {
            var totalCost = 0;
            console.log("\n=====================================")
            console.log("Your Cart:")
            console.log("=====================================")
            for (var i = 0; i < this.cart.length; i++) {
                var item = this.cart[i]
                console.log(`${i+1}. ${this.returnCartLine(item)}`)

                totalCost += item.price * item.quantity
            }
            console.log("=====================================")
            console.log(`Total Cost: $${totalCost.toFixed(2)}\n`)
        } else {
            console.log("=====================================")
            console.log("Your cart is empty. Add some items to see them.")
            console.log("=====================================")
        }

    }

    returnCartLine(item) {
        return `${item.quantity}x ${item.name} ${item.category} (${item.option.join(", ")}) - $${(item.price * item.quantity).toFixed(2)}`
    }
}

module.exports = Cart