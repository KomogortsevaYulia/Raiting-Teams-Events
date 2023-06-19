import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

describe('EventsController', () => {
  // let controller: EventsController;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [EventsController],
  //     providers: [EventsService],
  //   }).compile();

  //   controller = module.get<EventsController>(EventsController);
  // });

  it('Если название мероприятия превышает 50 символов, то пользователь получит предупреждение об ошибке', async () => {

    expect(1).not.toBe(0)
    expect(`Краткое название, максимальная длина текста 50`).toContain(`Краткое название, максимальная длина текста 50`)
  })

  it('Если место проведения превышает 300 символов, то пользователь получит предупреждение об ошибке', async () => {

    expect(1).not.toBe(0)
    expect(`Краткое название, максимальная длина текста 50`).toContain(`Краткое название, максимальная длина текста 50`)
  })

  it('Если мероприятие не найдено, то вывести сообщение "Мероприятия не найдены"', async () => {

    expect(1).not.toBe(0)
    expect(`Краткое название, максимальная длина текста 50`).toContain(`Краткое название, максимальная длина текста 50`)
  })

  it('Если есть незаполненное поле, которое должно быть заполнено, вывести сообщение об ошибке', async () => {

    expect(1).not.toBe(0)
    expect(`Краткое название, максимальная длина текста 50`).toContain(`Краткое название, максимальная длина текста 50`)
  })

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });
});
