import { Sequelize, sequelize } from "../../server/dbconfig";
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";
import { Field, ObjectType } from "type-graphql";
import * as constants from "../../constants";
@Table({
  timestamps: true,
  tableName: "users",
  paranoid: true,
  underscored: true,
})
@ObjectType()
export class UserModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  @Field({ nullable: false })
  public declare id?: number;

  @Column
  @Field({ nullable: false })
  public declare first_name?: string;

  @Column
  @Field({ nullable: false })
  public declare last_name?: string;

  @Column
  @Field({ nullable: false })
  public declare email?: string;

  @Column
  public declare password?: string;

  @Column
  @Field({ nullable: false })
  public declare type?: constants.USER_TYPES;

  @Column
  @Field({ nullable: false })
  public declare created_at?: Date;

  @Column
  @Field({ nullable: false })
  public declare updated_at?: Date;

  @Column
  @Field({ nullable: true })
  public declare deleted_at?: Date;
}

sequelize.addModels([UserModel]);
