import { Injectable } from '@nestjs/common';
import { AxiosAdapter } from '../adapters/AxiosAdapter';

@Injectable()
export class HttpService extends AxiosAdapter {}
