"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GenAIResponse } from "@/lib/google.genai";
import axios from "axios";
import React, { useState } from "react";

type Message = {
  role: "user" | "bot";
  text: string;
};

const Home = () => {
  const [message, setMessage] = useState<string>("");

  const [chat, setChat] = useState<Message[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [language, setLanguage] = useState<string>("English");

  const handleClick = async() => {
    if (!message) return;

    const userMessage: Message = {
      role: "user",
      text: message,
    };
    setChat((prev) => [...prev, userMessage]);

    const systemPrompt =
      language === "Bengali"
        ? "You are a Helpful AI Assisstant. Always Reply in Bengali Language"
        : "You are a Helpful AI Assisstant. Always Reply in English Language";

    setIsLoading(true);

    try {

    //   const response = await axios.post(`https://api.groq.com/openai/v1/chat/completions`,{
    //     model: "llama-3.1-8b-instant",
    //     messages:[
    //       {
    //         role:"system",
    //         content:systemPrompt, 
    //       },
    //       {
    //         role:"user",
    //         content:message,
    //       }
    //     ]
    //   },
    // {
    //   headers:{
    //     "Content-Type":"application/json",
    //     Authorization:`Bearer ${process.env.NEXT_PUBLIC_GROQ_API}`
    //   }
    // })


    // console.log("Response : ",response)

    // const chatRessponse = response?.data?.choices?.[0]?.message?.content;

    // const botMessage:Message = {
    //   role:"bot",
    //   text:chatRessponse
    // }
    // setChat((prev) => [...prev, botMessage]);

    const response = await GenAIResponse(language,message)
    console.log(response)
    const botMessage:Message = {
      role:"bot",
      text:response
    }
    setChat((prev) => [...prev, botMessage]);



    } catch (error:any) {
      console.log(error);
    }finally{
      setIsLoading(false)
      setMessage("")
    }


  };


  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-red-400">
        <div className="w-[80vh] h-[80vh] bg-red-500 p-4">
          <div className="flex items-center justify-between p-4">
            <h2>Chatbot</h2>
            <select
              name="language"
              id=""
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="English">English</option>
              <option value="Bengali">Bengali</option>
            </select>
          </div>
          <ScrollArea className="w-auto h-[60vh] border border-black">
            {chat?.map((data) => (
              <div key={data.role} className="p-3">
                <h2 className="font-bold">{data.role}</h2>
                <p className="font-light">{data.text}</p>
              </div>
            ))}
            {isLoading && <p>AI Thinking.....</p>}
          </ScrollArea>
          <div className="flex gap-3 mt-4">
            <Input
              placeholder="Enter text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={handleClick}>Send</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
