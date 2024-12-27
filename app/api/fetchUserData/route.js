import { NextResponse } from 'next/server';
import { db } from '../../../utils/db'; 
import { eq } from 'drizzle-orm'; 
import { UserAnswer } from '../../../utils/schema';  

export async function POST(request) {
    try {
        const { userEmail } = await request.json();

        const userAnswers = await db
            .select()
            .from(UserAnswer)
            .where(eq(UserAnswer.userEmail, userEmail));

        return NextResponse.json({ 
            userAnswers: userAnswers.length > 0 ? userAnswers : [] 
        }, { status: 200 });

    } catch(err) {
        console.error('Fetch error:', err);
        return NextResponse.json({ 
            message: 'Internal server error', 
            error: err.message 
        }, { status: 500 });
    }
}