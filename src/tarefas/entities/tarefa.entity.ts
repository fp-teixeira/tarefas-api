import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('tarefas')
export class Tarefa {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    titulo: string;

    @Column()
    descricao: string;

    @Column()
    prazo: string;

    @Column()
    prioridade: string;
}
