import { IsNotEmpty, MaxLength } from "class-validator";

export class CriarTarefaDto {
    @IsNotEmpty({message: 'O título não pode ser vazio.'})
    @MaxLength(120)
    titulo: string;
    @IsNotEmpty({message: 'A descrição não pode ser vazia.'})
    @MaxLength(120)
    descricao: string;
    prazo: string;
    prioridade: string;
  }
