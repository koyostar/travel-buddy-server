const db = require("../config").connectToDatabase();

exports.getAllAccommodations = (req, res) => {
  const query = "SELECT * FROM accommodations";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else {
      res.json(results);
    }
  });
};

exports.addAccommodation = (req, res) => {
  const {
    hotel,
    address,
    check_in_date,
    check_in_time,
    check_out_date,
    check_out_time,
  } = req.body;
  if (!hotel || !address || !check_in_date || !check_out_date) {
    return res.status(400).send("Missing required fields");
  }

  const query = `
  INSERT INTO accommodations (hotel, address, check_in_date, check_in_time, check_out_date, check_out_time)
  VALUES (?, ?, ?, ?, ?, ?)
`;

  db.query(
    query,
    [
      hotel,
      address,
      check_in_date,
      check_in_time || null,
      check_out_date,
      check_out_time || null,
    ],
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

exports.getAccommodationById = (req, res) => {
  const query = "SELECT * FROM accommodations WHERE id = ?";
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else if (results.length === 0) {
      res.status(404).send("Accommodation not found");
    } else {
      res.json(results[0]);
    }
  });
};

exports.updateStayedStatus = (req, res) => {
  const { stayed } = req.body;

  const query = "UPDATE accommodations SET stayed = ? WHERE id = ?";

  db.query(query, [stayed, req.params.id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Accommodation not found");
    } else {
      res.send("Accommodation status updated successfully");
    }
  });
};

exports.deleteAccommodation = (req, res) => {
  const query = "DELETE FROM accommodations WHERE id = ?";
  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else if (result.affectedRows === 0) {
      res.status(404).send("Accommodation not found");
    } else {
      res.send("Accommodation deleted successfully");
    }
  });
};

exports.editAccommodation = (req, res) => {
  const {
    hotel,
    address,
    check_in_date,
    check_in_time,
    check_out_date,
    check_out_time,
    stayed,
  } = req.body;

  if (!hotel || !address || !check_in_date || !check_out_date) {
    return res.status(400).send("Missing required fields");
  }

  const query = `
    UPDATE accommodations
    SET hotel = ?, address = ?, check_in_date = ?, check_in_time = ?, check_out_date = ?, check_out_time = ?, stayed = ?
    WHERE id = ?
  `;

  db.query(
    query,
    [
      hotel,
      address,
      check_in_date,
      check_in_time || null,
      check_out_date,
      check_out_time || null,
      stayed || false,
      req.params.id,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Server error");
      } else if (result.affectedRows === 0) {
        res.status(404).send("Accommodation not found");
      } else {
        res.send("Accommodation updated successfully");
      }
    }
  );
};
