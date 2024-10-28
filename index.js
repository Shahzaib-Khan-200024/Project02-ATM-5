#! /usr/bin/env node
import inquirer from 'inquirer';
let myBalance = 20000; // Dollars
let myPin = 8055;
async function main() {
    try {
        let pinAnswer = await inquirer.prompt([
            {
                name: "pin",
                message: "Enter your pin",
                type: "number",
            },
        ]);
        if (pinAnswer.pin === myPin) {
            console.log("Welcome to the ATM");
            let operationAns = await inquirer.prompt([
                {
                    name: "operation",
                    message: "Please select an option",
                    type: "list",
                    choices: ["Withdraw", "Deposit", "Check Balance", "Fast Cash"],
                },
            ]);
            if (operationAns.operation === "Withdraw") {
                let amountAns = await inquirer.prompt([
                    {
                        name: "amount",
                        message: "Enter the amount",
                        type: "number",
                    },
                ]);
                if (amountAns.amount > myBalance) {
                    console.log("Insufficient balance.");
                }
                else {
                    myBalance -= amountAns.amount;
                    console.log("Your remaining balance is: " + myBalance);
                }
            }
            else if (operationAns.operation === "Deposit") {
                let amountAns = await inquirer.prompt([
                    {
                        name: "amount",
                        message: "Enter the amount",
                        type: "number",
                    },
                ]);
                myBalance += amountAns.amount;
                console.log("Your new balance is: " + myBalance);
            }
            else if (operationAns.operation === "Check Balance") {
                console.log("Your balance is: " + myBalance);
            }
            else if (operationAns.operation === "Fast Cash") {
                let fastCashAns = await inquirer.prompt([
                    {
                        name: "fastCashAmount",
                        message: "Select the Fast Cash amount",
                        type: "list",
                        choices: ["500", "1000", "2000", "5000"],
                    },
                ]);
                let fastCashAmount = parseInt(fastCashAns.fastCashAmount);
                if (fastCashAmount > myBalance) {
                    console.log("Insufficient balance.");
                }
                else {
                    myBalance -= fastCashAmount;
                    console.log("You withdrew: " + fastCashAmount);
                    console.log("Your remaining balance is: " + myBalance);
                }
            }
        }
        else {
            console.log("Incorrect pin, please try again");
        }
    }
    catch (error) {
        console.error("An error occurred:", error);
    }
}
main();
