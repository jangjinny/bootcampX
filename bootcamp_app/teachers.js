const { Pool } = require('pg');

const cohortName = process.argv[2];
// Store all potentially malicious values in an array. 
const values = [`%${cohortName}%`];

const pool = new Pool ({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `
SELECT teachers.name as name, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
ORDER BY name;
`

pool.query(queryString, values)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.cohort}: ${user.name}`);
  })
}).catch(err => console.error('query error', err.stack));