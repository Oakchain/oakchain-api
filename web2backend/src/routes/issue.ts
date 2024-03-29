import { Router } from 'express';
import { createIssue, listIssues, getIssue, updateIssue, deleteIssue } from '../controller';
import { IssueMiddleware } from '../middleware';

const router = Router();

router.post('/', IssueMiddleware.inspectCreateIssue, createIssue);
router.get('/', listIssues);
router.get('/:issueId', getIssue);
router.put('/:issueId', IssueMiddleware.inspectUpdateIssue, updateIssue);
router.delete('/:issueId', deleteIssue);

export default router;
