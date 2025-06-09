import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from '@cha-cha-chat/dto';
import { User } from 'generated/prisma';

describe('UserService', () => {
  let service: UserService;

  const prismaMock = {
    user: {
      create: jest.fn(),
      count: jest.fn(),
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    prismaMock.user.create.mockReset();
    prismaMock.user.count.mockReset();
    prismaMock.user.findMany.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const dto: UserDto = {
      username: 'juan',
      joinedAt: 1620000000000,
    };

    const createdUser: User = {
      username: dto.username,
      joinedAt: new Date(dto.joinedAt),
    };

    prismaMock.user.create.mockResolvedValue(createdUser);
    const result = await service.create(dto);

    expect(prismaMock.user.create).toHaveBeenCalledWith({
      data: {
        username: dto.username,
        joinedAt: new Date(dto.joinedAt),
      },
    });

    expect(result).toEqual(createdUser);
  });

  it('should return true when user count is greater than zero', async () => {
    const username = 'juan';

    prismaMock.user.count.mockResolvedValue(1);
    const result = await service.exists(username);

    expect(prismaMock.user.count).toHaveBeenCalledWith({
      where: {
        username: username,
      },
    });

    expect(result).toEqual(true);
  });

  it('should return false when user count is zero', async () => {
    const username = 'juan';

    prismaMock.user.count.mockResolvedValue(0);
    const result = await service.exists(username);

    expect(prismaMock.user.count).toHaveBeenCalledWith({
      where: {
        username: username,
      },
    });

    expect(result).toEqual(false);
  });

  it('should get users who joined in the time range', async () => {
    const startTimestamp = 1620000000000;
    const endTimestamp = startTimestamp + 1000;

    const joinedUsers: User[] = [
      {
        username: 'juan',
        joinedAt: new Date(1620000000000),
      },
      {
        username: 'maria',
        joinedAt: new Date(1620000001000),
      },
    ];

    prismaMock.user.findMany.mockResolvedValue(joinedUsers);
    const result = await service.getJoinedWithin(startTimestamp, endTimestamp);

    expect(prismaMock.user.findMany).toHaveBeenCalledWith({
      where: {
        joinedAt: {
          gte: new Date(startTimestamp),
          lte: new Date(endTimestamp),
        },
      },
    });

    expect(result).toEqual(joinedUsers);
  });

  it('should get zero users who joined in the time range', async () => {
    const startTimestamp = 1620000000000;
    const endTimestamp = startTimestamp + 1000;

    const joinedUsers: User[] = [];

    prismaMock.user.findMany.mockResolvedValue(joinedUsers);
    const result = await service.getJoinedWithin(startTimestamp, endTimestamp);

    expect(prismaMock.user.findMany).toHaveBeenCalledWith({
      where: {
        joinedAt: {
          gte: new Date(startTimestamp),
          lte: new Date(endTimestamp),
        },
      },
    });

    expect(result).toEqual(joinedUsers);
  });
});
