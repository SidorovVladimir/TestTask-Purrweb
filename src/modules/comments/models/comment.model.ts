import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Card } from 'src/modules/cards/models/card.model';

@Table
export class Comment extends Model {
  @Column
  comment: string;

  @ForeignKey(() => Card)
  cardId: number;

  @BelongsTo(() => Card)
  card: Card;
}
