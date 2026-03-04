const pool = require("../db");

exports.getTransactions = async (req, res) => {
  const userId = req.user.id;
  const { page = 1, limit = 10, type, startDate, endDate, month } = req.query;
  const offset = (Number(page) - 1) * Number(limit);

  try {
    let filterQuery = "WHERE t.user_id = $1";
    let params = [userId];

    if (month) {
      const year = month.split('-')[0];
      const monthNum = month.split('-')[1];
      const start = `${year}-${monthNum}-01`;
      const end = new Date(year, monthNum, 0).toISOString().split('T')[0];
      
      params.push(start, end);
      filterQuery += ` AND t.date >= $${params.length - 1} AND t.date <= $${params.length}`;
    } else {
      if (startDate) {
        params.push(startDate);
        filterQuery += ` AND t.date >= $${params.length}`;
      }
      if (endDate) {
        params.push(endDate);
        filterQuery += ` AND t.date <= $${params.length}`;
      }
    }

    if (type && type !== "" && type !== "Wszystkie typy") {
      params.push(type);
      filterQuery += ` AND t.type = $${params.length}`;
    }

    const dataSql = `
      SELECT t.*, c.name AS category_name
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      ${filterQuery}
      ORDER BY t.date DESC
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `;
    
    const dataResult = await pool.query(dataSql, [...params, Number(limit), offset]);

    const countSql = `SELECT COUNT(*) FROM transactions t ${filterQuery}`;
    const countResult = await pool.query(countSql, params);
    const total = Number(countResult.rows[0].count);

    res.json({
      data: dataResult.rows,
      pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / limit) }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

exports.getStats = async (req, res) => {
  const userId = req.user.id;
  try {
    const incomeRes = await pool.query(
      "SELECT COALESCE(SUM(amount), 0) AS income FROM transactions WHERE user_id = $1 AND type = 'income'",
      [userId]
    );
    const expenseRes = await pool.query(
      "SELECT COALESCE(SUM(amount), 0) AS expense FROM transactions WHERE user_id = $1 AND type = 'expense'",
      [userId]
    );
    const byCategoryRes = await pool.query(
  `SELECT c.name, SUM(t.amount)::FLOAT AS value 
   FROM transactions t 
   JOIN categories c ON t.category_id = c.id 
   WHERE t.user_id = $1 AND t.type = 'expense' 
   GROUP BY c.name ORDER BY value DESC`,
  [userId]
);

    const income = Number(incomeRes.rows[0].income);
    const expense = Number(expenseRes.rows[0].expense);

    res.json({
      income,
      expense,
      balance: income - expense,
      byCategory: byCategoryRes.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

exports.createTransaction = async (req, res) => {
  const { amount, type, description, date, category_id } = req.body;
  const userId = req.user.id;

  if (!amount || !type || !date) {
    return res.status(400).json({ message: "Brak wymaganych danych" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO transactions (amount, type, description, date, user_id, category_id)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [amount, type, description, date, userId, category_id || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};