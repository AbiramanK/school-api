import { Sequelize, sequelize } from "../../server/dbconfig";
import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Field, ObjectType } from "type-graphql";
import { UserModel } from "../User/model";

@Table({
  timestamps: true,
  tableName: "calculations",
  paranoid: true,
  underscored: true,
})
@ObjectType()
export class CalculationModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  @Field({ nullable: false })
  public declare id?: number;

  @Column
  @Field({ nullable: false })
  public declare operation_name?: string;

  @Column
  @Field({ nullable: false })
  public declare expression?: string;

  @Column
  @Field({ nullable: false })
  public declare result?: string;

  @Column
  @ForeignKey(() => UserModel)
  public declare posted_by_id?: number;

  @Column
  @ForeignKey(() => UserModel)
  public declare updated_by_id?: number;

  @Column
  @ForeignKey(() => UserModel)
  public declare deleted_by_id?: number;

  @Column
  @Field({ nullable: false })
  public declare created_at?: Date;

  @Column
  @Field({ nullable: false })
  public declare updated_at?: Date;

  @Column
  @Field({ nullable: true })
  public declare deleted_at?: Date;

  @Field({ nullable: false })
  @BelongsTo(() => UserModel, { foreignKey: "posted_by_id" })
  public declare posted_by?: UserModel;

  @Field({ nullable: false })
  @BelongsTo(() => UserModel, { foreignKey: "updated_by_id" })
  public declare updated_by?: UserModel;

  @Field({ nullable: true })
  @BelongsTo(() => UserModel, { foreignKey: "deleted_by_id" })
  public declare deleted_by?: UserModel;
}

sequelize.addModels([CalculationModel]);
