import { QueryInterface, DataTypes, QueryTypes } from "sequelize";

const TABLE_NAME = "calculations";

module.exports = {
  up: (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.createTable(TABLE_NAME, {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      expression: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      result: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      operation_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      posted_by_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "users", key: "id" },
      },
      updated_by_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: { model: "users", key: "id" },
      },
      deleted_by_id: {
        type: DataTypes.INTEGER,
        references: { model: "users", key: "id" },
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deleted_at: {
        type: DataTypes.DATE,
      },
    }),

  down: (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.dropTable(TABLE_NAME),
};
