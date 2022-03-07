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
  HasOne,
  Sequelize,
  ForeignKey,
  BelongsTo,
  Scopes,
  Comment,
} from "sequelize-typescript";
import { WebModel } from ".";

@Table({
  tableName: "category",
  indexes: [
    {
      fields: ["id", "name"],
    },
  ],
})
export class CategoryModel extends Model<CategoryModel> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Comment("Name category")
  @Column({ type: DataType.STRING(500) })
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
  @HasMany(() => WebModel, {
    onDelete: "cascade",
  })
  webs?: WebModel[];

  // @BelongsTo(() => WebModel)
  // webb?: WebModel;
}
