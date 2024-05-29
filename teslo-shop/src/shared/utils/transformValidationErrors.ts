import { BadRequestException, ValidationError } from '@nestjs/common';
import { upperFirstLetter } from './upperFirstLetter';

export function transformValidationErrors(errs: ValidationError[]) {
  const transformedErrs = errs.map((err) => {
    const constraints = err.constraints;
    const errors = Object.keys(constraints).map((key) =>
      upperFirstLetter(constraints[key]),
    );
    return {
      field: err.property,
      constraints: errors,
    };
  });

  return new BadRequestException(transformedErrs);
}
