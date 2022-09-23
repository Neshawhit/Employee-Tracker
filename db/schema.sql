/* contains queries for creating the database and the tables inside */

DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db;

USE tracker_db;

CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30)
);

CREATE TABLE role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30), 
    salary DECIMAL, 
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INt PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    manager_id INT,
    FOREIGN Key(manager_id) REFERENCES employee(id)
);

/* employee
id   first_name   last_name   role_id   manager_id
1    John          Smith         1       null
2     Peter        Pan          2          1 */

/* department
id     name
1      HR
2      Engineering

role
id   title   salary   department_id
1   Engineer    150000    2 */

