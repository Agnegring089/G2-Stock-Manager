import app from './app';
import pool from './database/dbConfig';

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await pool.connect();
    console.log('Connected to PostgreSQL database');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
