DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE departments (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(30)
)

CREATE TABLE roles (
    id INT PRIMARY KEY
    title VARCHAR(30)
    salary DECIMAL 
    department_id INT
)

CREATE TABLE employee (
    id INT PRIMARY KEY
    first_name VARCHAR(30) NOT NULL
    last_name VARCHAR(30) NOT NULL 
    role_id INT NOT NULL
    manager_id INT NULL
);