import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TarefasModule } from './tarefas/tarefas.module';
import { Tarefa } from './tarefas/entities/tarefa.entity';
import * as cors from 'cors';


@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService)=>({
        type: 'postgres',
        host: configService.get('DB_HOST','localhost'),
        port: Number(configService.get('DB_PORT', 5432)),
        username: configService.get('DB_USERNAME','root'),
        password: configService.get('DB_PW','123'),
        database: configService.get('DB_DATABASE','tarefas'),
        entities: [Tarefa],
        synchronize: true,
        logging: false
    }),
  }),
    TarefasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(
      cors({
        origin: 'http://localhost:8080', //aceita apenas desse path
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
      }),
    ).forRoutes('*');
  }
}

