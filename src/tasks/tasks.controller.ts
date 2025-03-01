import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from '@prisma/client';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: { title: string }): Promise<Task> {
    return this.tasksService.createTask({
      title: createTaskDto.title,
      completed: false,
    });
  }

  @Get()
  async findAll(): Promise<Task[]> {
    return this.tasksService.getTasks();
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: { title?: string; completed?: boolean },
  ): Promise<Task> {
    return this.tasksService.updateTask(Number(id), updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Task> {
    return this.tasksService.deleteTask(Number(id));
  }
}
