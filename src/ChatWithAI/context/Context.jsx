import { createContext, useRef, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

export const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const stopRef = useRef(false); // Thêm ref để kiểm soát việc dừng

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            if (stopRef.current) return;
            setResultData(prev => prev + nextWord)
        }, 75 * index);
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        stopRef.current = false; // Reset trạng thái dừng
        let response;
        if (prompt !== undefined) {
            response = await runChat(prompt);
            setRecentPrompt(prompt);
        } else {
            setInput("");
            setPrevPrompts(prev => [...prev, input]);
            setRecentPrompt(input);
            response = await runChat(input);
            console.log("prompt 2");
        }

        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>"
            }

        }
        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            if (stopRef.current) break; // Nếu đã dừng thì thoát vòng lặp
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }
        setLoading(false);
        setInput("");
    }
    // Hàm dừng response
    const onStop = () => {
        stopRef.current = true;
        setLoading(false);
    }
    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        recentPrompt,
        setRecentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        onStop,
        newChat
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;