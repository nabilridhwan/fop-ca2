const Cart = require("./OrderCart")
const offering = require("./offering")
var input = require("readline-sync")
var cart = new Cart()
var mainMenuOption, categoryMenuOption, dishesMenuOption, itemQuantity, viewMenuOption;

// This variable is used for the i_Headers and i_Content function
var indentationLevel = 1;

// Printing main menu function
function printMainMenu() {
    indentationLevel = 1

    // a do while loop where it breaks when the user option is 0
    do {
        console.log("\nWelcome to NiceMeal Restaurant\nSelect an option below\n\t1. View Menu\n\t2. View Cart\n\t0. Quit")
        mainMenuOption = input.questionInt(">>>> ")

        // switch case for the main menu option
        // if it is 0, break the loop
        switch (mainMenuOption) {
            case 1:
                printCategories()
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

function printCategories() {

    indentationLevel = 2
    
    console.log("\n" + i_Headers() + "Select a category")
    // a do-while loop where it breaks when the user option is 0
    do {
        for (var i = 0; i < offering.length; i++) {
            console.log(`${i_Content()}${i+1}. ${offering[i].name}`)
        }
        console.log(i_Content() + "0. Return to previous menu")

        categoryMenuOption = input.questionInt(">>>> ")

        if (categoryMenuOption != 0) {
            printDishes(categoryMenuOption - 1)
        }

        break;
    } while (categoryMenuOption !== 0)
}

function printDishes(categoryIndex) {

    indentationLevel = 3
    
    let dishes = offering[categoryIndex].items
    console.log("\n" + i_Headers() + "Select a dish")
    do {
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

function printOptions(categoryIndex, dishIndex) {

    indentationLevel = 4
    
    let options = offering[categoryIndex].items[dishIndex].options
    let currentFoodOptions = []
    do {
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
            getQuantityAndAddToCart(categoryIndex, dishIndex, currentFoodOptions)
            break;
        }

        if (dishesMenuOption != 0) {
            if (currentFoodOptions.indexOf(dishesMenuOption - 1) == -1) {
                currentFoodOptions.push(dishesMenuOption - 1)
            }
        }

    } while (dishesMenuOption !== 0)
}

function getQuantityAndAddToCart(categoryIndex, dishIndex, optionsArray) {

    indentationLevel = 5
    
    console.log(i_Headers() + "Enter the quantity:")
    itemQuantity = input.questionInt(">>>> ")
    let itemAdded = cart.addItem(categoryIndex, dishIndex, optionsArray, itemQuantity)
    console.log(i_Content() + "Item added to your cart:")

    console.log(`${i_Content()} ${cart.returnCartLine(itemAdded)}`)
}

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
                cart.sendOrder()
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

printMainMenu()