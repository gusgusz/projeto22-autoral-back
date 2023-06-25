import { conflictError, notFoundError, unauthorizedError } from "@/error";
import { SignUpClient, SignInClient } from "../protocols";
import userRepository from "../repository/userRepository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function signUp(data: SignUpClient) {
  await validateUniqueEmail(data.email);
    await validateUniqueCpf(data.cpf);
   
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
   await  userRepository.signUp(data);
}


async function signIn(data: SignInClient) {
  const user = await userRepository.findByCpf(data.cpf);
  if (!user) {
    throw notFoundError();
  }
  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  if (!isPasswordValid) {
    throw unauthorizedError();
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  const userId = user.id;
    await userRepository.createSession(
      token,
      userId,
    );
  
    return token;
}


    

async function validateUniqueEmail(email: string) {
    const userWithSameEmail = await userRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw conflictError('Email already in use');
    }
  }

  async function validateUniqueCpf(cpf: string) {
    const userWithSameCpf = await userRepository.findByCpf(cpf);
    if (userWithSameCpf) {
      throw conflictError('Cpf already in use');
    }
  }

  const userService = {
    signUp,
    signIn,
    };

export default userService; 