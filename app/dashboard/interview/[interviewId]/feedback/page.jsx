"use client";
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { 
  CheckCircle2, 
  XCircle, 
  ChevronsUpDown, 
  Activity, 
  Target 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Feedback = ({ params }) => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    setLoading(true);
    const result = await db.select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    setFeedbackList(result);
    setLoading(false);

    // Calculate the average rating dynamically, only including valid ratings
    const validRatings = result
      .map((item) => parseFloat(item.rating))
      .filter((rating) => !isNaN(rating));

    const totalRating = validRatings.reduce((sum, rating) => sum + rating, 0);
    const avgRating = validRatings.length > 0 
      ? (totalRating / validRatings.length).toFixed(1) 
      : "N/A";

    setAverageRating(avgRating);
  };

  const getRatingColor = (rating) => {
    const numRating = parseFloat(rating);
    if (numRating >= 8) return "text-green-600";
    if (numRating >= 5) return "text-yellow-600";
    return "text-red-600";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Activity className="mx-auto h-12 w-12 text-indigo-600 animate-pulse" />
          <p className="mt-4 text-gray-600">Loading your interview feedback...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {feedbackList.length === 0 ? (
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <XCircle className="mx-auto h-16 w-16 text-red-500" />
            <h2 className="text-2xl font-bold text-gray-800 mt-4">
              No Interview Feedback Available
            </h2>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6">
              It seems like no feedback has been generated for this interview. 
              This could be due to an incomplete interview or a system issue.
            </p>
            <Button 
              variant="outline" 
              onClick={() => router.replace('/dashboard')}
              className="w-full"
            >
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="max-w-4xl mx-auto mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
                <div>
                  <h2 className="text-3xl font-bold text-green-600">Great Job!</h2>
                  <p className="text-gray-600">You've completed your mock interview.</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Overall Rating</p>
                    <p className={`text-2xl font-bold ${getRatingColor(averageRating)}`}>
                      {averageRating ? `${averageRating}/10` : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Questions</p>
                    <p className="text-2xl font-bold text-indigo-600">
                      {feedbackList.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">
              Detailed Interview Feedback
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Review each question's performance and get insights for improvement.
            </p>

            {feedbackList.map((item, index) => (
              <Collapsible key={index} className="border rounded-lg overflow-hidden">
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-4 bg-gray-100 hover:bg-gray-200 transition-colors">
                    <div className="flex items-center gap-3">
                      <Target 
                        className={`h-5 w-5 ${
                          parseFloat(item.rating) >= 7 
                            ? "text-green-500" 
                            : parseFloat(item.rating) >= 4 
                            ? "text-yellow-500" 
                            : "text-red-500"
                        }`} 
                      />
                      <span className="font-medium text-gray-800 line-clamp-1">
                        {item.question}
                      </span>
                    </div>
                    <ChevronsUpDown className="h-4 text-gray-500" />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 bg-white">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Your Answer</h4>
                      <p className="bg-red-50 p-3 rounded-lg text-sm text-red-900 border border-red-200">
                        {item.userAns || "No answer provided"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Correct Answer</h4>
                      <p className="bg-green-50 p-3 rounded-lg text-sm text-green-900 border border-green-200">
                        {item.correctAns}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-700 mb-2">Feedback</h4>
                    <p className="bg-blue-50 p-3 rounded-lg text-sm text-primary border border-blue-200">
                      {item.feedback}
                    </p>
                  </div>
                  <div className="mt-4 text-right">
                    <span className={`font-bold ${getRatingColor(item.rating)}`}>
                      Rating: {item.rating}/10
                    </span>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}

            <div className="text-center mt-8">
              <Button 
                onClick={() => router.replace('/dashboard')}
                className="w-full md:w-auto"
              >
                Return to Dashboard
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Feedback;