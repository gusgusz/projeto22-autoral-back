import { Prisma } from '@prisma/client';
import { SignUpClient } from '../protocols';
import prisma from '../config/database';

async function findByEmail(email: string) {

    return await prisma.client.findFirst({
        where: {
            email,
        },
  });
}

async function findByCpf(cpf: string) {

  return await prisma.client.findFirst({
      where: {
          cpf,
      },
});
}

async function createSession(token: string, userId: number) {
  return await prisma.session.create({
    data: {
      token,
      userId,
    },
  });
}

async function signUp(data: SignUpClient) {
  return await prisma.client.create({
    data,
  });
}

const userRepository = {
  findByEmail,
  findByCpf,
  createSession,
  signUp,
};
export default userRepository;