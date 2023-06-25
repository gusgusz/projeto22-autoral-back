import { Client } from '@prisma/client'



type sig =  'id' | 'createdAt' | 'isAdmin' | 'image';
export type SignUpClient = Omit<Client, sig>;




export type SignInClient = {
    cpf: string;
    password: string;
  };

export type ApplicationError = {
    name: string;
    message: string;
  };