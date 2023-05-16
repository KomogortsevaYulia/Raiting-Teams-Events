
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function MaxFileSize(maxSize: number, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'maxFileSize',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
            console.log("dfj")
            console.log(value)
          if (!value) {
            return true; // skip validation if value is not provided
          }
          return value.size <= maxSize;
        },
      },
    });
  };
}
