import { Router } from 'express';
import { insertRecord, deleteRecordByEmpId, getAllRecords, getRecordByEmpId, updateRecordByEmpId,deleteAllRecords } from '../controllers/posts.controller';
import { basicAuth } from '../controllers/authMiddleware';

const router = Router();

router.route("/getallrecords").get(basicAuth, getAllRecords);
router.route("/getrecord/:empId").get(basicAuth, getRecordByEmpId);

router.route("/insertrecord").post(basicAuth, insertRecord);
router.route("/updaterecord/:empId").put(basicAuth, updateRecordByEmpId);

router.route("/deleterecord/:empId").delete(basicAuth, deleteRecordByEmpId);
router.route("/deleteallrecords").delete(basicAuth, deleteAllRecords);


export default router;