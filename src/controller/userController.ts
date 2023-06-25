import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import userService from '../service/userService';
import { SignUpClient } from '@/protocols';

export async function signUp(req: Request, res: Response, next: NextFunction) {
  const data : SignUpClient= req.body;

  try {
    await userService.signUp(data);
    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    console.log(error);
   next(error);
  }
}


export async function signIn(req: Request, res: Response, next: NextFunction) {
  const { cpf, password } = req.body;

  try {
    
    const result = await userService.signIn({ cpf, password });

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
}


// export async function updateUserData(req: Request, res: Response, next: NextFunction) {
//   const { id } = req.params;
//   const data = req.body;
   
//   try {
//     const user = await userService.updateUserData(id, data);
//     return res.status(httpStatus.OK).json({
//       id: user.id,
//       email: user.email,
//     });
//   } catch (error) {
//     next(error);
//   }
// }



// export async function defineAdmin(req: Request, res: Response, next: NextFunction) {
//   const { ClientId } = req.body;
//   const {userId} = req;
//   try {
//     const result = await userService.defineAdmin(ClientId, userId );

//     return res.status(httpStatus.OK).send(result);
//   }catch (error) {
//     next(error);
//   }
// }