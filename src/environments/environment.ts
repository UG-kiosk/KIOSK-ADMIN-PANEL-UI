import { localEnvironment } from './environment.local';
import { prodEnvironment } from './environment.prod';

export const environment = import.meta.env.PROD ? prodEnvironment : localEnvironment;
