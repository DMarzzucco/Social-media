import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UpdateUserDTO, UserDTO, UserToProjectDTO } from '../dto/user.dto';
import { PublicAcces } from '../../auth/decorators/public.decorator';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
// import { AdminAccess } from 'src/auth/decorators/admin.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('UserPoint')
@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {

    constructor(private readonly service: UsersService) { }

    @PublicAcces()
    @Post('register')
    public async registerUser(@Body() body: UserDTO) {
        return await this.service.createUser(body)
    }
    // @AdminAccess()
    @Roles('ADMIN')
    @Get()
    public async getUser() {
        return await this.service.findUsers()
    }
    @PublicAcces()
    @Get(":UserId")
    public async getUserbyId(@Param('UserId') UserId: string) {
        return await this.service.findUsersById(UserId)
    }

    @Roles('ADMIN')
    @Post('addProject')
    public async addProject(@Body() body: UserToProjectDTO) {
        return await this.service.realtionProject(body)
    }

    @Put(":UserId")
    public async UpdateUser(@Body() body: UpdateUserDTO, @Param('UserId') UserId: string,) {
        return await this.service.updateUser(body, UserId)
    }

    @Delete(":UserId")
    public async DeletUser(@Param("UserId") UserId: string) {
        return await this.service.deleteUser(UserId)
    }
}