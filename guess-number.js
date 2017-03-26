/**
 * Created by HZ on 3/26/17.
 */
'use strict';
const readlineSync = require('readline-sync');
class GuessNumber {
    start () {
        console.log("游戏开始了");
        let count=1;
        let randomNum = this.generateRandomNum();
        while(count<=6){
            let userNum = readlineSync.question("请输入一个4位数:");
            console.log(userNum);
            let jadgeStr=this.jadge(randomNum,userNum);
            let result=this.printResult(count,jadgeStr);
            if(result==="win"){
                break;
            }
            count++;
        }
    };

    generateRandomNum () {
        let result = '';
        while (result.length < 4) {
            let digital = "" + parseInt(Math.random() * 10);
            if(result.indexOf(digital) === -1) {
                result += digital;
            }
        }

        return result;
    };
    jadge(randNum,userNum){
        let randNumArr=randNum.split("");
        let userNumArr=userNum===undefined?[-1,-1,-1,-1]:userNum.split("");
        let exceptRandA=randNumArr.filter((item,index)=>{
           return item!==userNumArr[index];
       });
       let exceptUserA=userNumArr.filter((item,index)=>{
           return item!==randNumArr[index];
       });
       let exceptRandB=exceptRandA.filter((item,index)=>{
           return exceptUserA.indexOf(item)!==-1;
       });
       return 4-exceptRandA.length+"A"+exceptRandB.length+"B";
    };
    printResult(count,jadgeStr){
        let result;
        if(jadgeStr==='4A0B'){
          result="win";
        }
        else if(count<6){
           result=jadgeStr;
        }else{
            result="lose";
        }
        console.log(result);
        return result;
    }


}

module.exports = GuessNumber;