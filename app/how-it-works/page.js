"use client";

import React from "react";
import { Bot, UserCheck, Settings, Play, Send, ChartBar, Repeat } from "lucide-react";

const HowItWorksPage = () => {
  const steps = [
    {
      icon: <UserCheck size={48} className="text-indigo-600" />,
      title: "Sign Up or Log In",
      description: "Create an account or log in using Clerk. Build a personalized profile that tracks your interview journey and stores preferences."
    },
    {
      icon: <Settings size={48} className="text-indigo-600" />,
      title: "Choose Your Interview Type",
      description: "Select from technical, behavioral, or mixed interviews. Customize difficulty, topics, and duration to match your career goals."
    },
    {
      icon: <Play size={48} className="text-indigo-600" />,
      title: "Start the Mock Interview",
      description: "Our AI generates dynamic, contextually relevant questions powered by Gemini. One question at a time keeps you focused and engaged."
    },
    {
      icon: <Send size={48} className="text-indigo-600" />,
      title: "Submit Your Answers",
      description: "Respond via text or multiple-choice options. Our intuitive interface tracks your responses and provides a seamless experience."
    },
    {
      icon: <ChartBar size={48} className="text-indigo-600" />,
      title: "Receive Real-Time Feedback",
      description: "Get instant, AI-powered analysis of your responses. Understand your strengths, areas for improvement, and receive detailed scoring."
    },
    {
      icon: <Repeat size={48} className="text-indigo-600" />,
      title: "Continue Practicing",
      description: "Access your interview history, track progress, and keep refining your skills with unlimited mock interviews and adaptive challenges."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          <Bot className="inline-block mr-3 text-indigo-600" size={48} />
          RV AI: Your Interview Preparation Companion
        </h1>
        <p className="text-xl text-gray-600">
          Master your interviews with AI-powered practice and personalized insights
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div 
            key={step.title} 
            className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105"
          >
            <div className="flex items-center mb-4">
              {step.icon}
              <h2 className="ml-4 text-2xl font-semibold text-gray-800">
                Step {index + 1}: {step.title}
              </h2>
            </div>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <a 
          href="/dashboard" 
          className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg hover:bg-indigo-700 transition-colors"
        >
          Start Your Interview Journey
        </a>
      </div>
    </div>
  );
};

export default HowItWorksPage;