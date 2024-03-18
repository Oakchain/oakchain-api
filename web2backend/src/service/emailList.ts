import EmailList from '../models/emailList';
import { SAMSON_UTILS } from 'sm-pkjs/dist';
import { StatusCode } from '../@types';

const { ApiError } = SAMSON_UTILS;

class EmailListService {
  async saveEmail(EmailListData: { email: string }) {
    try {
      const emailList = new EmailList(EmailListData);
      await emailList.save();
      return emailList;
    } catch (error) {
      throw new ApiError(
        'impact api',
        error as string,
        'createEmailList',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getEmailList() {
    try {
      const emailList = await EmailList.find();
      return emailList;
    } catch (error) {
      throw new ApiError(
        'impact api',
        error as string,
        'getEmailList',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

}

export default new EmailListService();
