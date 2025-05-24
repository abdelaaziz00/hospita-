const express = require('express');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql2'); // Import mysql2 package
const fs = require('fs'); // Import fs module to read files
const app = express();

// Middleware to parse form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));



// Configure Multer Storage to retain original file name
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, 'img'); // Set destination folder
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const customFileName = file.originalname; // Save with original file name
    cb(null, customFileName); // Retain the original name
  },
});

const upload = multer({ storage: storage });

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Your MySQL username
  password: '', // Your MySQL password
  database: 'blila', // Your database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the database!');
});

// Serve index.html only at /upload
app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve output.html only at /output
app.get('/output', (req, res) => {
  const query = 'SELECT id,needs, gender, timing, appointment_date, appointment_time, email, phone, first_name, last_name, user_message FROM appointments';

  // Perform the database query to get the data
  db.execute(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).send('Error fetching data');
    }

    // Read the output.html file from the public folder
    fs.readFile(path.join(__dirname, 'public', 'output.html'), 'utf8', (err, htmlContent) => {
      if (err) {
        console.error('Error reading output.html:', err);
        return res.status(500).send('Error reading HTML file');
      }

      // Generate table rows dynamically with buttons for actions
      let tableRows = '';
      results.forEach((row) => {
        tableRows += `
          <tr>
            <td>${row.id}</td>
            <td>${row.needs}</td>
            <td>${row.gender}</td>
            <td>${row.timing}</td>
            
            
            <td>${row.first_name}</td>
            <td>${row.last_name}</td>
            
            <td>
              <a href="/button/read/${row.id}" class="btn">Read</a>
              <a href="/button/edit/${row.id}" class="btn">Edit</a>
              <a href="/button/delete/${row.id}" class="btn">Delete</a>
              
            </td>
          </tr>
        `;
      });

      // Replace the {{data}} placeholder with the actual table rows
      let modifiedContent = htmlContent.replace('{{data}}', tableRows);

      // Send the modified HTML content as the response
      res.send(modifiedContent);
    });
  });
});




app.use('/img', express.static('C:/Users/abdel/Desktop/balabil/img'));







// Route to fetch user data and render the HTML
app.get('/button/read/:id', (req, res) => {
  const userId = req.params.id;

  const query = `
    SELECT id, needs, gender, timing, appointment_date, appointment_time, email, phone, first_name, last_name, user_message, image_path 
    FROM appointments 
    WHERE id = ?
  `;

  db.execute(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user data:', err);
      return res.status(500).send('Error fetching user data from the database');
    }

    if (results.length === 0) {
      return res.status(404).send('User not found');
    }

    const userData = results[0];

    fs.readFile(path.join(__dirname, 'public', 'readuser.html'), 'utf8', (err, htmlContent) => {
      if (err) {
        console.error('Error reading readuser.html:', err);
        return res.status(500).send('Error reading HTML file');
      }

      const imagePath = userData.image_path.replace(/\\/g, '/'); // Normalize the slashes
      const fullImagePath = `/img/${path.basename(imagePath)}`; // Ensure only the filename is appended
      

      
      const modifiedContent = htmlContent
      .replace('{{id}}', userData.id)
      .replace('{{needs}}', userData.needs)
      .replace('{{gender}}', userData.gender)
      .replace('{{timing}}', userData.timing)
      .replace('{{appointment_date}}', userData.appointment_date || 'N/A')
      .replace('{{appointment_time}}', userData.appointment_time || 'N/A')
      .replace('{{email}}', userData.email)
      .replace('{{phone}}', userData.phone)
      .replace('{{first_name}}', userData.first_name)
      .replace('{{last_name}}', userData.last_name)
      .replace('{{user_message}}', userData.user_message || 'No message provided')
      .replace('{{image_path}}', fullImagePath);
    
      console.log('Original Image Path:', userData.image_path);
console.log('Normalized Image Path:', imagePath);
console.log('Full Image Path:', fullImagePath);

      //console.log(modifiedContent);
      res.send(modifiedContent);

    });
  });
});




