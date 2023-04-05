// import {
//   Injectable,
//   NestInterceptor,
//   ExecutionContext,
//   CallHandler,
// } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { ApiResponse } from './api-response.dto';

// @Injectable()
// export class TransformResponseInterceptor<T>
//   implements NestInterceptor<T, ApiResponse<T>>
// {
//   intercept(
//     context: ExecutionContext,
//     next: CallHandler
//   ): Observable<ApiResponse<T>> {
//     return next.handle().pipe(
//       map((data) => {
//         return {
//           statusCode: context.switchToHttp().getResponse().statusCode,
//           message: 'Success',
//           data,
//         };
//       })
//     );
//   }
// }
