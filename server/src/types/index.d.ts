import { User } from 'src/dto/user.entity';

declare global {
  namespace Express {
    interface Request {
      user?: Record<User>;
    }
  }
}
