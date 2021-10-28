import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose'

@Injectable()
export class MongodbConfigService implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  public createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: `mongodb+srv://${this.configService.get<string>(
        'MONGODB_USERNAME',
      )}:${this.configService.get<string>(
        'MONGODB_PASSWORD',
      )}@cluster0.zseyd.mongodb.net/${this.configService.get<string>(
        'MONGODB_DBNAME',
      )}?retryWrites=true&w=majority`,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  }
}
