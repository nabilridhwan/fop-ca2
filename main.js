const Cart = require("./OrderCart")
const offering = require("./offering")
const input = require("readline-sync")
var cart = new Cart()
var customerName, mainMenuOption, categoryMenuOption, dishesMenuOption, itemQuantity, viewMenuOption;

// This variable is used for the i_Headers and i_Content function
var indentationLevel = 1;

// Printing main menu function
function printMainMenu() {

    // This variable is seen in each step and it is to indicate the current step so that the indentation can be done accordingly
    indentationLevel = 1
    // a do while loop where it breaks when the user option is 0
    do {
    // Asks the customer what is their name
        // FIXME: It keeps asking the name, even though the name variable already exists
        if(!customerName){
            customerName = input.question("What is your name? ")
        }
        console.log("\n" + timeOfDayInWords() + ", " + customerName + "!" + "\n\nWelcome to NiceMeal Restaurant\nSelect an option below\n\t1. View Menu\n\t2. View Cart\n\t0. Quit")
        mainMenuOption = input.questionInt(">>>> ")
        // switch case for the main menu option
        // if it is 0, break the loop
        switch (mainMenuOption) {
            case 1:
                printCategories(printDishes)
                break
            case 2:
                // Prints the menu
                printMenuOptions()
                break;
            default:
                printInvalidOption()
                break;
            case 0:
                break;
        }
    } while (mainMenuOption !== 0)
}

// Print the categories which takes the printDishes as a callback
function printCategories(dishesCallback) {

    indentationLevel = 2
    console.log("\n" + i_Headers() + "Select a category")
    // a do-while loop where it breaks when the user option is 0
    do {

        // Loops the array and Prints the category options
        for (var i = 0; i < offering.length; i++) {
            console.log(`${i_Content()}${i+1}. ${offering[i].name}`)
        }

        // Console log extra line for return to previous menu
        console.log(i_Content() + "0. Return to previous menu")
        categoryMenuOption = input.questionInt(">>>> ")
        if (categoryMenuOption != 0) {
            dishesCallback(categoryMenuOption - 1)
        }
        break;
    } while (categoryMenuOption !== 0)
}

// Print the dishes by the categoryIndex (0 would be noodles)
function printDishes(categoryIndex) {
    indentationLevel = 3
    let dishes = offering[categoryIndex].items
    console.log("\n" + i_Headers() + "Select a dish")
    do {
        // Loops the array and print out the dishes
        for (var i = 0; i < dishes.length; i++) {
            console.log(`${i_Content()}${i+1}. ${dishes[i].name} - $${(dishes[i].price).toFixed(2)} ea`)
        }
        console.log(i_Content() + "0. Return to previous menu")
        dishesMenuOption = input.questionInt(">>>> ")
        if (dishesMenuOption != 0) {
            printOptions(categoryIndex, dishesMenuOption - 1)
        }
        break;
    } while (dishesMenuOption !== 0)
}

// Print the dish's options
function printOptions(categoryIndex, dishIndex) {
    indentationLevel = 4
    let options = offering[categoryIndex].items[dishIndex].options
    let currentFoodOptions = []

    // A do while loop where it breaks when the user option is 0
    do {

        // Prints out all the dish options
        console.log("\n" + i_Headers() + "Select the dish's option(s). Enter " + (options.length + 1) + " to confirm options selections")
        if (currentFoodOptions.length > 0) {
            console.log(i_Content() + "=====================================")
            console.log(i_Content() + "Your current options for the dish are: " + cart.getNamedOptions(options, currentFoodOptions).join(", "))
            console.log(i_Content() + "=====================================")
        }
        for (var i = 0; i < options.length; i++) {
            console.log(`${i_Content()}${i+1}. ${options[i]}`)
        }
        console.log(i_Content() + (options.length + 1) + ". Confirm Options Seletion")
        console.log(i_Content() + "0. Return to previous menu")
        dishesMenuOption = input.questionInt(">>>> ")

        // Confirm selection
        if (dishesMenuOption == options.length + 1) {
            currentFoodOptions = cart.getNamedOptions(options, currentFoodOptions)
            getQuantity(categoryIndex, dishIndex, currentFoodOptions, addToCart)
            break;
        }

        // If the user enters a valid option
        if (dishesMenuOption != 0) {

            // Check if the index is written inside before (this is to prevent duplicate options such as - no chilli, more cheese, no chilli)
            if (currentFoodOptions.indexOf(dishesMenuOption - 1) == -1) {

                // If it is not duplicated, add it to the array, else, do nothing
                currentFoodOptions.push(dishesMenuOption - 1)
            }
        }
    } while (dishesMenuOption !== 0)
}

