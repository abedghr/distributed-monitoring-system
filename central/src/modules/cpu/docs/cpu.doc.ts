import { HttpStatus, applyDecorators } from '@nestjs/common';
import { Doc } from 'src/common/doc/decorators/doc.decorator';

export function CPUUsageCreateDoc(): MethodDecorator {
    return applyDecorators(
        Doc('cpu-usage.create', {
            response: {
                httpStatus: HttpStatus.NO_CONTENT
            },
        })
    );
}

export function CPUUsageGetDoc(): MethodDecorator {
    return applyDecorators(
        Doc('cpu-usage.get', {
            response: {
                httpStatus: HttpStatus.OK
            },
        })
    );
}

export function UserUpdateDoc(): MethodDecorator {
    return applyDecorators(
        Doc('user.update', {
            response: {
                httpStatus: HttpStatus.OK,
                // serialization: UserGetSerialization
            },
        })
    );
}