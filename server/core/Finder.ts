const LOW = 0;
const HIGH = 99;

export class Finder{
    
    rangeArr: string[][]

    constructor(){
        this.rangeArr = [];
        for(let i = LOW; i < HIGH + 1; i++){
            this.rangeArr[i] = [];
        }
    }

    addRoom(degree:number, roomId:string){
        this.rangeArr[degree].push(roomId);
    }

    getRoom(degree:number){
        let potentialRoom: string | null = null;
        let index = degree;
        for(let i = LOW; i < HIGH; i++){
            if(this.rangeArr[i].length > 0){
                let currentDelta = Math.abs(i - degree);
                if(currentDelta > Math.abs(index - degree)){
                    index = i
                    potentialRoom = this.rangeArr[i][0];
                }
            }
        }

        if(potentialRoom == null){
            throw Error("No rooms at the moment");
        }

        return this.rangeArr[index].shift();
    }

}