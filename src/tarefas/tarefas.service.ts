import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CriarTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { Tarefa } from './entities/tarefa.entity';

@Injectable()
export class TarefasService {
  constructor(
    @InjectRepository(Tarefa)
    private readonly tarefaRepository: Repository<Tarefa>,
  ) {}
  
  async create(criarTarefaDto: CriarTarefaDto):Promise<Tarefa> {
    const tarefa = this.tarefaRepository.create(criarTarefaDto);
    return this.tarefaRepository.save(tarefa);
  }

  async findAll(): Promise<Tarefa[]> {
    return this.tarefaRepository.find();
  }

  async findOne(id: string): Promise<Tarefa> {
    const tarefa = await this.tarefaRepository.findOne({ where: { id } });
    if (!tarefa) {
      throw new NotFoundException(`Tarefa ${id} não encontrada`);
    }

    return tarefa;
  }

  async update(id: string, updateTarefaDto: UpdateTarefaDto): Promise<Tarefa> {
    const tarefa = await this.tarefaRepository.findOne({ where: { id } });
    if (!tarefa) {
      throw new NotFoundException(`Tarefa ${id} não encontrada`);
    }

    this.tarefaRepository.merge(tarefa, updateTarefaDto);
    return this.tarefaRepository.save(tarefa);
  }

  async remove(id: string): Promise<void> {
    const tarefa = await this.tarefaRepository.findOne({ where: { id } });
    if (!tarefa) {
      throw new NotFoundException(`Tarefa ${id} não encontrada`);
    }

    await this.tarefaRepository.remove(tarefa);
  }

  async partialUpdate(id: string, updateTarefaDto: UpdateTarefaDto): Promise<Tarefa> {
    const tarefa = await this.tarefaRepository.findOne({ where: { id } });
    if (!tarefa) {
      throw new NotFoundException(`Tarefa ${id} não encontrada`);
    }

    this.tarefaRepository.merge(tarefa, updateTarefaDto);
    return this.tarefaRepository.save(tarefa);
  }
}
