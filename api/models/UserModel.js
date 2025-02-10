const db = require("../mysql");

const table = "user";

const selectFields = (selectArray) => {
  if (selectArray.length) return selectArray.join(", ");
  else return "*"
}

module.exports.getAll = async (select = []) => {
  try {
    const [rows, fields] = await db.query(`SELECT ${selectFields(select)} FROM ${table}`);
    return rows;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports.getById = async (id, select = []) => {
  try {
    const [rows, fields] = await db.query(
      `SELECT ${selectFields(select)} FROM ${table} WHERE id = ?;`,
      [id]
    );
    if (rows.length) {
      return rows[0];
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports.getByEmail = async (email, select = []) => {
  try {
    const [rows, fields] = await db.query(
      `SELECT ${selectFields(select)} FROM ${table} WHERE email = ?;`,
      [email]
    );
    if (rows.length) {
      return rows[0];
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports.insert = async (data) => {
  try {
    // const fields = Object.keys(data);
    let fields = "";
    let q = "";
    const arr = [];

    for (let key in data) {
      if (fields != "") {
        fields += ", ";
        q += ", ";
      }
      fields += key;
      q += "?";

      arr.push(data[key]);
    }

    const [result] = await db.query(
      `INSERT INTO ${table} (${fields}) VALUES (${q})`,
      arr
    );

    if (result.insertId) {
      return result.insertId;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports.update = async (data, id) => {
  try {
    let fields = "";
    const arr = [];

    for (let key in data) {
      if (fields != "") {
        fields += ", ";
      }
      fields += key + "=?";

      arr.push(data[key]);
    }
    arr.push(id);

    const [result] = await db.query(
      `UPDATE ${table} SET ${fields} WHERE id=?`,
      arr
    );

    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports.delete = async (id) => {
  try {
    const [result] = await db.query(`DELETE FROM ${table} WHERE id=?`, [id]);
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
};
