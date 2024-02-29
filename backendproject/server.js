const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: 'your_secret_key',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = new sqlite3.Database('mentalhealth.db');

// SQL column information:
// 'score' is the cummulative score (INTEGER) of the user's completed Happiness Assessment.
// 'score2' is the cummulative score (INTEGER) of the user's completed Social Self-Care Assessment.
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, score INTEGER, score2 INTEGER)');
});

//SIGNUP: Creates new user in 'users' table and creates assessment score history.
app.post('/api/signup', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT id FROM users WHERE username = ?', [username], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (row) {
      res.status(400).json({ error: 'Username already exists' });
    } else {
      const stmt = db.prepare(`INSERT INTO users (username, password, score, score2) VALUES (?, ?, 0, 0)`);
      stmt.run(username, password, function() {
        const userId = this.lastID;

        const stmt2 = db.prepare(`CREATE TABLE user${userId}History (assessment TEXT, score INTEGER, scoreDist TEXT, date DATE, time TIME)`);
        stmt2.run((err) => {
          if (err) {
            res.status(500).json({ error: err.message });
          } else {
            res.json({ message: 'Signup Successful!' });
          }
        });

        stmt.finalize();
      });
    }
  });
});


app.get('/users', (req, res) => {
  db.all('SELECT id, username, password FROM users', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ users: rows });
  });
});

app.get('/api/getscore/:userId', (req, res) => {
  const userId = req.params.userId;

  db.get('SELECT score FROM users WHERE id = ?', [userId], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (row) {
      res.json({ score: row.score });
    } else {
      res.status(404).json({ error: 'User not found or no score available' });
    }
  });
});

app.get('/api/getscore2/:userId', (req, res) => {
  const userId = req.params.userId;

  db.get('SELECT score2 FROM users WHERE id = ?', [userId], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (row) {
      res.json({ score: row.score2 });
    } else {
      res.status(404).json({ error: 'User not found or no score available' });
    }
  });
});

function authenticateUser(username, password, callback) {
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

  db.get(query, [username, password], (err, row) => {
    if (err) {
      callback(err, null);
      return;
    }

    if (row) {
      const user = {
        id: row.id,
        username: row.username,
        score: row.score,
      };
      callback(null, user);
    } else {
      // If no user is found
      callback(null, null);
    }
  });
}

// LOGIN
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  authenticateUser(username, password, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (user) {
      req.session.userId = user.id;
      req.session.username = user.username;
      console.log(user);
      res.json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  });
});

//LOGOUT
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.clearCookie('connect.sid'); // Clear session cookie
    res.json({ message: 'Logout successful' });
  });
});

// SUBMIT: Happiness Score
app.post('/api/scores/:userId', (req, res) => {

  const { assessmentName, scoreDistribution } = req.body;
  if (!scoreDistribution || !Array.isArray(scoreDistribution)) {
    res.status(400).json({ error: 'Invalid input.' });
    return;
  }
  const scoreSum = scoreDistribution.reduce((acc, num) => acc + num, 0);
  const scoreDistString = JSON.stringify(scoreDistribution);
  const userId = req.params.userId;
  
  const updateStmt = db.prepare('UPDATE users SET score = ? WHERE id = ?');
  const archiveStmt = db.prepare(`INSERT INTO user${userId}History (assessment, score, scoreDist, date, time) VALUES (?, ?, ?, DATE('now'), TIME('now'))`);  

  console.log(userId, scoreSum);

  updateStmt.run(scoreSum, userId, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      archiveStmt.run(assessmentName, scoreSum, scoreDistString, (err) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.json({ message: 'Scores data updated successfully!' });
        }
      });
      archiveStmt.finalize();    
    }
  });
  updateStmt.finalize();
});

app.post('/api/score2/:userId', (req, res) => {
  const userId = req.params.userId;
  const { numbers } = req.body;

  if (!numbers || !Array.isArray(numbers)) {
    res.status(400).json({ error: 'Invalid input.' });
    return;
  }

  const sum = numbers.reduce((acc, num) => acc + num, 0);

  const stmt = db.prepare('update users set score2=? where id=?');
  stmt.run(sum, userId, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ sum, message: 'Scores updated successfully!' });
    }
  });
  stmt.finalize();
});

// Retrieves user's history of assessment scores.
app.post('/api/archiveScore/:userId', (req, res) => {
  console.log("The 'archiveScore' Endpoint has been reached.");

  const { scoreDistribution } = req.body;
  const { assessmentName } = req.body;
  const userId = req.params.userId;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  const stmt = db.prepare(`INSERT INTO user${userId}History (assessment, score, date, time) VALUES (?, ?, DATE('now'), TIME('now'))`);  

  stmt.run(assessmentName, scoreDistribution, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Score history updated successfully!' });
    }
    res.json({ entries: rows });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Database connection closed.');
    }
    process.exit(0);
  });
});

