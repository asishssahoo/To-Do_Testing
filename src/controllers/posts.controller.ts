import { Request, Response, json } from 'express';
import { connect } from "../database";
import { User } from "c:/Users/sahoo/Videos/To-do List/to-do_Testing/src/model/user"
import { FieldPacket, QueryResult } from 'mysql2';
import { ApiResponse } from './APIResponse';
import { ErrorHandler } from './ErrorHandler';
import { HttpStatusCode } from './HttpStatusCode';

export async function insertRecord (req: Request, res: Response) : Promise<Response>{
    const newRecord: User = req.body;
    const conn = await connect();
    try{
     const result : [QueryResult, FieldPacket[]]= await conn.query('INSERT INTO todolist1 SET ?', newRecord)
     return res.json({
        message: "Record created successfully"
    });
    } catch(e){
        const obj = JSON.parse(JSON.stringify(e));
        const errorResponse = new ApiResponse(HttpStatusCode.BadRequest, new ErrorHandler(obj.sqlState,obj.sqlMessage).getSqlMessage());
        res.statusCode= errorResponse.statusCode;
        return  res.json(errorResponse);
    }  
}


export async function getAllRecords(req: Request, res: Response): Promise<Response> {
    const conn = await connect();

    try {
        const [rows, _] = await conn.query("SELECT * FROM todolist1");

        if (rows.length === 0) {
            const errorResponse = new ApiResponse(HttpStatusCode.NotFound, "No records found");
            res.statusCode = errorResponse.statusCode;
            return res.json(errorResponse);
        }

        return res.status(HttpStatusCode.Ok).json({
            statusCode: HttpStatusCode.Ok,
            message: "Records fetched successfully",
            data: rows
        });
    } catch (e) {
        console.error("Error fetching records from database:", e);

        const errorResponse = new ApiResponse(HttpStatusCode.InternalServerError, "Unable to fetch records");
        res.statusCode = errorResponse.statusCode;
        return res.json(errorResponse);
    }
}

export async function getRecordByEmpId(req: Request, res: Response): Promise<Response> {
    const id = req.params.empId;
    const conn = await connect();

    try {
        const [rows, _] = await conn.query("SELECT * FROM todolist1 WHERE id = ?", [id]);

        if (rows.length === 0) {
            const errorResponse = new ApiResponse(HttpStatusCode.NotFound, `No record found for id = ${id}`);
            res.statusCode = errorResponse.statusCode;
            return res.json(errorResponse);
        }

        // Return the first record found (assuming there should be only one record with a given ID)
        return res.status(HttpStatusCode.Ok).json({
            statusCode: HttpStatusCode.Ok,
            message: "Record fetched successfully",
            data: rows[0] // Return the first record found
        });
    } catch (e) {
        console.error("Error fetching record from database:", e);

        const errorResponse = new ApiResponse(HttpStatusCode.InternalServerError, "Unable to fetch record", e);
        res.statusCode = errorResponse.statusCode;
        return res.json(errorResponse);
    }
}


export async function updateRecordByEmpId(req: Request, res: Response): Promise<Response> {
    const id = req.params.empId;
    const updatePost: User = req.body;

    const conn = await connect();

    try {
        // Fetch the existing record from the database
        const [existingRows] = await conn.query("SELECT * FROM todolist1 WHERE id = ?", [id]);
        if (existingRows.length === 0) {
            const errorResponse = new ApiResponse(HttpStatusCode.NotFound, `No record found for id = ${id}`);
            res.statusCode = errorResponse.statusCode;
            return res.json(errorResponse);
        }

        const existingRecord = existingRows[0];

        // Check if the update would result in any changes to the existing record
        const isIdenticalUpdate = compareRecords(existingRecord, updatePost);
        if (isIdenticalUpdate) {
            // No changes detected, consider this as a duplicate update
            return res.status(HttpStatusCode.Ok).json({
                message: "No changes detected, record is already up to date",
                updatedId: id
            });
        }

        // Perform the update operation
        const [updateResult] = await conn.query("UPDATE todolist1 SET ? WHERE id = ?", [updatePost, id]);
        const affectedRows = updateResult.affectedRows;

        if (affectedRows === 0) {
            const errorResponse = new ApiResponse(HttpStatusCode.NotFound, `No record found for id = ${id}`);
            res.statusCode = errorResponse.statusCode;
            return res.json(errorResponse);
        }

        return res.status(HttpStatusCode.Ok).json({
            message: "Record updated successfully",
            updatedId: id
        });
    } catch (e: any) {
        console.error("Error updating record in database:", e);

        // Use type assertion to ensure 'e' is treated as an Error
        const errorMessage = (e as Error).message || 'Unknown error';
        const errorResponse = new ApiResponse(HttpStatusCode.InternalServerError, "Unable to update record", errorMessage);
        res.statusCode = errorResponse.statusCode;
        return res.json(errorResponse);
    }
}

function compareRecords(record1: User, record2: User): boolean {
    // Implement your custom logic to compare two records
    return JSON.stringify(record1) === JSON.stringify(record2);
}


export async function deleteRecordByEmpId(req: Request, res: Response): Promise<Response> {
    const id = req.params.empId;
    const conn = await connect();

    try {
        const [deleteResult] = await conn.query("DELETE FROM todolist1 WHERE id = ?", [id]);
        const affectedRows = deleteResult.affectedRows;

        if (affectedRows === 0) {
            const errorResponse = new ApiResponse(HttpStatusCode.NotFound, `No record found for id = ${id}`);
            return res.status(HttpStatusCode.NotFound).json(errorResponse);
        }

        return res.status(HttpStatusCode.Ok).json({
            message: "Record deleted successfully",
            deletedId: id
        });
    } catch (e) {
        console.error("Error deleting record from database:", e);

        const errorMessage = (e instanceof Error) ? e.message : 'Unknown error';
        const errorResponse = new ApiResponse(HttpStatusCode.InternalServerError, "Unable to delete record", errorMessage);
        return res.status(HttpStatusCode.InternalServerError).json(errorResponse);
    }
}

export async function deleteAllRecords(req: Request, res: Response) : Promise<Response>{
    //const id = req.params.empId;
    const conn = await connect();
    try{
    const posts : [QueryResult, FieldPacket[]] = await conn.query("DELETE FROM todolist1");
    const outputJson = JSON.parse(JSON.stringify(posts));
    const affectedRows = outputJson[0].affectedRows;
    if(affectedRows === 0){
        const errorResponse = new ApiResponse(HttpStatusCode.NotFound, "No record to be deleted");
        res.statusCode = errorResponse.statusCode;
        return res.json(errorResponse);
    }
    return res.json({
        message: "Records are deleted successfully.."
    })
    } catch(e){
        if(e instanceof Error){
            const errorResponse = new ApiResponse(HttpStatusCode.InternalServerError, "Unable to delete records", e.message);
            res.statusCode = errorResponse.statusCode;
            return res.json(errorResponse);
            }
            const errorResponse = new ApiResponse(HttpStatusCode.InternalServerError, "Unable to delete records", e);
            res.statusCode = errorResponse.statusCode;
            return res.json(errorResponse);
    }
}