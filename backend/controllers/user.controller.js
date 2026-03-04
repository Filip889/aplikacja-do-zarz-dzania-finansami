const pool = require("../db");
const bcrypt = require("bcryptjs");

exports.getMe = async (req, res) => {
  const userId = req.user.id;

  const result = await pool.query(
    "SELECT id, email, created_at FROM users WHERE id = $1",
    [userId]
  );

  res.json(result.rows[0]);
};


exports.changeEmail = async (req, res) => {
  const userId = req.user.id;
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Brak danych" });
    }

    const result = await pool.query(
      "SELECT password_hash FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Użytkownik nie istnieje" });
    }

    const user = result.rows[0];

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ message: "Nieprawidłowe hasło" });
    }

    await pool.query(
      "UPDATE users SET email = $1 WHERE id = $2",
      [email, userId]
    );

    res.json({ message: "Email został zmieniony" });

  } catch (err) {
    console.error("BŁĄD W CHANGE_EMAIL:", err); 
    res.status(500).json({ message: "Błąd serwera", error: err.message });
  }
};


exports.changePassword = async (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  try {
    const userResult = await pool.query(
      "SELECT password_hash FROM users WHERE id = $1",
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "Użytkownik nie istnieje" });
    }

    const valid = await bcrypt.compare(currentPassword, userResult.rows[0].password_hash);
    if (!valid) {
      return res.status(401).json({ message: "Nieprawidłowe hasło" });
    }

    const hash = await bcrypt.hash(newPassword, 10);

    await pool.query(
      "UPDATE users SET password_hash = $1 WHERE id = $2",
      [hash, userId]
    );

    res.json({ message: "Hasło zmienione" });
  } catch (err) {
    console.error("BŁĄD ZMIANY HASŁA:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};

exports.deleteAccount = async (req, res) => {
  const userId = req.user.id;
  const { password } = req.body;

  try {
    const userResult = await pool.query(
      "SELECT password_hash FROM users WHERE id = $1",
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "Użytkownik nie istnieje" });
    }

    const valid = await bcrypt.compare(password, userResult.rows[0].password_hash);
    if (!valid) {
      return res.status(401).json({ message: "Nieprawidłowe hasło" });
    }

    await pool.query("DELETE FROM users WHERE id = $1", [userId]);

    res.json({ message: "Konto usunięte" });
  } catch (err) {
    console.error("BŁĄD USUNIĘCIA KONTA:", err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};