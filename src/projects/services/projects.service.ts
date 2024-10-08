import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsEntity } from '../entities/projects.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProjectDTO, UpdateProjectDTO } from '../dto/project.dto';
import { UsersProjectsEntity } from '../../users/entities/usersProjects.entity';
import { ACCES_LEVEL } from '../../constants/roles';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class ProjectsService {


    constructor(
        @InjectRepository(ProjectsEntity) private readonly project: Repository<ProjectsEntity>,
        @InjectRepository(UsersProjectsEntity) private readonly userRepository: Repository<UsersProjectsEntity>,
        private readonly user: UsersService

    ) { }

    public async create(body: ProjectDTO, UserId: string): Promise<any> {
        const user = await this.user.findUsersById(UserId)
        if (!user) {
            throw new NotFoundException(`User with id ${UserId} not found`)
        }
        const project = await this.project.save(body);

        return await this.userRepository.save({
            accessLevel: ACCES_LEVEL.OWNER,
            user: user,
            project: project
        })
    }
    public async get(): Promise<ProjectsEntity[]> {
        const res = await this.project.find()
        if (res.length === 0) {
            throw new BadRequestException('Not dara record')
        }
        return res
    }
    public async getById(id: string): Promise<ProjectsEntity> {
        const project = await this.project
            .createQueryBuilder('project')
            .where({ id })
            .leftJoinAndSelect("project.usersInludes", "usersInludes")
            .leftJoinAndSelect("usersInludes.user", "user")
            .getOne()
        if (!project) {
            throw new NotFoundException("Project not found")
        }
        return project
    }
    public async update(body: UpdateProjectDTO, id: string): Promise<UpdateResult | undefined> {
        const project: UpdateResult = await this.project.update(id, body)
        if (project.affected === 0) {
            throw new NotFoundException('Project not found')
        }
        return project
    }
    public async delete(id: string): Promise<DeleteResult | undefined> {
        const project: DeleteResult = await this.project.delete(id)
        if (project.affected === 0) {
            throw new NotFoundException('Project not found')
        }
        return project
    }
}
