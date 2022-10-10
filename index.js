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

// view all functions
function viewDepartments() {
    const query = 'SELECT * from department';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table('All Departments:', res);
        basePrompts();
    })
};



function viewEmployees() {
    const query = 'SELECT * from employee';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table('All Employees:', res);
        basePrompts();
    })
};

function viewRoles() {
    const query = "SELECT * from role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table('All Roles:', res);
        basePrompts();
    })
};

// prompt questions
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

//Switch case for running prompts 
function basePrompts() {
    prompt(baseQuestions).then(function (answer) {
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
            case "Add a Deparment":
                addDepartment();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add an Employee":
                addEmployee();
                break;
            case "Delete an Employee":
                deleteEmployee();
                break;
            case "Delete a Role":
                deleteRole();
                break;
            case "Delete a Department":
                deleteDeparment();
                break;
            case "Update an Employee's Role":
                updateRole();
                break;
            default:
                exit();


        }
    });
}

//prompt functions 

function employeePrompts() {
    prompt(employeeQuestions).then(function ({ employeeFirstName, employeeLastName, employeeRole, employeeManager }) {
        teamArray.push(new addEmployee(employeeFirstName, employeeLastName, employeeRole, employeeManager));
        basePrompts();
    });
}

function rolePrompts() {
    prompt(roleQuestions).then(function ({ roleName, roleSalary }) {
        teamArray.push(new addRole(roleName, roleSalary));
        basePrompts();
    });
}

function departmentPrompts() {
    prompt(departmentQuestions).then(function ({ name }) {
        teamArray.push(new addDepartment(name));
        basePrompts();
    });
}

//add, delete and update functions

function deleteEmployee() {
    employee.destroy({ where: { employee_id: req.params.id } })
        .then(records => {
            console.log(records)
            res.status(200).json(records)
        }).catch(err => res.status(500).json(err))
}

function addRole() {
    const query = 'SELECT role.title, role.salary, role.department_id FROM role'
    connection.query(query, function (err, res) {
        inquirer.prompt([
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
        ])
            .then(function (res) {

                connection.query("INSERT INTO role SET ?", {
                    title: res.roleName,
                    salary: res.roleSalary,
                    department_id: res.roleDepartment
                },
                    function (err, res) {

                        if (err) throw err;
                        basePrompts()
                    }
                )
            })

    })
};

function deleteRole() {
    role.destroy({ where: { role_id: req.params.id } })
        .then(records => {

            res.status(200).json(records)
        }).catch(err => res.status(500).json(err))
};

function addEmployee() {
    const query = 'SELECT employee.first_name, employee.last_name, employee.role_id, employee.manager_id FROM employee'
    connection.query(query, function (err, res) {
        inquirer.prompt([
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
        )
            .then(function (res) {

                connection.query("INSERT INTO employee SET ?", {
                    first_name: res.employeeFirstName,
                    last_name: res.employeeLasttName,
                    role_id: res.employeeRole,
                    manager_id: res.employeeManager
                },
                    function (err, res) {

                        if (err) throw err;
                        basePrompts()
                    }
                )
            })

    })

};

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "departmentTitle",
            message: "what is the name of your department?",
        },
    ])
        .then(function (res) {

            connection.query("INSERT INTO department SET ?", {
                name: res.departmentTitle
            },
                function (err, res) {

                    if (err) throw err;
                    basePrompts()
                }
            )
        })

};

function deleteDeparment() {
    const query = 'SELECT * from department';
    connection.query(query, function (err, res) {

        if (err) throw err;
    })
};

function updateRole() {

    connection.query("SELECT * FROM employee", (err, employeeRes) => {

        if (err) throw err;

        const employeeChoice = [];

        employeeRes.forEach(({ first_name, last_name, id }) => {

            employeeChoice.push({
                name: first_name + " " + last_name,
                value: id
            });
        });


        //get all the role list to make choice of employee's role
        connection.query("SELECT * FROM role", (err, employeeRoleRes) => {

            if (err) throw err;

            const employeeRoleChoice = [];

            employeeRoleRes.forEach(({ title, id }) => {

                employeeRoleChoice.push({
                    name: title,
                    value: id
                });
            });


            let updateQuestions = [
                {
                    type: "list",
                    name: "id",
                    choices: employeeChoice,
                    message: "whose role do you want to update?"
                },
                {
                    type: "list",
                    name: "role_id",
                    choices: employeeRoleChoice,
                    message: "what is the employee's new role?"
                }
            ]


            inquirer.prompt(updateQuestions)
                .then(response => {
                    const query = `UPDATE employee SET role_id = ? WHERE id = ?;`;
                    connection.query(query, [
                        response.role_id,
                        response.id
                    ], (err, res) => {
                        if (err) throw err;


                        console.log("successfully updated employee's role!");
                        basePrompts();
                    });
                })
                .catch(err => {
                    console.error(err);
                });
        })
    });
}


function init() {

    basePrompts();
};

init();