app.get('/button/edit/:id', (req, res) => {
  const userId = req.params.id;

  // SQL query to fetch user details based on ID
  const query = `
    SELECT id, needs, gender, timing, appointment_date, appointment_time, email, phone, first_name, last_name, user_message, image_path 
    FROM appointments 
    WHERE id = ?
  `;

  db.execute(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user data:', err);
      return res.status(500).send('Error fetching user data from the database');
    }

    if (results.length === 0) {
      return res.status(404).send('User not found');
    }

    const userData = results[0]; // Get the first result (user data)

    // Read the HTML file
    fs.readFile(path.join(__dirname, 'public', 'edituser.html'), 'utf8', (err, htmlContent) => {
      if (err) {
        console.error('Error reading edituser.html:', err);
        return res.status(500).send('Error reading HTML file');
      }

      // Replace placeholders with user data
      const modifiedContent = htmlContent
        .replace('{{id}}', userData.id)
        .replace('{{needs}}', userData.needs)
        .replace('{{gender}}', userData.gender)
        .replace('{{timing}}', userData.timing)
        .replace('{{appointment_date}}', userData.appointment_date || '')
        .replace('{{appointment_time}}', userData.appointment_time || '')
        .replace('{{email}}', userData.email)
        .replace('{{phone}}', userData.phone)
        .replace('{{first_name}}', userData.first_name)
        .replace('{{last_name}}', userData.last_name)
        .replace('{{user_message}}', userData.user_message || '')
        

      // Send the modified HTML content as the response
      res.send(modifiedContent);
    });
  });
});

// Route to handle form submission for editing a user
app.post('/button/edit/:id', (req, res) => {
  const userId = req.params.id;
  const {
    needs,
    gender,
    timing,
    appointment_date,
    appointment_time,
    email,
    phone,
    first_name,
    last_name,
    user_message,
  } = req.body;

  // SQL query to update user details in the database
  const query = `
    UPDATE appointments 
    SET needs = ?, gender = ?, timing = ?, appointment_date = ?, appointment_time = ?, email = ?, phone = ?, first_name = ?, last_name = ?, user_message = ? 
    WHERE id = ?
  `;

  const values = [
    needs,
    gender,
    timing,
    appointment_date,
    appointment_time,
    email,
    phone,
    first_name,
    last_name,
    user_message,
    userId,
  ];

  db.execute(query, values, (err) => {
    if (err) {
      console.error('Error updating user data:', err);
      return res.status(500).send('Error updating user data');
    }

    res.redirect('http://localhost:5000/output');
  });
});


// Route for "Delete" action
app.get('/button/delete/:id', (req, res) => {
  const userId = req.params.id;

  // SQL query to delete the user with the given ID from the database
  const query = 'DELETE FROM appointments WHERE id = ?';

  db.execute(query, [userId], (err, results) => {
    if (err) {
      console.error('Error deleting user:', err);
      return res.status(500).send('Error deleting user from the database');
    }

    console.log(`User with ID ${userId} has been deleted.`);
    
    // Redirect to the /output page after successful deletion
    res.redirect('/output');
  });
});






// Route to handle form submission and file upload
// Route to handle form submission and file upload
app.post('/upload', upload.single('image'), (req, res) => {
  const formData = req.body;
  console.log('Form Data:', formData); 
  // Access other form data
  const { needs, gender, timing, appointmentDate, appointmentTime, email, phone, firstName, lastName, userMessage, country } = formData;
  
  // Ensure the image is uploaded with the original name
  const imagePath = req.file ? path.join('img', req.file.filename) : ''; // Get file path

  // Print form data and file info to the console
  console.log('Form Data:', formData);
  console.log('Uploaded File:', req.file);

  // SQL query to insert the data into the database
  const query = `
    INSERT INTO appointments 
    (needs, gender, timing, appointment_date, appointment_time, email, phone, first_name, last_name, user_message, image_path, country)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    needs[0], // Assuming 'needs' is an array, pick the first item
    gender,
    timing,
    appointmentDate || null,
    appointmentTime || null,
    email,
    phone,
    firstName,
    lastName,
    userMessage,
    imagePath,
    country || null,  // Insert the country value here
  ];

 
  console.log("Values to insert: ", values);

  // Execute the query to insert the data
  db.execute(query, values, (err, results) => {
    if (err) {
      console.error('Error inserting data into the database:', err);
      res.status(500).send('Error inserting data into the database');
    } else {
      console.log('Data inserted successfully:', results);
      res.send('Data inserted successfully');
    }
  });
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
