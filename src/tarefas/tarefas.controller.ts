import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TarefasService } from './tarefas.service';
import { CriarTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { Tarefa } from './entities/tarefa.entity';

@Controller('tarefas')
export class TarefasController {
  constructor(private readonly tarefasService: TarefasService) {}

  @Post()
  async create(@Body() criartarefaDto: CriarTarefaDto): Promise<Tarefa> {
    return this.tarefasService.create(criartarefaDto);
  }

  @Get()
  async findAll(): Promise<Tarefa[]> {
    return this.tarefasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tarefasService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTarefaDto: UpdateTarefaDto): Promise<Tarefa> {
    return this.tarefasService.update(id, updateTarefaDto);
  }

  @Patch(':id')
  async partialUpdate(@Param('id') id: string, @Body() updateTarefaDto: UpdateTarefaDto): Promise<Tarefa> {
    return this.tarefasService.partialUpdate(id, updateTarefaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.tarefasService.remove(id);
  }
}
