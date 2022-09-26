

const fs = require('fs');
const inquirer = require('inquirer');
const mysql = require("mysql2");
const { join } = require('path');
const { exit } = require('process');
require("console.table");
const teamArray = [];


const prompt = inquirer.createPromptModule();


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "tracker_db",
    password: ""
});

connection.connect(function (err) {
    if (err) throw err;
});

function viewDepartments() {
    const query = 'SELECT * from department';
    connection.query(query, function (err, res) {
        console.log(res)
        if (err) throw err;
        console.table('All Departments:', res);
        basePrompts();
    })
};


// db.query("SELECT * from department;"
//     , function (err, result) {
//         console.table(result)
//     })

function viewEmployees() {
    const query = 'SELECT * from employee';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log(res.length + ' employees found!');
        console.table('All Employees:', res);
        basePrompts();
    })
};
// db.query(`SELECT * from employee;
// // LEFT JOIN role
// // ON employee.role_id = role.id
// // LEFT JOIN employee.manager_id
// `, function (err, result) {
//     console.table(result)
// })

function viewRoles() {
    const query = "SELECT * from role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table('All Roles:', res);
        basePrompts();
    })
};

// db.query("SELECT * from role;", function (err, result) {
//     console.table(result)
// })

// db.query(`
//     SELECT 
//     employee.id,
//     CONCAT(emplyoyee.first_name, '', employee.last_name) AS name, CONCAT(emplyoyee.first_name, '', employee.last_name) AS name,
//     role.title,
//     roel.salary,
//     CONCAT(m.first_name, '', m.last_name) AS manager_name,
//     FROM employee
//     LEFT JOIN role 
//     ON emplyoee.role_id = role.id
//     LEFT JOIN employee manager = m.id
//     `
//     , (err, employees) => {
//         if (err) console.log(err);
//         console.table(employees);
//     }
// )


const baseQuestions = [
    {
        type: "list",
        name: "actionWanted",
        message: "What would you like to do?",
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add Role", "Add an Employee", "Add a Deparment", "Update an Employee's Role"]

    }
];

const departmentQuestions = [
    {
        type: "input",
        name: "departmentTitle",
        message: "what is the name of your department?",
    },
]


const roleQuestions = [
    {
        type: "input",
        name: "roleName",
        message: "What is the name for this role?",
    },
    {
        type: "input",
        name: "roleSalary",
        message: "what is the salary for this role?",
    },
    {
        type: "input",
        name: "roleDepartment",
        message: "what department does this role belong to?",
    }
]

const employeeQuestions = [
    {
        type: "input",
        name: "employeeFirstName",
        message: "what is the First name of the employee?",
    },
    {
        type: "input",
        name: "employeeLasttName",
        message: "what is the Last name of the employee?",
    },
    {
        type: "input",
        name: "employeeRole",
        message: "what is the Role of the employee?",
    },
    {
        type: "input",
        name: "employeeManager",
        message: "who is the manager of the employee?",
    }
]

function basePrompts() {
    prompt(baseQuestions).then(function (answer) {
        console.log(answer.actionWanted)
        switch (answer.actionWanted) {
            case "View All Departments":
                viewDepartments();
                break;
            case "View All Roles":
                viewRoles();
                break;
            case "View All Employees":
                viewEmployees();
                break;
            case "Add Role":
                rolePrompts();
                break;
            case "Add an Employee":
                employeePrompts();
                break;
            case "Add a Department":
                departmentPrompts();
                break;
            case "Update an Employee's Role":
                updateRole();
                break;
            default:
                exit();
                break;
    
        } 
    });
}




function employeePrompts() {
    prompt(employeeQuestions).then(function ({ employeeFirstName, employeeLastName, employeeRole, employeeManager }) {
        teamArray.push(new Employee(employeeFirstName, employeeLastName, employeeRole, employeeManager));
        basePrompts();
    });
}

function rolePrompts() {
    prompt(roleQuestions).then(function ({ roleName, roleSalary, roleDepartment }) {
        teamArray.push(new role(roleName, roleSalary, roleDepartment));
        basePrompts();
    });
}

function departmentPrompts() {
    prompt(departmentQuestions).then(function ({ name }) {
        teamArray.push(new department(name));
        basePrompts();
    });
}


// const showAllDeparments = () => {
//     db.query('SELECT department_name FROM department', (err, movies) => {
//         if (err) throw err;
//         console.table(movies);
//         init();
//     });
// };




function init() {
    //prompt(basePrompts).then(function (response) {
    //missing link
    //})
    basePrompts();
};

init();