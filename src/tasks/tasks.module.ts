import { Module } from '@nestjs/common';
import { TasksService } from './services/tasks.service';
import { TasksController } from './controllers/tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksEntity } from './entities/tasks.entity';
import { ProjectsEntity } from '../projects/entities/projects.entity';
import { ProjectsService } from '../projects/services/projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([TasksEntity, ProjectsEntity])],
  providers: [TasksService, ProjectsService],
  controllers: [TasksController]
})
export class TasksModule { }
