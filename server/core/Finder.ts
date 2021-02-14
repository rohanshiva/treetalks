import { readJsonConfigFile } from "typescript";

const LOW = 0;
const HIGH = 99;

const TOPICS:string[] = ["Abortion", "Climate Change", "Affirmative Action", "Universal Basic Income", "Gay Marriage", "Military Spending", "Universal Healthcare", "Taxes", "Corona Virus Vaccine", "Gun Control", "International Affairs", "Poaching", "Capital Punishment"];

class Finder{
    
    topicMap: Map<string, string[][]>

    constructor(){
        this.topicMap = new Map();
        for(const topic of TOPICS){
            let rangeArr = [];
            for(let i = LOW; i < HIGH + 1; i++){
                rangeArr[i] = [];
            }
            this.topicMap.set(topic, rangeArr);
        }
    }

    addRoom(title:string, degree:number, roomId:string){
        let rangeArr = this.topicMap.get(title) as string[][];
        rangeArr[degree].push(roomId);
        this.topicMap.set(title, rangeArr);
    }

    getRoom(title:string, degree:number){
        let rangeArr = this.topicMap.get(title) as string[][];
        let index = degree;
        for(let i = LOW; i < HIGH + 1; i++){
            if(rangeArr[i].length > 0){
                let currentDelta = Math.abs(i - degree);
                if(currentDelta > Math.abs(index - degree)){
                    index = i
                }
            }
        }

        if(index === degree){
            throw Error("No rooms at the moment");
        }

        const roomId = rangeArr[index].shift();
        this.topicMap.set(title, rangeArr);
        return roomId;
    }

    removeRoom(title:string, degree:number, roomId: string){
        let rangeArr = this.topicMap.get(title) as string[][];
        rangeArr[degree] = rangeArr[degree].filter((rid) => rid !== roomId);
        this.topicMap.set(title, rangeArr);
    }

    serialize(){
        let json:any = {};
        for(const topic of TOPICS){
            let degrees:any = {}
            let rangeArr = this.topicMap.get(topic) as string[][];
            for(let i = LOW; i < HIGH + 1; i++){
                if(rangeArr[i].length > 0){
                    degrees[i] = rangeArr[i];
                }
            }
            json[topic] = degrees;
        }
        return json;
    }
}

const roomFinder = new Finder();
export {roomFinder};