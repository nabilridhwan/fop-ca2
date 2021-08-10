// A class of UserHandler is used to handle user's actions such as checking if the user exists, write last order, etc.
/*
    User data structure:
    user: {
        id: "",
        name: "",
        lastOrder: Array<Object>
    }
*/

let fs = require("fs")

class UserHandler {

    constructor(userDataJsonPath) {

        this.userDataJsonPath = userDataJsonPath;

        // Check if file at userDataJsonPath exits
        if (!fs.existsSync(userDataJsonPath)) {
            console.log("User data file does not exist. - STARTING NEW USER DATA!")
            this.userData = [];
        } else {
            // Read JSON file from userDataJsonPath
            this.userData = JSON.parse(fs.readFileSync(this.userDataJsonPath, 'utf8'));
        }
    }

    checkIfUserExist(identifier) {
        // Check if user exists
        return this.userData.filter(usr => usr.id = identifier).length > 0;
    }

    getUser(identifier) {
        return this.userData.filter(usr => usr.id = identifier)[0];
    }

    saveNewUser(identifier, fullName) {
        // Create a new userData object
        let user = {
            id: identifier,
            name: fullName,
            lastOrder: {}
        }
        this.userData.push(user)
        // Write to JSON file
        this.write(this.userData);
        return user;
    }

    saveLastOrder(identifier, order) {
        // Get last order of user
        let user = this.userData.filter(usr => usr.id == identifier)[0];
        user.lastOrder = JSON.parse(order)

        // Write to JSON file
        this.write(this.userData);
    }


    write(newData) {
        // Parse newData as json and write it to userDataJsonPath
        fs.writeFileSync(this.userDataJsonPath, JSON.stringify(newData, null, 4));
    }
}

module.exports = UserHandler;