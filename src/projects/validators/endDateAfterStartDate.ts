import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { format } from 'date-fns';
import { CreateProjectDto } from '../dto/create-project.dto';

@ValidatorConstraint({ name: 'EndDateAfterStartDate', async: false })
export class EndDateAfterStartDate implements ValidatorConstraintInterface {
  validate(endDate: Date, args: ValidationArguments) {
    const obj = args.object as CreateProjectDto;
    return obj.startDate && endDate && endDate >= obj.startDate;
  }

  defaultMessage(args: ValidationArguments) {
    const obj = args.object as CreateProjectDto;
    return `endDate ${format(obj.endDate, 'yyyy-MM-dd')} must be after startDate ${format(obj.startDate, 'yyyy-MM-dd')}`;
  }
}
