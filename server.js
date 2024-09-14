const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const schoolRoutes = require('./routes/schoolRoutes');
const schoolAdminRoutes = require('./routes/schoolAdminRoutes');
const studentRoutes = require('./routes/studentRoutes');



// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize the Express app
const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

app.use('/api/schools', schoolRoutes);
app.use('/api/schooladmin', schoolAdminRoutes);
app.use('/api/students', studentRoutes);




// Port setup
const PORT = process.env.PORT || 6699;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
