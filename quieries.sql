use employee_db;
INSERT INTO departments (name)
VALUES
    ('Finance'),
    ('Marketing'),
    ('Sales'),
    ('Legal'),
    ('Human Resources');

    INSERT INTO roles (title, salary, department_id)
    VALUES 
        ("Supervisor", 100, 1),
        ("Salesman", 25, 2),
        ("Sales Supervisor", 100, 3),
        ("Laywer", 100, 4),
        ("Greater Karen", 80, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    values ("John", "Doe", 1, NULL),
    ("Jane", "Doe", 2, 1),
    ("Ron", "Burgundy", 3, 1),
    ("Phoenix", "Wright", 4, 1),
    ("Sandra", "Cullens", 5, 1);