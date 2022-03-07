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
  BeforeSave,
  ForeignKey,
  BelongsTo,
  Scopes,
  Comment,
} from "sequelize-typescript";
import { WebModel } from "./";

@Table({
  tableName: "pages",
  indexes: [
    {
      fields: ["id", "name", "webId"],
    },
  ],
})
export class PageModel extends Model<PageModel> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => WebModel)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  webId: number;

  @Comment("Name Page")
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
  @BelongsTo(() => WebModel)
  web?: WebModel;

  // toJSON
  toJSON(): object {
    const obj: any = super.toJSON();
    return obj;
  }

  //  @ForeignKey(() => GroupModel)
  //  @AllowNull(true)
  //  @Column
  //  group_id?: number;

  //  @HasMany(() => CommentModel, {
  //    onDelete: "cascade"
  //  })
  //  comments?: CommentModel[];

  //  @BelongsTo(() => GroupModel)
  //  group?: GroupModel;
}
