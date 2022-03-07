import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  AllowNull,
  Default,
  DataType,
  DeletedAt,
  HasMany,
  PrimaryKey,
  Sequelize,
  ForeignKey,
  BelongsTo,
  Comment,
} from "sequelize-typescript";
import { PageModel, CategoryModel } from "./";

@Table({
  tableName: "webs",
  indexes: [
    {
      fields: ["id", "name", "cateId"],
    },
  ],
})
export class WebModel extends Model<WebModel> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => CategoryModel)
  @AllowNull(true)
  @Column({
    type: DataType.INTEGER,
  })
  cateId: number;

  @Comment("Name website")
  @AllowNull(false)
  @Column({
    type: DataType.STRING(225),
  })
  name: string;

  /* Timestamp */
  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @DeletedAt
  @Column
  deletedAt: Date;

  /* Association */
  @HasMany(() => PageModel, {
    onDelete: "cascade",
  })
  pages?: PageModel[];

  @BelongsTo(() => CategoryModel)
  cate?: CategoryModel;

  //  @ForeignKey(() => GroupModel)
  //  @AllowNull(true)
  //  @Column
  //  group_id?: number;
}
