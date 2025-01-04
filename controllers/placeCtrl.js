const db = require("../config").connectToDatabase();

exports.getAllPlaces = (req, res) => {
  const query = "SELECT * FROM places";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else {
      res.json(results);
    }
  });
};

exports.addPlace = (req, res) => {
  const { name, address, description } = req.body;
  if (!name || !address) {
    return res.status(400).send("Name and address are required");
  }

  const query = `
    INSERT INTO places (name, address, description)
    VALUES (?, ?, ?)
  `;
  db.query(query, [name, address, description || null], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else {
      res.status(201).json({ id: result.insertId });
    }
  });
};

exports.getPlaceById = (req, res) => {
  const query = "SELECT * FROM places WHERE id = ?";
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else if (results.length === 0) {
      res.status(404).send("Place not found");
    } else {
      res.json(results[0]);
    }
  });
};

exports.updateVisitedStatus = (req, res) => {
  const { visited } = req.body;
  const query = "UPDATE places SET visited = ? WHERE id = ?";
  db.query(query, [visited, req.params.id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Place not found");
    } else {
      res.send("Place status updated successfully");
    }
  });
};

exports.deletePlace = (req, res) => {
  const query = "DELETE FROM places WHERE id = ?";
  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Place not found");
    } else {
      res.send("Place deleted successfully");
    }
  });
};

exports.editPlace = (req, res) => {
  const { name, address, description, visited } = req.body;

  if (!name || !address) {
    return res.status(400).send("Name and address are required");
  }

  const query = `
      UPDATE places
      SET name = ?, address = ?, description = ?, visited = ?
      WHERE id = ?
    `;

  db.query(
    query,
    [name, address, description || null, visited || false, req.params.id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Server error");
      } else if (result.affectedRows === 0) {
        res.status(404).send("Place not found");
      } else {
        res.send("Place updated successfully");
      }
    }
  );
};
