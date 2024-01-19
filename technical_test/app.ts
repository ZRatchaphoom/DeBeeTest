import * as readline from 'readline';
import { IIndex, IOutput } from './src/interfaces/index.interface';
import MasterController from './src/controllers/master.controller';
import { EReturnCode, EReturnMessage } from './src/enums/index.enum';


const readInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

readInterface.question("Please input your array string  ", async(data: string) => {
    let result:IOutput
    const {strs}:IIndex = {strs:JSON.parse(data)}
    const chkLengthArray = MasterController.checkLengthArray({strs})
    if(chkLengthArray === true){
        result = {
            code: EReturnCode.SUCCESS,
            message: EReturnMessage.SUCCESS,
            data:strs
        }
        console.log("Results : ",strs)
    }else{
        result = {
            code: EReturnCode.FAIL,
            message: `${EReturnMessage.FAIL} : Your arrays is over length or length less than 0.`,
            data:null
        }
        console.log("Results : ",result)
    }
    let resultTextData:{
        resultText:string[],
        errorText:string[]
    } = await MasterController.checkTextInArray({strs})
    if(resultTextData.resultText.length !== 0){
        let chkPrefix = await MasterController.checkCommonPreflix(resultTextData.resultText)
        result = {
            code: EReturnCode.SUCCESS,
            message: EReturnMessage.SUCCESS,
            data: {
                answer : chkPrefix,
                error : resultTextData.errorText
            }
        }
        console.log("Results : ",result)
    }
    else{

    }
   
    readInterface.close();
});