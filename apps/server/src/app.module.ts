import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { environment } from './environments/environment';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionsModule } from './modules/questions/questions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => environment]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('databaseUri'),
        connectionFactory: (connection) => {
          connection.plugin(require('./common/paginate.plugin'));
          return connection;
        }
      }),
      inject: [ConfigService]
    }),
    QuestionsModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ]
})
export class AppModule {
}
