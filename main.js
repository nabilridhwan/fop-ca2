/*
    Name: Nabil Ridhwanshah Bin Rosli
    Course & Class: DCITP/FT/1A/01
    ID: 2007421

    Advanced Features:
    -   Discount Codes
    -   Output of order to a text file
    -   Allow changes to menu by adding item to one of the categories (Administrator access)
    -   Search Functionality
*/


const Cart = require("./lib/OrderCart")
const Offering = require("./lib/offering")
const input = require("readline-sync")
const timeOfDayInWords = require("./lib/timeOfDay")
// Secret password for admin control
const SECRET_PASSWORD = require("./lib/admin")
var customerName, mainMenuOption, categoryMenuOption, dishesMenuOption, itemQuantity, viewMenuOption, inputPassword;

let o = new Offering()
let offering = o.menu

var cart = new Cart(o)

// This variable is used for the i_Headers and i_Content function
var indentationLevel = 1;

// Printing main menu function
function printMainMenu() {

    // This variable is seen in each step and it is to indicate the current step so that the indentation can be done accordingly
    indentationLevel = 1
    // a do while loop where it breaks when the user option is 0
    do {
        // Asks the customer what is their name

        // A do while loop where it breaks when the customerName is empty.


        while (customerName == "" || !customerName) {
            customerName = input.question("What is your name? ")
        }

        console.log("\n" + timeOfDayInWords() + ", " + customerName + "!" + "\n\nWelcome to NiceMeal Restaurant\nSelect an option below\n\t1. View Menu\n\t2. View Cart\n\t3. Add Items (Administrator Only!)\n\t4. Search for Dish\n\t0. Quit")
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
            case 3:
                verifyAdmin()
                break;
            case 4:
                // Search function
                searchItem()
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
function printCategories() {

    indentationLevel = 2
    console.log("\n" + i_Headers() + "Select a category")
    // a do-while loop where it breaks when the user option is 0
    do {

        // Loops the array and Prints the category options

        let validInputs = [];
        for (var i = 0; i < offering.length; i++) {
            console.log(`${i_Content()}${i+1}. ${offering[i].name}`);
            validInputs.push(i + 1);
        }

        // Console log extra line for Return to Main Menu
        console.log(i_Content() + "0. Return to Main Menu")
        categoryMenuOption = input.questionInt(">>>> ")

        // Switch on categoryMenuOption
        switch (categoryMenuOption) {
            case 0:
                console.log("Exiting...")
                break;
            default:
                if (validInputs.includes(categoryMenuOption)) {
                    // One of the valid options
                    printDishes(categoryMenuOption - 1)
                    categoryMenuOption = 0;
                    break;

                } else {
                    printInvalidOption()
                }
                break;
        }
    } while (categoryMenuOption !== 0)
}

// Print the dishes by the categoryIndex (0 would be noodles)
function printDishes(categoryIndex) {
    indentationLevel = 3
    let dishes = offering[categoryIndex].items
    let validInputs = [];

    console.log("\n" + i_Headers() + "Select a dish")
    do {
        // Loops the array and print out the dishes
        for (var i = 0; i < dishes.length; i++) {
            console.log(`${i_Content()}${i+1}. ${dishes[i].name} - $${(dishes[i].price).toFixed(2)} ea`)
            validInputs.push(i + 1)
        }
        console.log(i_Content() + "0. Return to Main Menu")
        dishesMenuOption = input.questionInt(">>>> ")

        switch (dishesMenuOption) {
            case 0:
                console.log("Exiting...")
                break;
            default:
                if (validInputs.includes(dishesMenuOption)) {
                    // One of the valid options
                    printOptions(categoryIndex, dishesMenuOption - 1)
                    dishesMenuOption = 0;
                    break;

                } else {
                    printInvalidOption()
                }

                break;
        }
    } while (dishesMenuOption !== 0)
}

// Print the dish's options
function printOptions(categoryIndex, dishIndex) {
    indentationLevel = 4
    let options = offering[categoryIndex].items[dishIndex].options
    let currentFoodOptions = []

    // A do while loop where it breaks when the user option is 0
    do {
        // If the options array is not empty, print out the options - This means that the food has options
        if (options.length > 0) {

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
            console.log(i_Content() + "0. Return to Main Menu")
            dishesMenuOption = input.questionInt(">>>> ")
        } else {

            console.log(i_Content() + "The food has no options!")
            dishesMenuOption = options.length + 1;
        }

        // Confirm selection
        if (dishesMenuOption == options.length + 1) {
            currentFoodOptions = cart.getNamedOptions(options, currentFoodOptions)
            getQuantity(categoryIndex, dishIndex, currentFoodOptions)
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
function getQuantity(categoryIndex, dishIndex, optionsArray) {
    indentationLevel = 5
    console.log(i_Headers() + "Enter the quantity:")
    itemQuantity = input.questionInt(">>>> ")
    addToCart(categoryIndex, dishIndex, optionsArray, itemQuantity)

}

// Final step of the program: Adding it to cart and console.logs the item added.
function addToCart(categoryIndex, dishIndex, optionsArray) {
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
                console.log(i_Content() + "Enter the discount code (Enter 'none' if you have none, 0 to Return to Main Menu)")
                let appliedDiscount;
                // a do-while loop where it keeps asking for the discount unless the discount is VALID or 'none' is typed in (aka cart.ApplyDiscount returns false)
                do {
                    discountCode = input.question(">>>> ")
                    appliedDiscount = cart.applyDiscount(discountCode)
                    if (discountCode == "0") {
                        viewMenuOption = 0
                        break;
                    }
                } while (appliedDiscount === false)

                if (appliedDiscount == true) {
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

// This functions print out when user selects an invalid option
function printInvalidOption() {
    console.log("**********************")
    console.log("*** Invalid Option ***")
    console.log("**********************")
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

// Verifies if the user is an admin

function verifyAdmin() {

    // A do while loop while the input password is not equal to secret password
    do {
        console.log("Enter Administrator Password\nEnter 0 to exit this menu")
        inputPassword = input.question(">>>> ")

        if (inputPassword == "0") {
            // Exit the program by breaking
            console.log("Exiting to main menu...")
            break;
        }
    } while (inputPassword != SECRET_PASSWORD)

    // Verify the password
    if (inputPassword == SECRET_PASSWORD) {
        printAddItem()
    }
}

// Print the whole add item menu
function printAddItem() {
    // A do while loop while category option is not equal to 0
    do {
        // Print the menu
        console.log("What category do you want to add an item to? ");
        // Print the categories with index
        o.categories.forEach((category, index) => {
            console.log(index + 1 + ". " + category);
        });

        console.log("0. Exit Program")

        addToCategoryOption = input.questionInt(">>>> ")

        // Print new line!
        console.log("\n")


        // The following if statements check if the input is not 0 because to exit the program, the user would have to type in 0
        if (addToCategoryOption != 0) {
            // Ask for the name of the item
            console.log("Enter the name of the item that you want to add:");
            console.log("Enter 0 to exit")

            nameOption = input.question(">>>> ");

            // Print new line!
            console.log("\n")

            if (nameOption != "0") {

                // Ask for the price of the item
                console.log("Enter the price of " + nameOption + " (In dollars, without the dollar sign. e.g 2.5 or 2):");
                console.log("Enter 0 to exit")

                priceOption = input.questionFloat(">>>> ");

                // Print new line!
                console.log("\n")

                if (priceOption != "0") {
                    indentationLevel = 4;

                    // Ask for the options of the item
                    console.log("Enter the options for the dish (Separated by commas. e.g: extra spicy,more sauce. Click enter if no options are available for the dish):");
                    console.log("Enter 0 to exit")

                    dishOptions = input.question(">>>> ");

                    // Print new line!
                    console.log("\n")

                    if (dishOptions != "0") {
                        indentationLevel = 5;

                        // Add the item to the menu
                        o.addItemOnMenu(o.categories[addToCategoryOption - 1], nameOption, priceOption, dishOptions);
                        console.log("Item Added!")
                        console.log("\n")
                    }
                }

            }
        }


        break;


    } while (addToCategoryOption != 0);
}

function searchItem() {

    // Ask for search query

    // Use searchForItem from o.js to search for the item
    // If the item is found, print the item
    // input.questionInt to add item to the cart

    console.log("Enter the name of the item you want to search for:")
    console.log("Enter 0 to exit")
    searchQuery = input.question(">>>> ");
    if (searchQuery != "0") {
        console.log("\nSearching for " + searchQuery + "...")
        let foundItems = o.searchForItem(searchQuery)

        if (foundItems != false) {
            // Traverse through searchQuery and print out the items
            foundItems.forEach(function (dishes, index) {
                console.log(`${i_Content()}${index+1}. ${dishes.name} - $${(dishes.price).toFixed(2)} ea `)
            })
            console.log(i_Content() + "Enter 0 to exit")
            addToCart = input.questionInt(">>>> ")
        } else {

            console.log(i_Content() + "Item not found, Exiting to main menu.")
        }
    }
}

// ************************************************
// ************************************************
// ************************************************
// This is the main function
// ************************************************
// ************************************************
// ************************************************
printMainMenu()