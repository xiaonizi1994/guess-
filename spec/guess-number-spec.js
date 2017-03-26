/**
 * Created by HZ on 3/26/17.
 */
'use strict';
const GuessNumber = require('../guess-number');
const readlineSync = require('readline-sync');

describe("GuessNumber", ()=> {

    describe("generateRandomNum", ()=> {
        it("should return 4 different number", ()=> {
           let theGuessNumber = new GuessNumber();

            let randomNumArr = [0.1, 0.2, 0.3, 0.4];
            let index = 0;

            spyOn(Math, 'random').and.callFake(()=> {
                return randomNumArr[index++];
            });

            expect(theGuessNumber.generateRandomNum()).toBe('1234');
        });

        it("should return 4 different number when Math.random return same digital", ()=> {
            let theGuessNumber = new GuessNumber();

            let randomNumArr = [0.1, 0.2, 0.4, 0.4, 0.5];
            let index = 0;

            spyOn(Math, 'random').and.callFake(()=> {
                return randomNumArr[index++];
            });

            expect(theGuessNumber.generateRandomNum()).toBe('1245');
        });
    });

    describe("start", ()=> {
        it('shoule print what the user input', ()=> {
            spyOn(readlineSync, "question").and.returnValues("9999");
            spyOn(console, 'log');

            let theGuessNumber = new GuessNumber();
            theGuessNumber.start();

            expect(console.log).toHaveBeenCalledWith('9999');
        });

    });
    describe("jadge", ()=> {
        it('shoule print 4A4B', ()=> {
            let theGuessNumber = new GuessNumber();
            expect(theGuessNumber.jadge("1234","1234")).toEqual("4A0B");
        });
        it('shoule print 2A2B', ()=> {
            let theGuessNumber = new GuessNumber();
            expect(theGuessNumber.jadge("1234","2134")).toEqual("2A2B");
        });
        it('shoule print 0A0B', ()=> {
            let theGuessNumber = new GuessNumber();
            expect(theGuessNumber.jadge("1234","")).toEqual("0A0B");
        });
        it('shoule print 0A0B', ()=> {
            let theGuessNumber = new GuessNumber();
            expect(theGuessNumber.jadge("2345","1678")).toEqual("0A0B");
        });
        it('shoule print 0A4B', ()=> {
            let theGuessNumber = new GuessNumber();
            expect(theGuessNumber.jadge("1345","5431")).toEqual("0A4B");
        });
    });
    describe("printResult",()=>{
        it("shoule print 3A0B",()=>{
            let theGuessNumber = new GuessNumber();
            spyOn(console, 'log');
            theGuessNumber.printResult(1,'3A0B');
            expect(console.log).toHaveBeenCalledWith('3A0B');
        });
        it("shoule print win",()=>{
            let theGuessNumber = new GuessNumber();
            spyOn(console, 'log');
            theGuessNumber.printResult(1,'4A0B');
            expect(console.log).toHaveBeenCalledWith("win");
        });
        it("shoule print win",()=>{
            let theGuessNumber = new GuessNumber();
            spyOn(console, 'log');
            theGuessNumber.printResult(6,'4A0B');
            expect(console.log).toHaveBeenCalledWith("win");
        });
        it("shoule print lose",()=>{
            let theGuessNumber = new GuessNumber();
            spyOn(console, 'log');
            theGuessNumber.printResult(6,'2A2B');
            expect(console.log).toHaveBeenCalledWith("lose");
        });
    })
});
