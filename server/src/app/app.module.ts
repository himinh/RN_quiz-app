import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { QuestionsModule } from 'src/questions/questions.module';
import { QuizzesModule } from 'src/quizzes/quizzes.module';
import { UploadModule } from 'src/uploads/upload.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UserModule,
    AuthModule,
    QuizzesModule,
    QuestionsModule,
    UploadModule,
    CategoriesModule,
  ],
})
export class AppModule {}
