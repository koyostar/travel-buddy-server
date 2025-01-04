const db = require("../config").connectToDatabase();

exports.getAllFood = (req, res) => {
  const query = "SELECT * FROM food";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else {
      res.json(results);
    }
  });
};

exports.addFood = (req, res) => {
  const { restaurant, address, description } = req.body;
  if (!address) {
    return res.status(400).send("Address is required");
  }

  const query = `
    INSERT INTO food (restaurant, address, description)
    VALUES (?, ?, ?)
  `;
  db.query(
    query,
    [restaurant || null, address, description || null],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Server error");
      } else {
        res.status(201).json({ id: result.insertId });
      }
    }
  );
};

exports.getFoodById = (req, res) => {
  const query = "SELECT * FROM food WHERE id = ?";
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else if (results.length === 0) {
      res.status(404).send("Food item not found");
    } else {
      res.json(results[0]);
    }
  });
};

exports.updateAteStatus = (req, res) => {
  const { ate } = req.body;
  const query = "UPDATE food SET ate = ? WHERE id = ?";
  db.query(query, [ate, req.params.id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Food item not found");
    } else {
      res.send("Food status updated successfully");
    }
  });
};

exports.deleteFood = (req, res) => {
  const query = "DELETE FROM food WHERE id = ?";
  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Food item not found");
    } else {
      res.send("Food item deleted successfully");
    }
  });
};

exports.editFood = (req, res) => {
  const { restaurant, address, description, ate } = req.body;

  if (!address) {
    return res.status(400).send("Address is required");
  }

  const query = `
      UPDATE food
      SET restaurant = ?, address = ?, description = ?, ate = ?
      WHERE id = ?
    `;

  db.query(
    query,
    [
      restaurant || null,
      address,
      description || null,
      ate || false,
      req.params.id,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Server error");
      } else if (result.affectedRows === 0) {
        res.status(404).send("Food item not found");
      } else {
        res.send("Food item updated successfully");
      }
    }
  );
};
