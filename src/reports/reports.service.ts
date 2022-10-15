import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CsvParser } from 'nest-csv-parser'
import { Readable } from 'stream';
import '../helpers/querys'
import { Repository } from 'typeorm'

import { ReportsDto } from './dto/reports.dto';
import { ReportEntity } from './reports.entity';

@Injectable()
export class ReportsService {

  constructor(
    @InjectRepository(ReportEntity)
    private readonly reportsRepository: Repository<ReportEntity>,
    private readonly csvParser: CsvParser,
  ) { }

  async parseAndDbSave(file: Express.Multer.File, userId: number) {
    const stream = await this.getReadableStream(file.buffer)

    const entities = await this.csvParser.parse(stream, ReportsDto, null, null, { strict: true, separator: ',' });
    const list = entities.list.map(list => {
      list.user_id = userId;
      return list;
    })

    const res = await this.reportsRepository.save(list);
    return res;
  }

  async getReadableStream(buffer: Buffer): Promise<Readable> {
    const stream = new Readable();

    stream.push(buffer);
    stream.push(null);

    return stream;
  }

  async report(userId: number) {

    const report = await this.reportsRepository
      .createQueryBuilder()
      .from(ReportEntity, 'r1')
      .select('r1.source', 'name')
      .addSelect((subQuery) => {
        const subquery = subQuery
          .subQueryArray(true)
          .select(`json_build_object('date', to_char(to_date("date", 'dd-mm-yyyy'), 'mm-yyyy'), 'total', sum("sum") )`)
          .from(ReportEntity, 'r2')
          .where('r1.source = r2.source')
          .groupBy(`to_char(to_date("date", 'dd-mm-yyyy'), 'mm-yyyy')`)
        return subquery;
      }, "data")
      .where('r1.user_id=:userId', { userId })
      .groupBy('r1.source')
      .getRawMany();

    return report;
  }
}
