const cTable = require('console.table');
const inquirer = require('inquirer');
const connection =require('./connection.js');


connection.connect (function (err){
    if (err) throw err
    startApp()
})

//Questions asked at start of app that end user navs through
function startApp () {
    inquirer.prompt([
        {
          name: "action",
          type: "list",
          message: "What would you like to do?",
          choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a new department",
            "Add a new role",
            "Add a new employee",
            "Update an employee role",
            "Exit"
          ]
        }]) //This below will navigate the end user to different relevant menus
        .then(function (answer) {
          switch (answer.action) {
            case "View all departments":
              viewDepartments();
              break;
            case "View all roles":
              viewRoles();
              break;
            case "View all employees":
              viewEmployees();
              break;
            case "Add a new department":
              addDepartments();
              break;
            case "Add a new role":
              addRoles();
              break;
            case "Add a new employee":
              addEmployees();
              break;
            case "Update an employee role":
              roleUpdate();
              break;
            case "exit":
              connection.end();
              break;
          }
        });
    }
// question to begin adding a new dept
    const addDepartmentsQuestions = [{
      type: 'input',
      name: 'newDept',
      message: 'What department is being created?',
  }]




    function viewDepartments () {
        connection.query('SELECT * FROM departments',(err,res) => {
            console.log("Made it bro")
            if (err) throw err
            console.log(res)
            console.table(res)
            startApp ()
        })
    }
    
    function viewRoles () {
        connection.query('SELECT * FROM roles',(err,res) => {
            console.log("Made it bro")
            if (err) throw err
            console.log(res)
            console.table(res)
            startApp ()
        })
    }

    function viewEmployees () {
        connection.query('SELECT * FROM employee',(err,res) => {
            console.log("Made it bro")
            if (err) throw err
            console.log(res)
            console.table(res)
            startApp ()
        })
    }

    function addEmployees() {
        connection.query ('SELECT * FROM roles', (err,res) => {
            if (err) throw err
            inquirer.prompt ([

                {
                    type:"list", 
                    name:"roleTitle",
                    message:"What is the role of this new employee?",
                    choices: res.map (roleTable => roleTable.title)
                },
                {
                    type:"input",
                    name:"firstName",
                    message:"What is their first name?",
                },
                {
                    type:"input",
                    name:"lastName",
                    message:"What is their last name?"
                },
                {
                    type:"list", 
                    name:"managerId",
                    message:"What is the manager's ID?",
                    choices: ['1'],
                },
            ]).then(response => {
                const convertRole = res.find(roleTable => roleTable.title === response.roleTitle)
                connection.query ('INSERT INTO employee SET ?',{

                    first_name: response.firstName,
                    last_name: response.lastName,
                    role_id: convertRole.id,
                    manager_id: response.managerId,
                },function(err) {

                    console.log('New Employee added!')
                    startApp()
                })

            })
        })
    }
    function addDepartments() {

      inquirer.prompt(addDepartmentsQuestions)
          .then(answers => {
  
              // add new department
              const sql = `INSERT INTO departments (name) VALUES (?)`;
              params = [answers.newDept];
  
              connection.query(sql, params, (err, rows) => {
                  if (err) {
                      console.log(err);
                      return;
                  }
  
                  console.log(rows);
                  viewDepartments();
              });
          });
  }
  function addRoles() {


    const sql1 = `SELECT * FROM departments;`;

    connection.query(sql1, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }

        //saves local variable to populate inquirer choices for picking a department_id later
        const departments = rows.map(({ id, names }) => ({ name: names, value: id }));
        console.log(rows);

        inquirer.prompt([{
            type: 'input',
            name: 'newRoleTitle',
            message: 'What is the name of the role you wish to add?'
        }, {
            type: 'input',
            name: 'newRoleSalary',
            message: 'What is the salary for the new role?'
        }, {
            type: 'list',
            name: 'newRoleDept',
            message: 'What is the department for the new role?',
            choices: departments
        }])
            .then(answers => {

                //push value to global scope
                addRolesDepartmentID = answers.newRoleDept

                //Inserts new role into database
                const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
                const params = [answers.newRoleTitle, answers.newRoleSalary, addRolesDepartmentID]

                connection.query(sql, params, (err, rows) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    console.log(rows);
                    viewRoles();
                });
            });
    });
};