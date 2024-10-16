import {Router} from 'express'
import { createEmployee, employeList, deleteItem, updateEmployee } from '../controlers/empoloyee.controlers.js';
import upload from '../middleware/multer.middleware.js'
import isLogidin from '../middleware/auth.middleware.js';

const router=Router();

router.post('/createEmployee',upload.single("avatar"), createEmployee)
router.get('/employeList/:id',employeList);
router.put('/updateEmployee/:id', upload.single('avatar'), updateEmployee);
router.delete('/delete/:id', deleteItem);

export default router;