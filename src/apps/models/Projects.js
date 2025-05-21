const Sequelize = require("sequelize");
const { Model } = require("sequelize");

class Projects extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.TEXT,
        status: Sequelize.STRING,
        owner_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Users, { foreignKey: "owner_id", as: "user" });
  }
}

module.exports = Projects;
