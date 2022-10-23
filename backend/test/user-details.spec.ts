import { UsersService } from '../src/api/users/users.service';
import { UsersRepository } from '../src/api/users/repository/users.repository';
import { User, UserSchema } from '../src/api/users/schemas/user.schema';
import { CreateUserDto } from '../src/api/users/dto/create-user.dto';
import { faker } from '@faker-js/faker';
import { Role } from '../src/utils/role';
import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from '../src/api/users/users.controller';
import { Errors } from '../src/utils/errors';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('User service test', () => {
  let usersService: UsersService;
  let repository: UsersRepository;

  const userId: string = faker.datatype.uuid();
  const user: CreateUserDto = {
    uid: userId,
    firstname: faker.name.firstName(),
    surname: faker.name.lastName(),
    primaryOffice: {
      name: faker.name.firstName(),
      _id: faker.datatype.uuid(),
      location: 'Maribor',
    },
    redirectOnLogin: false,
    role: Role.USER,
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: `${process.cwd()}/.${process.env.NODE_ENV}.env`,
        }),
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            uri: configService.get<string>('DATABASE_URI'),
          }),
          inject: [ConfigService],
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      controllers: [UsersController],
      providers: [UsersService, UsersRepository],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    repository = moduleRef.get<UsersRepository>(UsersRepository);
  });

  afterAll(async () => {
    await repository.deleteAll();
  });

  it('should create user successfully', async () => {
    const res = await usersService.createUserDetails(user);
    expect(res).toEqual({ success: 'User details saved successfully' });
  });

  it('should fail to create user details if user already exists', async () => {
    let error;
    try {
      await usersService.createUserDetails(user);
    } catch (e) {
      error = e;
    }
    expect(error.message).toEqual(Errors.USER_ALREADY_EXISTS);
  });

  it('should retrieve user details if user exists', async () => {
    const res = await usersService.getUserDetails(userId);
    expect(res.uid).toEqual(userId);
  });

  it("should fail to retrieve user details if user doesn't exist", async () => {
    let error;
    try {
      await usersService.getUserDetails(faker.datatype.uuid());
    } catch (e) {
      error = e;
    }
    expect(error.message).toEqual(Errors.USER_NOT_FOUND);
  });

  it('user should be able to update their details', async () => {
    const res = await usersService.updateUserDetails(
      { firstname: 'joža' },
      userId,
    );
    expect(res).toEqual({ success: 'User details saved successfully' });
  });
});
