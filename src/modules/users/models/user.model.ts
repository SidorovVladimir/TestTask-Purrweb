import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Columns } from 'src/modules/columns/models/column.model';

@Table
export class User extends Model {
  @Column
  firstName: string;

  @Column
  email: string;

  @Column
  password: string;

  @HasMany(() => Columns)
  columns: Columns[];
}
