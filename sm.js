#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Student {
    studentId;
    name;
    coursesEnrolled;
    balance;
    constructor(name) {
        this.studentId = this.generateStudentId();
        this.name = name;
        this.coursesEnrolled = [];
        this.balance = 100000;
    }
    generateStudentId() {
        const id = Math.floor(10000 + Math.random() * 90000).toString();
        return id;
    }
    enrollCourse(course) {
        this.coursesEnrolled.push(course);
        console.log(chalk.green(`${this.name} has been enrolled in ${course}.`));
    }
    viewBalance() {
        console.log(chalk.yellow(`${this.name}'s balance: ${this.balance}`));
    }
    //method to pay student fees
    payFees(amount) {
        this.balance = this.balance - amount;
        console.log(chalk.green(`${this.name} has paid ${amount}. Remaining balance: ${this.balance}`));
    }
    showStatus() {
        console.log(chalk.blue(`Student Name: ${this.name}`));
        console.log(chalk.blue(`Student Id: ${this.studentId}`));
        console.log(chalk.blue(`Courses Enrolled: ${this.coursesEnrolled.join(",")}`));
        console.log(chalk.blue(`Balance: ${this.balance}`));
    }
}
//initialize student
let student;
//main function
async function main() {
    console.log(chalk.bgBlack.bold("Wellcome to student management system!"));
    const { name } = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "Enter Student Name:",
    });
    student = new Student(name);
    while (true) {
        const { option } = await inquirer.prompt({
            type: "list",
            name: "option",
            message: "Select an option:",
            choices: [
                "Enroll in a course",
                "view balance",
                "pay tution fees",
                "show status",
                "exit",
            ],
        });
        //handle selected option
        switch (option) {
            case "Enroll in a course":
                await enrollCourse();
                break;
            case "View balance":
                student.viewBalance();
                break;
            case "Pay tution fees":
                await payFees();
                break;
            case "Show status":
                student.showStatus();
                break;
            case "Exit":
                console.log(chalk.bgBlueBright.bold("Thank You For Using Student Management System!"));
                process.exit();
        }
    }
    //function to enroll in a course
    async function enrollCourse() {
        const { course } = await inquirer.prompt({
            type: "list",
            name: "course",
            message: "Select a course to enroll:",
            choices: [chalk.bgBlueBright.italic.bold("1. INFORMATION TECHNOLOGY "),
                chalk.green.italic.bold("2. BUSSINESS ADMINISTRATION "),
                chalk.cyanBright.italic.bold("3. COMPUTER SCIENCE "),
                chalk.redBright.italic.bold("4. MATHEMATICS "),
                chalk.yellowBright.italic.bold("5. BIOLOGY "),
            ],
        });
        student.enrollCourse(course);
    }
    async function payFees() {
        const { amount } = await inquirer.prompt({
            type: "number",
            name: "amount",
            message: "Enter amount to pay:",
        });
        student.payFees(amount);
    }
}
main();
