import { Controller, Get, Post, Request, UploadedFile, UseInterceptors, UseGuards } from '@nestjs/common';
import { JwtAuthuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReportsService } from './reports.service';


@Controller('reports')
export class ReportsController {

  constructor(private reportService: ReportsService) { }

  @UseGuards(JwtAuthuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File, @Request() req) {
    const user = req.user;
    const csvData = this.reportService.parseAndDbSave(file, user.id)

    return csvData;
  }

  @UseGuards(JwtAuthuard)
  @Get()
  getAll(@Request() req) {
    const user = req.user;
    const data = this.reportService.report(user.id)

    return data;
  }
}
