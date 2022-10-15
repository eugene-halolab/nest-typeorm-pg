import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CsvModule } from 'nest-csv-parser'
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { ReportEntity } from './reports.entity';
import { AuthModule } from '../auth/auth.module';


@Module({
  imports: [
    CsvModule,
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([ReportEntity])
  ],
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class ReportsModule { }
