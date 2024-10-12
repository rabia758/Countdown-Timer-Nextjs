"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Input } from "../components/ui/input";
import { Button } from "./ui/button";

export default function Countdown(){
    const [duration, setDuration] = useState<number | string>("");
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleSetDuration = (): void => {
        if(typeof duration === "number" && duration >0){
            setTimeLeft(duration);
            setIsActive(false);
            setIsPaused(false);
            if(timerRef.current){
                clearInterval(timerRef.current);
            }
        }
    };

    const handleStart = (): void => {
        if(timeLeft > 0){
            setIsActive(true);
            setIsPaused(false);

        }
    };

    const handlePaused = (): void => {
        if(isActive){
            setIsPaused(true);
            setIsActive(false);
            if(timerRef.current){
                clearInterval(timerRef.current)
            }
        }
    };

    const handleReset = (): void => {
        setIsActive(false);
        setIsPaused(false);
        setTimeLeft(typeof duration === "number"? duration:0);
        if(timerRef.current){
            clearInterval(timerRef.current);
        }
    };
    useEffect(() => {
        if(isActive && !isPaused){
            timerRef.current = setInterval(() => {
            setTimeLeft((prevTime) => {
                if(prevTime <= 1){
                 clearInterval(timerRef.current!);
                 return 0;
                }
                return prevTime -1;
            });
            }, 1000)
        }
        return () => {
            if(timerRef.current){
                clearInterval(timerRef.current)
            }

        };
    },[isActive,isPaused]);

    const formattime = (time: number): string => {
        const minutes = Math.floor(time/60);
        const second = time % 60 ;
        return `${String(minutes).padStart(2,"0")}: ${String(second).padStart(2,"0")}`
    }
    const handleDurationChange = (e : ChangeEvent<HTMLInputElement>): void => {
        setDuration(Number(e.target.value) || "");
    };
    return (
        <div className="flex justify-center item-center h-screen bg-slate-400 " >
            <div className="bg-white dark:bg-grey-400 shadow-lg rounded-lg p-8 max-w-md w-full justify-center item-center h-[400px] mt-20"> 
                <h1 className="text-2xl font-bold mb-4 text-grey-400 dark:text-grey-200 text-center">
                    Countdown Timer
                </h1>
                <div className="flex item-center mb-6">
                    <Input
                    type= "number"
                    id="duration"
                    placeholder="Enter Duration in Seconds"
                    value={duration}
                    onChange={handleDurationChange}
                    className="flex-1 mr-4 rounded-md border-black bg-grey-400 text-black"
                    />
                    <Button
                    onClick={handleSetDuration}
                    variant={"outline"}
                    className="text-grey-800 dark:text-grey-200"
                    >
                        Set
                    </Button>
                 </div>
                    <div className="text-6xl font-bold text-grey-400 mb-8px text-center">
                        {formattime(timeLeft)}
                    </div>
                    <div className="flex justify-center gap-4">
                        <Button
                        onClick={handleStart} 
                        variant={"outline"}
                        className="text-grey-400 mt-5"
                        >
                            {isPaused? "Resume" : "Start"}
                        </Button>
                        <Button
                        onClick={handlePaused}
                        variant={"outline"}
                        className="text-grey-400 mt-5"
                        >
                            Paused
                        </Button>
                        <Button
                        onClick={handleReset}
                        variant={"outline"}
                        className="text-grey-400 mt-5"
                        >
                            Reset
                        </Button>
                     </div>    
            </div>
        </div>
    );
}