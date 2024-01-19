import axios from 'axios'
import { ITodo } from '../interfaces/todo.interface'
import dotenv from "dotenv";
import { IOutPut } from '../interfaces/output.interface';
import { RETURN_CODE, RETURN_MESSAGE } from '../enums/return.enum';
(async () => {
    dotenv.config();
})();
class TodoController {
    static base_url: string = String(process.env.WEB_SERVICE || '')

    static addTodo = async (data: ITodo): Promise<IOutPut | undefined> => {
        try {
            if (data) {
                const result = await axios(`${this.base_url}/todos`, { method: "GET" })
                const todoData: ITodo[] = result.data
                data = {
                    ...data,
                    id: todoData.length - 1
                }
                await todoData.push(data)
                return {
                    code: RETURN_CODE.SUCCESS,
                    message: RETURN_MESSAGE.SUCCESS,
                    data: data
                } as IOutPut
            }
            return {
                code: RETURN_CODE.FAIL,
                message: RETURN_MESSAGE.FAIL,
                data: null
            } as IOutPut;
        } catch (error) {
            console.log(error as Error)
        }
    }

    static getTodo = async (): Promise<ITodo[] | undefined> => {
        try {
            const result = await axios(`${this.base_url}/todos`, { method: "GET" })
            const todoData: ITodo[] = result.data
            return todoData
        } catch (error) {
            console.log(error as Error)
        }
    }

    static updateTodo = async (data: ITodo): Promise<IOutPut | undefined> => {
        try {
            if (data !== null) {
                const result = await axios(`${this.base_url}/todos`, { method: "GET" })
                const todoData: ITodo[] = result.data
                const resultData = await todoData.filter((x:ITodo,i:number)=>x.id === data.id && x.userId === data.userId).map((x:ITodo)=>({
                    ...x,
                    title: data.title,
                    completed: data.completed
                }))
                if(resultData.length !== 0){
                    return {
                        code: RETURN_CODE.SUCCESS,
                        message: "The system has already update data",
                        data: resultData[0] || null
                    } as IOutPut;
                }else{
                    return {
                        code: RETURN_CODE.FAIL,
                        message: "The system cannot find your filter data",
                        data: null
                    } as IOutPut;
                }
            }
            return {
                code: RETURN_CODE.FAIL,
                message: RETURN_MESSAGE.FAIL,
                data: null
            } as IOutPut;
        } catch (error) {
            console.log(error as Error)
        }
    }

    static deleteTodo = async (id: number, userId: number): Promise<IOutPut | undefined> => {
        try {
            if (id && userId) {
                const result = await axios(`${this.base_url}/todos`, { method: "GET" })
                const todoData: ITodo[] = result.data
                const resultData = await todoData.filter((x:ITodo,i:number)=>x.id !== id && x.userId !== userId)
                if(resultData.length !== 0){
                    return {
                        code: RETURN_CODE.SUCCESS,
                        message: "The system has already remove data",
                        data: null
                    } as IOutPut;
                }else{
                    return {
                        code: RETURN_CODE.FAIL,
                        message: "The system cannot find your filter data",
                        data: null
                    } as IOutPut;
                }
            }
            return {
                code: RETURN_CODE.FAIL,
                message: RETURN_MESSAGE.FAIL,
                data: null
            } as IOutPut;
        } catch (error) {
            console.log(error as Error)
        }
    }
}


export default TodoController;