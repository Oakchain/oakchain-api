import { Request, Response } from 'express';
import { GenericAnyType, ResponseCode, StatusCode } from '../@types';
import { EmailListService } from '../service';


export async function saveEmail(req: Request, res: Response) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(StatusCode.BAD_REQUEST).json({
        status: !!ResponseCode.FAILURE,
        message: 'Email is required',
      });
    }

    await EmailListService.saveEmail({ email });

    return res.status(StatusCode.OK).json({
      status: !!ResponseCode.SUCCESS,
      message: 'Email Saved',
    });
  } catch (error: GenericAnyType) {
    return res.status(error.statusCode || StatusCode.INTERNAL_SERVER_ERROR).json({
      status: !!ResponseCode.FAILURE,
      message: error.message || 'Something went wrong',
    });
  }
}

export async function getEmailList(req: Request, res: Response) {
  try {
    const emailList = await EmailListService.getEmailList();
    return res.status(StatusCode.OK).json({
      status: !!ResponseCode.SUCCESS,
      data: emailList,
    });
  } catch (error: GenericAnyType) {
    return res.status(error.statusCode || StatusCode.INTERNAL_SERVER_ERROR).json({
      status: !!ResponseCode.FAILURE,
      message: error.message || 'Something went wrong',
    });
  }
}
