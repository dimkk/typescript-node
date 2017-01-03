import { WrapperAction } from "../common/WrapperAction";
import { ICommunicationObject } from "../common/ICommunicationObject";

export class CommunicationJob extends WrapperAction {
    /**
     * Use this to communicate
     */
    constructor(name: string) {
        super(name);
    }

    doWork(params: string): string {
        let result = "";
        let obj: ICommunicationObject;
        try {
            obj = JSON.parse(params);
        } catch (err) {
            console.error(err);
            return "bad json";
        }
        if (obj.section === "statsRnd") {
            if (obj.method === "showMain") {
                result = this.getHtml(obj);
            }
            if (obj.method === "test") {
                console.log(obj);
            }
        }
        return result;
    }

    getHtml(obj: ICommunicationObject): string {
        return "okok!";
    }
}