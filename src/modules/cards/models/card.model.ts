import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Columns } from 'src/modules/columns/models/column.model';
import { Comment } from 'src/modules/comments/models/comment.model';

@Table
export class Card extends Model {
  @Column
  title: string;

  @Column
  description: string;

  @ForeignKey(() => Columns)
  @Column
  columnId: number;

  @BelongsTo(() => Columns)
  column: Columns;

  @HasMany(() => Comment)
  comments: Comment[];
}
