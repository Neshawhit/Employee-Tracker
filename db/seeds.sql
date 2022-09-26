/* contains queries for INSERTING data into the tables */
USE tracker_db;

INSERT INTO department (name) VALUES
     ("HR"),
     ("Engineering");

    
INSERT INTO role (title, salary,department_id) VALUES
('Engineer', 150000, 2),
('HR', 100000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
("John", "Smith", 1, null),
("Peter", "Pan", 2, 1);