export abstract class WrapperAction {
    actionName:string;
    params:string;
    /**
     * WrapperAction for mq listener
     */
    constructor(name:string) {
        this.actionName = name;
    }
    doRealWork(params:string):string {
        return this.doWork(params);
    }

    abstract doWork(params:string);
    getActionName():string {
        return this.actionName;
    }
}