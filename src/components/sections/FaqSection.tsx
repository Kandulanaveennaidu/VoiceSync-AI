
"use client";
import { useState, useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";
import { answerFAQ, type AnswerFAQOutput } from '@/ai/flows/answer-faq'; // Ensure this path is correct

interface FAQItem {
  id: string;
  question: string;
  answer: string | null; // Allow null for initial state
  isLoading: boolean;
  isAiGenerated?: boolean;
}

const predefinedQuestions = [
  "Can I White-label Nedzo AI?",
  "Does Nedzo work with Calendly?",
  "Do I need tech experience to use this?",
  "What kind of support do you offer?",
  "How does the AI handle different accents?",
  "Is my data secure with Nedzo AI?",
  "What are the limits on call minutes?",
  "Can I integrate Nedzo with my existing CRM?",
  "How long does it take to set up an AI Voice Agent?",
  "What happens if I exceed my plan's limits?",
];

export default function FaqSection() {
  const [faqItems, setFaqItems] = useState<FAQItem[]>(
    predefinedQuestions.map((q, i) => ({
      id: `faq-${i}`,
      question: q,
      answer: null, // Initially no answer
      isLoading: false,
    }))
  );
  const [customQuestion, setCustomQuestion] = useState('');
  const [isSubmittingCustom, setIsSubmittingCustom] = useState(false);
  const [activeAccordionItem, setActiveAccordionItem] = useState<string | null>(null);

  const fetchAnswer = async (itemId: string, question: string) => {
    setFaqItems(prev => prev.map(item => item.id === itemId ? { ...item, isLoading: true, answer: null } : item));
    try {
      const result: AnswerFAQOutput = await answerFAQ({ question });
      setFaqItems(prev => prev.map(item => item.id === itemId ? { ...item, answer: result.answer, isLoading: false, isAiGenerated: !result.fromExisting } : item));
    } catch (error) {
      console.error("Error fetching AI answer:", error);
      setFaqItems(prev => prev.map(item => item.id === itemId ? { ...item, answer: "Sorry, I couldn't fetch an answer right now. Please try again later.", isLoading: false, isAiGenerated: true } : item));
    }
  };

  // Fetch answer when an accordion item is opened and answer is not yet loaded
  const handleAccordionChange = (value: string) => {
    setActiveAccordionItem(value); // value can be empty string if all are closed
    if (value) { // Only proceed if an item is being opened
        const item = faqItems.find(i => i.id === value);
        if (item && !item.answer && !item.isLoading) {
        fetchAnswer(item.id, item.question);
        }
    }
  };
  
  const handleCustomQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;

    setIsSubmittingCustom(true);
    const newId = `faq-custom-${Date.now()}`;
    const newQuestion = customQuestion.trim();
    
    // Add new question to list, initially without an answer and loading
    const newFaqItem: FAQItem = { id: newId, question: newQuestion, answer: null, isLoading: true };
    setFaqItems(prev => [newFaqItem, ...prev]); // Add to top
    
    // Fetch answer immediately and then set active item
    try {
      const result: AnswerFAQOutput = await answerFAQ({ question: newQuestion });
      setFaqItems(prev => prev.map(item => item.id === newId ? { ...item, answer: result.answer, isLoading: false, isAiGenerated: !result.fromExisting } : item));
    } catch (error) {
      console.error("Error fetching AI answer for custom question:", error);
      setFaqItems(prev => prev.map(item => item.id === newId ? { ...item, answer: "Sorry, I couldn't fetch an answer for your question. Please try again.", isLoading: false, isAiGenerated: true } : item));
    }
    setActiveAccordionItem(newId); // Open the new accordion item AFTER data might be set
    
    setCustomQuestion('');
    setIsSubmittingCustom(false);
  };


  return (
    <section id="faq" className="py-20 bg-background animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#0038FF] to-[#7F00FF] bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about Nedzo AI. Can't find what you're looking for? Ask our AI!
          </p>
        </div>

        <form onSubmit={handleCustomQuestionSubmit} className="mb-12 max-w-2xl mx-auto flex gap-2">
          <Input 
            type="text" 
            placeholder="Ask our AI a question..." 
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            className="flex-grow"
            aria-label="Ask a custom question"
          />
          <Button type="submit" disabled={isSubmittingCustom || !customQuestion.trim()}>
            {isSubmittingCustom ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span className="ml-2 sr-only md:not-sr-only">Ask</span>
          </Button>
        </form>

        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto" onValueChange={handleAccordionChange} value={activeAccordionItem ?? undefined}>
          {faqItems.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="border-b border-border last:border-b-0">
              <AccordionTrigger className="text-left hover:no-underline text-lg font-medium py-4">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-muted-foreground">
                {item.isLoading ? (
                  <div className="flex items-center space-x-2 py-2">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" /> 
                    <span>Finding the best answer for you...</span>
                  </div>
                ) : (
                  item.answer || "Click to reveal AI-generated answer." 
                )}
                {item.isAiGenerated && !item.isLoading && item.answer && (
                   <p className="text-xs text-muted-foreground/70 mt-2 italic">This answer was generated by AI.</p>
                )}
                 {!item.isAiGenerated && !item.isLoading && item.answer && !item.answer.startsWith("Sorry, I couldn't fetch") && (
                   <p className="text-xs text-muted-foreground/70 mt-2 italic">This answer was retrieved from existing FAQs.</p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