// This function gets the total quantity of what the user wants and calls back the addToCartCallback function
function getQuantity(categoryIndex, dishIndex, optionsArray, addToCartCallback) {
    indentationLevel = 5
    console.log(i_Headers() + "Enter the quantity:")
    itemQuantity = input.questionInt(">>>> ")
    addToCartCallback(categoryIndex, dishIndex, optionsArray, itemQuantity)
    
}

// Final step of the program: Adding it to cart and console.logs the item added.
function addToCart(categoryIndex, dishIndex, optionsArray, addToCartCallback){
    let itemAdded = cart.addItem(categoryIndex, dishIndex, optionsArray, itemQuantity)
    console.log(i_Content() + "Item added to your cart:")
    console.log(`${i_Content()} ${cart.returnCartLine(itemAdded)}`)
}

// Print the menu options, allows user to view their menu, send order and remove item
function printMenuOptions() {
    indentationLevel = 2
    let removeItemIndex;
    do {
        cart.printCart()
        console.log("1. Send your order")
        console.log("2. Remove item")
        console.log("0. Back to main menu")
        viewMenuOption = input.questionInt(">>>> ")
        // switch case for the view menu option
        // if it is 0, break the loop
        switch (viewMenuOption) {
            case 0:
                break;
            case 1:
                // When the user sends the order, the system asks if there is a discount code.

                // Ask if user has a discount code, if so, apply it
                console.log(i_Content() + "Enter the discount code (Enter 'none' if you have none, 0 to return to previous menu)")
                let appliedDiscount;
                // a do-while loop where it keeps asking for the discount unless the discount is VALID or 'none' is typed in (aka cart.ApplyDiscount returns false)
                do {
                    discountCode = input.question(">>>> ")
                    appliedDiscount = cart.applyDiscount(discountCode)
                    if(discountCode == "0") {
                        viewMenuOption = 0
                        break;
                    }
                } while (appliedDiscount === false)

                if(appliedDiscount == true){
                    cart.sendOrder()
                }
                viewMenuOption = 0
                break;
            case 2:
                indentationLevel = 3
                console.log(i_Content() + "Enter the option you want to remove")
                removeItemIndex = input.questionInt(">>>> ")
                cart.removeItem(removeItemIndex - 1)
                console.log("Your item have been removed!")
                break;
            default:
                printInvalidOption()
                break;
        }
    } while (viewMenuOption !== 0)
}

// TODO: Implement printInvalidOption for invalid input
// This functions print out when user selects an invalid option
function printInvalidOption() {
    console.log("*** Invalid Option ***")
}


// Returns the number of indentation according to the program current step
// For headers
function i_Headers() {
    let str = "";
    for (var i = 0; i < indentationLevel; i++) {
        str += "\t"
    }
    return str
}

// For content
function i_Content() {
    return i_Headers() + "\t"
}

// A function that returns Good Morning, Good Afternoon, Good Evening based on the current time
function timeOfDayInWords() {
    let hour = new Date().getHours()
    if (hour >= 0 && hour < 6) {
        return "Good Morning"
    } else if (hour >= 6 && hour < 12) {
        return "Good Afternoon"
    }
    return "Good Evening"
}

// ************************************************
// ************************************************
// ************************************************
// This is the main function
// ************************************************
// ************************************************
// ************************************************
printMainMenu()