const db = require('../../database')

class CategoriesRepository {
  async findAll(){
    const rows = await db.query(`SELECT * FROM categories ORDER by name`);
    return rows;
  }

  async create({name}){
    const [row] = await db.query(`
    INSERT INTO categories(name)
    VALUES($1)
    RETURNING *
    `,[name]);
    return row;
  }

  async delete(id){
    const deleteCategories = await db.query(`DELETE FROM categories WHERE id = $1`, [id]);
    return deleteCategories;
  }
}

module.exports = new CategoriesRepository();
