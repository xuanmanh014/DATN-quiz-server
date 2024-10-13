import { AuthService } from "../auth.service"
import { UserService } from "../../modules/user/user.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../../modules/user/entities/user.entity";
import { jwtConstants } from "../constants";

describe("AuthService", () => {
    let jwtService: JwtService;
    let userService: UserService;
    let authService: AuthService;

    const mockUserService = {
        getUser: jest.fn((username) => {
            if (username === 'testuser') {
                return { email: 'testuser@test.com', password: 'testpass' };
            }
            return null;
        }),
    };

    const mockJwtService = {
        sign: jest.fn(() => 'signed-jwt-token'),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
                JwtModule.register({
                    global: true,
                    secret: jwtConstants.secret,
                    signOptions: { expiresIn: '3d' },
                }),
            ],
            providers: [
                AuthService,
                { provide: UserService, useValue: mockUserService },
                { provide: JwtService, useValue: mockJwtService },
            ],
        }).compile();

        authService = await module.resolve(AuthService);
        userService = module.get<UserService>(UserService);
        jwtService = module.get<JwtService>(JwtService);
    });

    it('should be defined', () => {
        expect(authService).toBeDefined();
    });

    describe('login', () => {
        it('should return a signed JWT token', async () => {
            const result = await authService.loginUser({ email: 'testuser@test.com', password: "test" });
            expect(result.access_token).toBe('signed-jwt-token');
        });
    });
})