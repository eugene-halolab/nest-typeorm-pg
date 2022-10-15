import { SelectQueryBuilder } from "typeorm/query-builder/SelectQueryBuilder";

let subQueryArray: boolean = false;

declare module 'typeorm/query-builder/SelectQueryBuilder' {
  interface SelectQueryBuilder<Entity> {
    getQuery(this: SelectQueryBuilder<Entity>): string
    subQueryArray(this: SelectQueryBuilder<Entity>, isTrue: boolean): SelectQueryBuilder<any>
  }
}

SelectQueryBuilder.prototype.getQuery = function <Entity>(this: SelectQueryBuilder<Entity>): string {
  let sql = this.createSelectExpression();
  sql += this.createJoinExpression();
  sql += this.createWhereExpression();
  sql += this.createGroupByExpression();
  sql += this.createHavingExpression();
  sql += this.createOrderByExpression();
  sql += this.createLimitOffsetExpression();
  sql += this.createLockExpression();
  sql = sql.trim();

  if (subQueryArray)
    sql = "array(" + sql + ")";
  else if (this.expressionMap.subQuery)
    sql = "(" + sql + ")";

  subQueryArray = false
  return sql;
}

SelectQueryBuilder.prototype.subQueryArray = function <Entity>(this: SelectQueryBuilder<Entity>, isTrue: boolean = false): SelectQueryBuilder<any> {
  const qb = this.createQueryBuilder();
  subQueryArray = isTrue;
  return qb;
}
