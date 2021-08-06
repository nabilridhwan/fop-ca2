const discount = require("./discounts")
const fs = require("fs")

// OrderCart is a class that handles the cart and the order
class Cart {

    // The constructor is empty
    constructor(o) {
        this.cart = [];

        this.o = o;
        this.offering = o.menu;

    }
    // Method to add item to the cart, takes in the categoryIndex, itemIndex, option and quantity and pushes them to this.cart
    addItem(categoryIndex, itemIndex, option, quantity) {
        var item = this.offering[categoryIndex].items[itemIndex]
        var itemObj = {
            quantity: quantity,
            name: item.name,
            price: item.price,
            option: option,
            category: this.offering[categoryIndex].name
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
        // Randomly generated Order ID (For use with sendOrder method)
        let orderId = Math.floor(new Date())
        var totalCost = 0;
        var str = ""
        str += "Order Number: " + orderId + "\n"
        str += "=====================================\n"
        str += `Date Ordered: ${new Date()}\n`
        str += "=====================================\n"
        for (var i = 0; i < this.cart.length; i++) {
            var item = this.cart[i]
            str += `${i+1}. ${this.returnCartLine(item)}\n`
            totalCost += item.price * item.quantity
        }

        str += `Total Cost: $${totalCost.toFixed(2)}\n`

        fs.writeFileSync("./order-" + orderId + ".txt", str)
        this.cart = [];
        console.log("\nWe have been notified of your order! Your order number is " + orderId)
    }

    // Method to apply the discount code. Returns true if the discount code is either none or is a valid one, or else return false (which is used for repetition, just incase the user typed the discount code wrongly
    applyDiscount(discountCode) {

        // If the discountCode is none, then we don't apply any discount and return false
        if (discountCode != "none") {

            let foundDiscountObject;
            let discountedAmount;

            // Get the sum of the cart
            var totalCost = 0;

            for (var i = 0; i < this.cart.length; i++) {
                var item = this.cart[i]
                totalCost += item.price * item.quantity
            }

            // Get to know what the discount code is, and if it is found, allocate it to foundDiscountObject
            for (var i = 0; i < discount.length; i++) {
                if (discount[i].code.toLowerCase() === discountCode.toLowerCase()) {
                    foundDiscountObject = discount[i]
                    break
                }
            }

            // Check if found discount object exists, if not console log "Discount code is invalid" and return false
            if (foundDiscountObject) {
                // Apply the discount
                // Check if the minimum amount if met
                if (totalCost >= foundDiscountObject.minSpent) {
                    // Check the discounted amount
                    // If it is above the capped amount, cap it
                    if ((foundDiscountObject.percentage * totalCost) > foundDiscountObject.cappedValue) {
                        discountedAmount = foundDiscountObject.cappedValue
                    } else {
                        discountedAmount = (foundDiscountObject.percentage * totalCost)
                    }

                    // Add the discount to cart
                    this.cart.push({
                        quantity: 1,
                        name: foundDiscountObject.description,
                        price: -discountedAmount,
                        option: [""],
                        category: "discount"
                    })

                    // Console log so the user can see it
                    console.log("\n=====================================")
                    console.log(`You have applied the discount: ${foundDiscountObject.description}`)

                    // Console.log the cart again
                    this.printCart()
                    return true;

                } else {
                    console.log(`The minimum amount is not met (which is $${foundDiscountObject.minSpent})`)
                    return false;
                }
            } else {
                console.log("Discount code is invalid")
                return false;
            }
        } else {
            console.log("No discount code applied")
            return true
        }
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

    // This method returns the line of the cart item in a more cleaner way, this is so that the printing of the cart is consistent
    returnCartLine(item) {
        let option = "";

        // If there is option for the food, then we print it, otherwise it will show up as empty ""
        if(item.option.length > 0){
            option = `(${item.option.join(", ")})`
        }
        return `${item.quantity}x ${item.name} ${item.category} ${option} - $${(item.price * item.quantity).toFixed(2)}`
    }
}

module.exports = Cart