require('dotenv').config(); // Load .env file
const app = require('./app');
const {DBconnection} = require('./src/config/db');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
DBconnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to database:', err);
  });
