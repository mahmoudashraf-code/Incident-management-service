import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { Test } from '@nestjs/testing';

describe('UsersController', () => {
    let usersController: UsersController;
    let usersService: UsersService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [UsersService],

        }).compile();
        usersService = moduleRef.get<UsersService>(UsersService);
        usersController = moduleRef.get<UsersController>(UsersController);
    });

    describe('findAll', () => {
        it('should return an array of cats', async () => {
            // const result = ['test'];
            // jest.spyOn(catsService, 'findAll').mockImplementation(() => result);

            // expect(await catsController.findAll()).toBe(result);
        });
    });
});
