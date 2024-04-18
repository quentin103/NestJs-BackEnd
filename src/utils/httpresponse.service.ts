/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";

@Injectable()
export class HttpResponseService {
  async responseData({ message, data, status }: HttpResponse) {
    return { status: status, message: message, data: data };
  }
}

interface HttpResponse {
  message: string;
  data: any;
  status: number;
}
