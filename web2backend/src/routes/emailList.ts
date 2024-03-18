import { Router } from 'express';
import { saveEmail, getEmailList } from '../controller/emailList';

const router = Router();

router.post('/', saveEmail);
router.get('/', getEmailList);

export default router;
