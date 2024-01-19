import express from 'express'
import { ITodo } from '../interfaces/todo.interface';
import TodoController from '../controllers/todo.controller';
import { RETURN_CODE, RETURN_MESSAGE } from '../enums/return.enum';
import { IOutPut } from '../interfaces/output.interface';
const router = express.Router();

/* GET home page. */
router.get('/getTodo', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const result: ITodo[] | undefined = await TodoController.getTodo();
  res.status(200).json({
    code: RETURN_CODE.SUCCESS,
    message: RETURN_MESSAGE.SUCCESS,
    data: result
  })
});

router.post('/addTodo', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data: ITodo = req.body;
  const result: IOutPut | undefined = await TodoController.addTodo(data)
  if (result?.code === 1) {
    res.status(200).json(result)
  } else {
    res.status(400).json(result)
  }
});

router.put('/updateTodo', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const data: ITodo = req.body;
  const result: IOutPut | undefined = await TodoController.updateTodo(data)
  if (result?.code === 1) {
    res.status(200).json(result)
  } else {
    res.status(400).json(result)
  }
});

router.delete('/deleteTodo', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { id, userId } = req.query
  const result: IOutPut | undefined = await TodoController.deleteTodo(Number(id), Number(userId))
  if (result?.code === 1) {
    res.status(200).json(result)
  } else {
    res.status(400).json(result)
  }
});

export default router
