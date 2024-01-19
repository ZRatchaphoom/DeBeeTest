import { IIndex } from "../interfaces/index.interface";

abstract class MasterController {
    public static checkLengthArray = ({ strs }: IIndex): boolean | null => {
        if (strs.length > 0 && strs.length <= 200) {
            return true;
        } else if (strs.length <= 0 || strs.length >= 200) {
            return false;
        }
        return false;
    }

    public static checkTextInArray = async ({ strs }: IIndex): Promise<{
        resultText: string[],
        errorText: string[]
    }> => {
        let result: string[] = []
        let error: string[] = []
        await strs.forEach((x: string, i: number) => {
            if (x.length > 0 && x.length <= 200 && this.isLowerCase(x)) {
                result.push(x)
            }
            else if (x.length <= 0 || x.length > 200 || !this.isLowerCase(x)) {
                error.push(x)
            }
        })
        return {
            resultText: result,
            errorText: error
        }
    }

    public static checkCommonPreflix = async (data: string[]): Promise<string> => {
        if (data.length === 0) {
            return ""
        }
        let prefix = data[0];
        for (let i = 1; i < data.length; i++) {
            while (data[i].indexOf(prefix) !== 0) {
                prefix = prefix.substring(0, prefix.length - 1);
                if (prefix === "") {
                    return "";
                }
            }
        }
        return prefix;
    }

    public static isLowerCase = (data: string): boolean => {
        if (data === String(data).toLowerCase()) {
            return true;
        }
        return false;
    }
}


export default MasterController;