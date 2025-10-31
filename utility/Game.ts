    class Game{
        gameID: string;
        end: boolean;
        leftover: number;
        difficulty: string;
        constructor(gameID: string, leftover: number, difficulty: string){
            this.gameID = gameID;
            this.end = false ;
            this.leftover =leftover
            this.difficulty = difficulty;
        }
        checkWin(){
            return this.leftover ===0; 
        }
    }
    export default Game;