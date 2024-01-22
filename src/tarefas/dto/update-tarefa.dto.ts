import { PartialType } from '@nestjs/mapped-types';
import { CriarTarefaDto } from './create-tarefa.dto';

export class UpdateTarefaDto extends PartialType(CriarTarefaDto) {
        titulo?: string;
        descricao?: string;
        prazo?: string;
        prioridade?: string;

}
