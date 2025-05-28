// components/Chat.js
"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./Chat.module.css";
import ReactMarkdown from "react-markdown";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input, timestamp: Date.now() };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      console.log("My message", messages);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          history: messages,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      console.log(data);

      const aiMessage = {
        role: "model",
        content: data.message,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, aiMessage]);


      
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        role: "model",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const MarkdownComponents = {
    p: ({ children }) => <p className={styles.paragraph}>{children}</p>,
    ul: ({ children }) => <ul className={styles.bulletList}>{children}</ul>,
    ol: ({ children }) => <ol className={styles.numberedList}>{children}</ol>,
    li: ({ children }) => <li className={styles.listItem}>{children}</li>,
    h1: ({ children }) => (
      <h1 className={`${styles.heading1} mt-10`}>
        <br></br> {children}
      </h1>
    ),
    h2: ({ children }) => <h2 className={styles.heading2}>{children}</h2>,
    h3: ({ children }) => <h3 className={styles.heading3}>{children}</h3>,
    code: ({ children, className }) => {
      const isInline = !className;
      return isInline ? (
        <code className={styles.inlineCode}>{children}</code>
      ) : (
        <pre className={styles.codeBlock}>
          <code>{children}</code>
        </pre>
      );
    },
    strong: ({ children }) => (
      <strong className={styles.bold}>{children}</strong>
    ),
    em: ({ children }) => <em className={styles.italic}>{children}</em>,
    blockquote: ({ children }) => (
      <blockquote className={styles.blockquote}>{children}</blockquote>
    ),
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.header}>
        <h1>AI Chat Assistant</h1>
        <button onClick={clearChat} className={styles.clearButton}>
          Clear Chat
        </button>
      </div>

      <div className={styles.messagesContainer}>
        {messages.length === 0 && (
          <div className={styles.welcomeMessage}>
            <p>👋 Hello! i your AI assistant. How can I help you today?</p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`${styles.message} ${styles[message.role]}`}
          >
            <div className={styles.messageContent}>
              <div className={`${styles.messageText} overflow-auto `}>
                {message.role === "model" ? (
                  <ReactMarkdown components={MarkdownComponents}>
                    {message.content}
                  </ReactMarkdown>
                ) : (
                  message.content
                )}
              </div>
              <div className={styles.timestamp}>
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className={`${styles.message} ${styles.model}`}>
            <div className={styles.messageContent}>
              <div className={styles.typing}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className={styles.inputForm}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className={styles.input}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className={styles.sendButton}
        >
          {isLoading ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
}
