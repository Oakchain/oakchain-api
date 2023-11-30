import Issue from '../models/issue';
import { StatusCode, CreateIssueType, UpdateIssueType, IssueQueryType } from '../@types';
import { ApiError } from '../utils';
import { Toolbox } from '../utils';

const { createUserQuery } = Toolbox;

class IssueService {
  async createIssue(issueData: CreateIssueType) {
    try {
      const issue = new Issue(issueData);
      await issue.save();
      return issue;
    } catch (error) {
      throw new ApiError(
        'impact api',
        error as string,
        'createissue',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getIssueById(issueId: string) {
    try {
      const issue = await Issue.findOne({ _id: issueId });
      return issue;
    } catch (error) {
      throw new ApiError(
        'impact api',
        error as string,
        'getIssueById',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateIssue(issueId: string, issueData: UpdateIssueType) {
    try {
      const issue = await Issue.findByIdAndUpdate(issueId, issueData, {
        new: true,
      });
      if (!issue) return null;
      return issue;
    } catch (error) {
      console.log(error, 'from update issue');
      throw new ApiError(
        'impact api',
        error as string,
        'updateissue',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  deleteIssue = async (issueId: string) => {
    try {
      const issue = await Issue.findByIdAndDelete(issueId);
      if (!issue) return null;
      return issue;
    } catch (error) {
      throw new ApiError(
        'impact api',
        error as string,
        'deleteissue',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  };

  getAllIssues = async (data: IssueQueryType) => {
    try {
      const query = createUserQuery({}, data);
      const limit = Number(data.limit) || 10;
      const page = Number(data.page) || 0;

      const issues = await Issue.find(query)
        .limit(limit)
        .skip(page * limit);

      return issues;
    } catch (error) {
      throw new ApiError(
        'impact api',
        error as string,
        'getAllissues',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  };

  getIssuesCount = async () => {
    try {
      const count = await Issue.count();

      return count;
    } catch (error) {
      throw new ApiError(
        'impact api',
        error as string,
        'getAllissues',
        StatusCode.INTERNAL_SERVER_ERROR
      );
    }
  };
}

export default new IssueService();
