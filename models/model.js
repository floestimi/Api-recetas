// Trabajamos todo lo que tiene que ver con los datos de recetas en la base de datos
const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "misrecetas",
  port: 3306
});

const getRecipe = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT * FROM recetas"
    );

    return rows;
  } catch (error){
  } finally {
    if (conn) conn.release();
  }
  return false;
};

const getRecipeById = async (id) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT * FROM recetas WHERE id=?",
      [id]
    );

    return rows[0];
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release(); //release to pool
  }
  return false;
};

const createRecipe = async (recetas) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query(
      `INSERT INTO recetas(name, ingredients, process) VALUE(?, ?, ?)`,
      [recetas.name, recetas.ingredients, recetas.process]
    );

    return { id: parseInt(response.insertId), ...recetas };
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release(); //release to pool
  }
  return false;
};

const updateRecipe = async (id, recetas) => {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query(
      `UPDATE recetas SET name=?, ingredients=?, process=? WHERE id=?`,
      [recetas.name, recetas.ingredients, recetas.process, id]
    );

    return { id, ...recetas };
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release(); //release to pool
  }
  return false;
};

const deleteRecipe= async (id) => {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query("DELETE FROM recetas WHERE id=?", [id]);

    return true;
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release(); //release to pool
  }
  return false;
};

module.exports = {
  getRecipe,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe
};
