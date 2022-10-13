import { pool } from "../db/db.js";

export const getMovements = async (req, res) => {
  try {
    const text = "select * from movements";
    const [rows] = await pool.query(text);
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "algo fallo",
    });
  }
};

export const postMovement = async (req, res) => {
  console.log(req.body);
  try {
    const { concept, amount, date, type } = req.body;
    const text =
      "INSERT INTO movements(concept,amount,date,type) VALUES (?, ?, ?, ?)";
    const [rows] = await pool.query(text, [concept, amount, date, type]);
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      message: "algo fallo",
    });
  }
};

export const deleteMovements = async (req, res) => {
  try {
    const id = req.params.id;
    const text = "DELETE FROM movements WHERE id = ?";
    const [rows] = await pool.query(text, [id]);

    if (rows.affectedRows <= 0)
      res.status(404).json({
        message: "Empleado no encontrado",
      });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "algo fallo",
    });
  }
};

export const updateMovements = async (req, res) => {
  try {
    const id = req.params.id;
    const { concept, amount, date, type } = req.body;
    const text =
      "UPDATE movements SET concept = IFNULL(?, concept), amount = IFNULL(?,amount), date = IFNULL(?,date), type= IFNULL(?,TYPE) WHERE id = ?";
    const [rows] = await pool.query(text, [concept, amount, date, type, id]);

    if (rows.affectedRows <= 0)
      res.status(404).json({
        message: "MOVIMIENTO no encontrado",
      });
    const text1 = "SELECT * FROM movements WHERE id=?";
    const [rows1] = await pool.query(text1, req.params.id);

    if (!rows1.length)
      return res.status(404).json({
        message: "MOVIMIENTO no encontrado",
      });

    res.json(rows1);
  } catch (error) {
    return res.status(500).json({
      message: "algo fallo",
    });
  }
};
