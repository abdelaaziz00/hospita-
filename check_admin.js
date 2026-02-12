const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blila',
});

db.connect((err) => {
    if (err) {
        console.error('Connection failed:', err);
        process.exit(1);
    }
    console.log('Connected to database.');

    const checkTableQuery = "SHOW TABLES LIKE 'admin'";
    db.query(checkTableQuery, (err, result) => {
        if (err) {
            console.error('Error checking table:', err);
            process.exit(1);
        }

        if (result.length === 0) {
            console.log('Admin table does not exist. Creating...');
            const createTableQuery = `
        CREATE TABLE \`admin\` (
          \`id_admin\` int(11) NOT NULL AUTO_INCREMENT,
          \`mail_admin\` varchar(255) NOT NULL,
          \`password_admin\` varchar(255) NOT NULL,
          PRIMARY KEY (\`id_admin\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
      `;
            db.query(createTableQuery, (err) => {
                if (err) {
                    console.error('Error creating table:', err);
                    process.exit(1);
                }
                console.log('Admin table created.');
                insertDefaultAdmin();
            });
        } else {
            console.log('Admin table exists.');
            checkAdminUser();
        }
    });
});

function checkAdminUser() {
    const checkUserQuery = "SELECT * FROM admin";
    db.query(checkUserQuery, (err, result) => {
        if (err) {
            console.error('Error checking user:', err);
            process.exit(1);
        }

        if (result.length === 0) {
            insertDefaultAdmin();
        } else {
            console.log('Admin user(s) found:');
            console.log(result);
            process.exit(0);
        }
    });
}

function insertDefaultAdmin() {
    const insertQuery = "INSERT INTO admin (mail_admin, password_admin) VALUES ('admin@example.com', 'admin123')";
    db.query(insertQuery, (err) => {
        if (err) {
            console.error('Error inserting admin:', err);
            process.exit(1);
        }
        console.log('Default admin created: admin@example.com / admin123');
        process.exit(0);
    });
}
