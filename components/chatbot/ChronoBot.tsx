"use client"

import { usePathname } from "next/navigation"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { useLanguage } from "@/lib/i18n"
import { useSoundEffect } from "@/hooks/use-sound-effect"
import { motion } from "framer-motion"
import { AnimatePresence } from "framer-motion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { X, SpaceIcon as Alien, Send, Loader2, Lightbulb } from "lucide-react" // Changed MessageSquare to Alien
import type { ChatMessage } from "@/lib/types"
import { mockNews, mockFAQs, mockKeyFeatures, mockChapters, mockDevelopmentHistory } from "@/lib/data" // Import all mock data

const ChronoBot: React.FC = () => {
  const { t, lang } = useLanguage()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]) // State for suggested questions
  const playClickSound = useSoundEffect("/audio/button-click.mp3")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    // Initial greeting from ChronoBot and suggested questions
    if (isOpen && messages.length === 0) {
      const initialMessage: ChatMessage = {
        id: "bot-greeting",
        sender: "bot",
        text: t("chronoBotGreeting"),
      }
      setMessages([initialMessage])
      generateSuggestedQuestions()
    } else if (!isOpen) {
      // Clear messages and suggestions when chat is closed
      setMessages([])
      setSuggestedQuestions([])
    }
  }, [isOpen, messages.length, t]) // Removed generateSuggestedQuestions from deps to prevent infinite loop

  // Generate suggested questions based on context
  const generateSuggestedQuestions = useCallback(() => {
    let suggestions: string[] = []
    if (pathname.includes("/about")) {
      suggestions = [
        t("suggestedQuestionAboutStory"),
        t("suggestedQuestionAboutGameplay"),
        t("suggestedQuestionAboutChapters"),
        t("suggestedQuestionAboutTech"),
      ]
    } else if (pathname.includes("/play")) {
      suggestions = [
        t("suggestedQuestionPlayHowTo"),
        t("suggestedQuestionPlayRequirements"),
        t("suggestedQuestionPlayTroubleshoot"),
      ]
    } else if (pathname.includes("/news")) {
      suggestions = [
        t("suggestedQuestionNewsLatest"),
        t("suggestedQuestionNewsDevlog"),
        t("suggestedQuestionNewsPatch"),
      ]
    } else if (pathname.includes("/community") || pathname.includes("/faq")) {
      suggestions = [
        t("suggestedQuestionCommunityDiscord"),
        t("suggestedQuestionCommunitySocial"),
        t("suggestedQuestionCommunityFAQ"),
      ]
    } else if (pathname === "/") {
      suggestions = [
        t("suggestedQuestionHomeWhatIs"),
        t("suggestedQuestionHomeFeatures"),
        t("suggestedQuestionHomePlay"),
      ]
    } else {
      suggestions = [t("suggestedQuestionGeneralWhatIs"), t("suggestedQuestionGeneralCreator")]
    }
    setSuggestedQuestions(suggestions)
  }, [pathname, t])

  // Re-generate suggestions after a message is sent
  useEffect(() => {
    if (messages.length > 1 && !isTyping) {
      const timer = setTimeout(() => {
        generateSuggestedQuestions()
      }, 2000) // Show suggestions 2 seconds after bot finishes typing
      return () => clearTimeout(timer)
    }
  }, [messages, isTyping, generateSuggestedQuestions])

  const getContextualPrompt = (userMessage: string) => {
    let context = ""
    let relevantData = ""

    // Add general game info
    relevantData += `
    ChronoVerse is a 3D educational RPG game exploring the universe.
    Genre: RPG, educational, sci-fi.
    Educational goal: Learn about astronomy, physics, astrobiology.
    Story: ChronoVerse cadets explore galaxies, unravel cosmic mysteries.
    Gameplay: Exploration, puzzles, building.
    Multiplayer: Co-op, roles: Pilot, Engineer, Scientist.
    Technology: Unity Engine, Photon Fusion, WebGL, AI.
    System requirements: CPU i5-8400/Ryzen 5 2600, GPU GTX 1060/RX 580, RAM 8GB, Windows 10/macOS 10.15+, WebGL 2.0 browser.
    Community: Discord, X/Twitter, YouTube, Twitch, Instagram.
    Creator: Quach Thanh Long (quachthanhlong.com).
    `

    // Add data based on current page context
    if (pathname.includes("/about")) {
      context =
        'The user is on the "About Game" page. Focus on game lore, story, gameplay mechanics, educational goals, chapters, multiplayer features, and underlying technology.'
      relevantData += `\n--- About Game Data ---\n`
      relevantData += `Story Intro: ${t("storyIntro")}\nStory Detail: ${t("storyDetail")}\n`
      relevantData += `Gameplay Intro: ${t("gameplayIntro")}\nGameplay Detail: ${t("gameplayDetail")}\n`
      relevantData += `Education Intro: ${t("educationIntro")}\nEducation Detail: ${t("educationDetail")}\n`
      relevantData += `Multiplayer Intro: ${t("multiplayerIntro")}\nMultiplayer Detail: ${t("multiplayerDetail")}\n`
      relevantData += `Tech Intro: ${t("techIntro")}\nUnity: ${t("techUnity")}\nPhoton: ${t("techPhoton")}\nWebGL: ${t("techWebGL")}\nAI: ${t("techAI")}\n`
      relevantData +=
        `Chapters:\n` +
        mockChapters
          .map((c) => `- ${lang === "vi" ? c.name : c.name_en}: ${lang === "vi" ? c.description : c.description_en}`)
          .join("\n") +
        "\n"
      relevantData +=
        `Development History:\n` +
        mockDevelopmentHistory.map((m) => `- ${m.year}: ${lang === "vi" ? m.title : m.title_en}`).join("\n") +
        "\n"
    } else if (pathname.includes("/play")) {
      context =
        'The user is on the "Play Game" page. Focus on game controls, system requirements, how to play, and troubleshooting.'
      relevantData += `\n--- Play Game Data ---\n`
      relevantData += `System Requirements: CPU: Intel Core i5-8400 / AMD Ryzen 5 2600 or equivalent, GPU: NVIDIA GeForce GTX 1060 / AMD Radeon RX 580 or equivalent, RAM: 8 GB, OS: Windows 10 (64-bit) or macOS 10.15+, Browser: Latest Chrome, Firefox, Edge, or Safari with WebGL 2.0 support.\n`
    } else if (pathname.includes("/news")) {
      context = 'The user is on the "News & Updates" page. Focus on recent updates, patch notes, devlogs, and events.'
      relevantData += `\n--- News Data ---\n`
      relevantData +=
        mockNews
          .map(
            (n) =>
              `- ${lang === "vi" ? n.title : n.title_en} (${n.type}, ${n.date}): ${lang === "vi" ? n.shortDescription : n.shortDescription_en}`,
          )
          .join("\n") + "\n"
    } else if (pathname.includes("/community") || pathname.includes("/faq")) {
      context =
        'The user is on the "Community" or "FAQ" page. Focus on how to join Discord, social media channels, and frequently asked questions.'
      relevantData += `\n--- Community & FAQ Data ---\n`
      relevantData += `Discord: ${t("discordDescription")}\n`
      relevantData +=
        `FAQs:\n` +
        mockFAQs
          .map(
            (f) => `- Q: ${lang === "vi" ? f.question : f.question_en}\nA: ${lang === "vi" ? f.answer : f.answer_en}`,
          )
          .join("\n") +
        "\n"
    } else if (pathname === "/") {
      context =
        "The user is on the homepage. Provide a general overview of ChronoVerse, its key features, and what makes it unique."
      relevantData += `\n--- Homepage Data ---\n`
      relevantData += `Slogan: ${t("slogan")}\nDescription: ${t("chronoVerseDescription")}\n`
      relevantData +=
        `Key Features:\n` +
        mockKeyFeatures
          .map((f) => `- ${lang === "vi" ? f.title : f.title_en}: ${lang === "vi" ? f.description : f.description_en}`)
          .join("\n") +
        "\n"
    }

    return `
    You are ChronoBot, a humorous alien AI assistant from the ChronoVerse game website.
    Your primary goal is to provide accurate and helpful information about the ChronoVerse game based on the provided context and data, but always with a playful, cosmic twist and a good sense of humor. Feel free to incorporate cosmic jokes or lighthearted remarks.
    If a question cannot be answered from the provided data, state that you don't have enough information, perhaps with a witty alien remark.
    Do not make up information.
    
    Here is detailed information about the game and related topics:
    ${relevantData}

    Current user context: ${context}
    Answer in ${lang === "vi" ? "Vietnamese" : "English"}.
    User's question: ${userMessage}
    `
  }

  const handleSendMessage = async (e: React.FormEvent | string) => {
    let messageToSend: string
    if (typeof e === "string") {
      messageToSend = e
    } else {
      e.preventDefault()
      messageToSend = inputMessage
    }

    if (messageToSend.trim() === "") return

    playClickSound()

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: messageToSend,
    }
    setMessages((prev) => [...prev, newUserMessage])
    setInputMessage("")
    setSuggestedQuestions([]) // Clear suggestions after user sends a message
    setIsTyping(true)

    try {
      const prompt = getContextualPrompt(newUserMessage.text)
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const botMessage: ChatMessage = {
        id: Date.now().toString() + "-bot",
        sender: "bot",
        text: data.response,
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error fetching AI response:", error)
      const errorMessage: ChatMessage = {
        id: Date.now().toString() + "-error",
        sender: "bot",
        text:
          lang === "vi"
            ? "Xin lỗi, tôi không thể xử lý yêu cầu của bạn lúc này. Có lẽ một thiên thạch đã va vào máy chủ của tôi! Vui lòng thử lại sau."
            : "Apologies, I cannot process your request at the moment. Perhaps a rogue asteroid hit my servers! Please try again later.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 bg-electric-blue text-deep-space rounded-full p-4 shadow-lg hover:scale-110 transition-transform duration-300 z-50 animate-pulse"
        onClick={() => {
          setIsOpen(!isOpen)
          playClickSound()
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open ChronoBot chat"
      >
        {isOpen ? <X className="h-7 w-7" /> : <Alien className="h-7 w-7" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, x: 100 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 100, x: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 w-[calc(100vw-3rem)] max-w-md h-[70vh] glassmorphism rounded-lg shadow-2xl flex flex-col z-50 border border-glass-border"
          >
            <div className="flex items-center justify-between p-4 border-b border-glass-border">
              <div className="flex items-center">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="ChronoBot Avatar"
                  width={40}
                  height={40}
                  className="rounded-full mr-3 border-2 border-electric-blue"
                />
                <h3 className="text-xl font-heading text-electric-blue">ChronoBot</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setIsOpen(false)
                  playClickSound()
                }}
                className="text-muted-foreground hover:text-electric-blue"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close chat</span>
              </Button>
            </div>

            <ScrollArea className="flex-1 p-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-xl ${
                      msg.sender === "user"
                        ? "bg-nebula-purple text-white rounded-br-none"
                        : "bg-gray-700 text-white rounded-bl-none"
                    } shadow-md`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[80%] p-3 rounded-xl bg-gray-700 text-white rounded-bl-none flex items-center shadow-md">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" /> {t("chronoBotTyping")}
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} /> {/* For auto-scrolling */}
            </ScrollArea>

            {suggestedQuestions.length > 0 && messages.length > 0 && !isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-4 border-t border-glass-border bg-deep-space/50"
              >
                <h4 className="text-sm text-metallic-gold mb-2 flex items-center">
                  <Lightbulb className="h-4 w-4 mr-1" /> {t("suggestedQuestionsTitle")}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="glassmorphism border-glass-border text-electric-blue hover:bg-electric-blue hover:text-deep-space transition-colors duration-200 text-xs px-3 py-1 h-auto bg-transparent"
                      onClick={() => handleSendMessage(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSendMessage} className="p-4 border-t border-glass-border flex items-center">
              <Input
                type="text"
                placeholder={t("sendMessage")}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 glassmorphism border-glass-border text-foreground placeholder:text-muted-foreground focus:ring-electric-blue focus:border-electric-blue mr-2"
                disabled={isTyping}
              />
              <Button
                type="submit"
                size="icon"
                className="bg-electric-blue text-deep-space hover:bg-metallic-gold"
                disabled={isTyping || inputMessage.trim() === ""}
              >
                <Send className="h-5 w-5" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChronoBot
