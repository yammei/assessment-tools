const { comparePasswords, hashPassword, insertUser } = require('./encryption');
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

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, password TEXT, score INTEGER, score2 INTEGER)');
});

//SIGNUP: Creates new user in 'users' table and creates assessment score history.
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await hashPassword(password);


  db.get('SELECT id FROM users WHERE username = ?', [username], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (row) {
      res.status(400).json({ error: 'Username already exists' });
    } else {
      const stmt = db.prepare(`INSERT INTO users (username, email, password, score, score2) VALUES (?, ?, ?, 0, 0)`);
      stmt.run(username, email, hashedPassword, function() {
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

app.get('/getScoreCustom/:userId/:customAssessmentId', (req, res) => {
  const userId = req.params.userId;
  const customAssessmentId = req.params.customAssessmentId;

  console.log(`SELECT score FROM user${userId}CustomScores WHERE assessmentId=${customAssessmentId}`);

  db.get(`SELECT score FROM user${userId}CustomScores WHERE assessmentId=${customAssessmentId}`, (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (row) {
      res.json({ score: row.score });
    } else {
      res.json({ score: 0 });
    }
  });
});

function authenticateUser(username, password, callback) {
  console.log("Function Reached: authenticateUser()");
  const query = 'SELECT * FROM users WHERE username = ?';

  db.get(query, [username], async (err, row) => {
    if (err) {
      callback(err, null);
      return;
    }

    if (row) {
      const passwordMatch = await comparePasswords(password, row.password);
      const user = {
        id: row.id,
        username: row.username,
        score: row.score,
      };
      callback(null, user, passwordMatch);
    } else {
      // If no user is found
      callback(null, null);
    }
  });
}

// LOGIN
app.post('/api/login', async (req, res) => {
  console.log("Endpoint Reached: /api/login");
  const { username, password } = req.body;

  authenticateUser(username, password, (err, user, passwordMatch) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (user && passwordMatch) {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.theme = 'light-mode';
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

  const { assessmentName, scoreDistribution } = req.body;
  if (!scoreDistribution || !Array.isArray(scoreDistribution)) {
    res.status(400).json({ error: 'Invalid input.' });
    return;
  }
  const scoreSum = scoreDistribution.reduce((acc, num) => acc + num, 0);
  const scoreDistString = JSON.stringify(scoreDistribution);
  const userId = req.params.userId;

  const updateStmt = db.prepare('UPDATE users SET score2 = ? WHERE id = ?');
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

// SUBMIT: Custom assessment scores.
app.post('/api/scoresCustom/:userId', (req, res) => {
  const { userId } = req.params;
  const { assessmentId, assessmentName, scoreDistribution } = req.body;

  if (!scoreDistribution || !Array.isArray(scoreDistribution)) {
    res.status(400).json({ error: 'Invalid input.' });
    return;
  }

  const scoreSum = scoreDistribution.reduce((acc, num) => acc + num, 0);

  const initStmt = `CREATE TABLE IF NOT EXISTS user${userId}CustomScores(assessmentId INTEGER, assessment TEXT, score INTEGER, scoreDist TEXT, date DATE, time TIME);`;

  db.run(initStmt, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    const assessmentScoreDistribution = JSON.stringify(scoreDistribution);
    const insertStmt = db.prepare(`INSERT INTO user${userId}CustomScores (assessmentId, assessment, score, scoreDist, date, time) VALUES (?, ?, ?, ?, DATE('now'), TIME('now'))`);
    console.log(`assessmentId: ${assessmentId}, assessmentName: ${assessmentName}, scoreSum: ${scoreSum}, scoreDistribution: ${scoreDistribution}, `);

    insertStmt.run(assessmentId, assessmentName, scoreSum, assessmentScoreDistribution, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      res.status(200).json({ message: 'Custom assessment scores submitted successfully!' });
    });
  });
});


// Posts user's assessment score in user's archive.
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

// Retrieves user's history of assessment scores.
app.get('/api/getArchiveScore/:userId/:numOfEntries/:assessmentName', (req, res) => {
  console.log("The 'getArchiveScore' Endpoint has been reached.");

  const userId = req.params.userId;
  const numOfEntries = req.params.numOfEntries;
  const assessmentName = req.params.assessmentName;

  db.all(`SELECT * FROM user${userId}History WHERE assessment = '${assessmentName}' ORDER BY date DESC, time DESC LIMIT ${numOfEntries}`, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (rows && rows.length > 0) {
      res.json({ entries: rows });
    } else {
      res.status(404).json({ error: 'User not found or no score available' });
    }
  });
});


// NEW ASSESSMENT: Creates new assessment.
app.post('/newAssessment', async (req, res) => {
  const { 
    userId, 
    assessmentName, 
    assessmentDescription, 
    assessmentEntries, 
    assessmentRatingNum, 
    assessmentSuggestions
  } = req.body;

  const createTableStmt = `
    CREATE TABLE IF NOT EXISTS user${userId}Assessments 
    (
      assessmentId INTEGER PRIMARY KEY AUTOINCREMENT, 
      assessmentName TEXT, 
      assessmentDescription TEXT, 
      assessmentEntries TEXT, 
      assessmentRatingNum INTEGER,
      assessmentSuggestions TEXT
    )
  `;

  // Execute the CREATE TABLE statement first
  db.run(createTableStmt, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const countRowsStmt = `
      SELECT COUNT(*) AS count
      FROM user${userId}Assessments
    `;

    // Execute the query to count the number of existing rows
    db.get(countRowsStmt, (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const rowCount = row.count;

      if (rowCount >= 5) {
        return console.log('Maximum capacity reached. Cannot add more assessments.');
      }

      const insertStmt = `
        INSERT INTO user${userId}Assessments
        (
          assessmentName,
          assessmentDescription,
          assessmentEntries,
          assessmentRatingNum,
          assessmentSuggestions
        )
        VALUES
        (
          '${assessmentName}',
          '${assessmentDescription}',
          '${JSON.stringify(assessmentEntries)}',
          ${assessmentRatingNum},
          '${assessmentSuggestions}'
        )
      `;

      console.log("Insert Statement:", insertStmt);

      db.run(insertStmt, (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        res.json({ message: 'New assessment created successfully!' });
      });
    });
  });
});

//GET ASSESSMENT: Retrieves existing assessment.
app.get('/getAssessmentData', (req, res) => {
  const { userId } = req.query;
  console.log(userId);

  const selectStmt = `
    SELECT assessmentId, assessmentName, assessmentDescription, assessmentEntries, assessmentRatingNum, assessmentSuggestions
    FROM user${userId}Assessments
  `;

  db.all(selectStmt, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
      return;
    }

    if (rows && rows.length > 0) {
      res.json({ assessments: rows });
    } else {
      // res.status(404).json({ message: 'No assessments found for this user' });
      console.log('No assessments found for this user');
      return;
    }
  });
});

//GET ASSESSMENT: Retrieves existing assessment.
app.get('/getAssessment', (req, res) => {
  const { userId, assessmentName } = req.query;
  console.log(userId, assessmentName);

  const selectStmt = `
    SELECT assessmentId, assessmentName, assessmentDescription, assessmentEntries, assessmentRatingNum 
    FROM user${userId}Assessments
    WHERE assessmentName = ?
    LIMIT 1;
  `;

  db.get(selectStmt, [assessmentName], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (row) {
      res.json({ assessment: row });
    } else {
      res.status(404).json({ message: 'No assessment found for this user with the provided name' });
    }
  });
});

//GET ASSESSMENT: Retrieves existing assessment.
app.get('/getAssessmentDataAtIndex', (req, res) => {
  const { userId, assessmentIndex } = req.query;
  console.log(userId, assessmentIndex);

  const selectStmt = `
    SELECT assessmentId, assessmentName, assessmentDescription, assessmentEntries, assessmentRatingNum 
    FROM user${userId}Assessments
    LIMIT 1 OFFSET ${assessmentIndex};
  `;

  const selectStmtTest = `
    SELECT assessmentId, assessmentName, assessmentDescription, assessmentEntries, assessmentRatingNum 
    FROM user1CustomScores
    ORDER BY date DESC, time DESC
    LIMIT 1 OFFSET 0;
  `;

  console.log(selectStmt);

  db.get(selectStmt, (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (row) {
      res.json({ assessment: row });
    } else {
      // res.status(404).json({ message: 'No assessment found for this user with the provided name' });
      return;
    }
  });
});


//GET ASSESSMENT NAMES: Retrieves existing assessment.
app.get('/getAssessmentNames', (req, res) => {
  const { userId } = req.query;
  console.log(userId);

  const selectStmt = `
    SELECT assessmentId, assessmentName
    FROM user${userId}Assessments
  `;

  db.all(selectStmt, (err, rows) => {
    if (err) {
      return;
    }

    if (rows && rows.length > 0) {
      res.json({ assessments: rows });
    } else {
      // res.status(404).json({ message: 'No assessments found for this user' });
      'No assessments found for this user'
      return;
    }
  });
});

// REMOVE: Custom assessment scores.
app.delete('/deleteAssessment/:userId/:assessmentId', (req, res) => {
  const { userId, assessmentId } = req.params;
  const deleteStmt = `DELETE FROM user${userId}Assessments WHERE assessmentId = ${assessmentId}`;
  console.log(deleteStmt);

  db.run(deleteStmt, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Custom assessment scores removed successfully!' });
    }
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

module.exports = {
  db,
};
