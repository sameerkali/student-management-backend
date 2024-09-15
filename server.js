const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors'); // Import the CORS middleware
const schoolRoutes = require('./routes/schoolRoutes');
const schoolAdminRoutes = require('./routes/schoolAdminRoutes');
const subjectRoutes = require('./routes/subjectRoutes');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize the Express app
const app = express();

// Enable CORS for all origins
app.use(cors());

// Middleware for parsing JSON bodies
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');

app.use('/api/users', userRoutes);       // 3 APIs
app.use('/api/schools', schoolRoutes);   // 10 APIs
app.use('/api/subjects', subjectRoutes); // 6 APIs
app.use('/api/schooladmin', schoolAdminRoutes); // 1 API

// Port setup
const PORT = process.env.PORT || 6699;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});







//old


// const express = require('express');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// const schoolRoutes = require('./routes/schoolRoutes');
// const schoolAdminRoutes = require('./routes/schoolAdminRoutes');
// const subjectRoutes = require('./routes/subjectRoutes');



// // Load environment variables
// dotenv.config();

// // Connect to the database
// connectDB();

// // Initialize the Express app
// const app = express();

// // Middleware for parsing JSON bodies
// app.use(express.json());

// // Routes
// const userRoutes = require('./routes/userRoutes');

// app.use('/api/users', userRoutes); // 3 api
// app.use('/api/schools', schoolRoutes); //10 api
// app.use('/api/subjects', subjectRoutes); // 6 api
// app.use('/api/schooladmin', schoolAdminRoutes); // 1 api




// // Port setup
// const PORT = process.env.PORT || 6699;

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
