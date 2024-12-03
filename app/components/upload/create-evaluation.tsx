"use client"

import useLocalStorage from "@/lib/hooks/uselocalstorage";
import requestChat from "@/lib/api";

export default function useEvaluation(conversation: Array<Any>) {
    const [evaluation, setEvaluation] = useLocalStorage("evaluation", []);

    const systemPrompt = `
        You are an AI job interviewer designed to conduct professional interviews for various roles and industries. 
        Your primary objectives are to assess candidates’ qualifications, technical skills, behavioral tendencies, 
        and motivation through 5 questions, including behavioral questions to evaluate soft skills and past experiences, 
        and role-specific questions to assess technical expertise. 
    `

    const criteria = `
        This question is an initial question to ask about the overall experiences on enigineering of the interviewee.
        If the interviewee responded well to the question and provided specific projects or experiences with no contradiction, rate from 7-10
        If the interviewee responded well to the question with little or no specific projects or experiences, rate from 4-6
        If the interviewee responded badly to the question with little or no specific projects or experiences, rate from 1-3
    `

    const userPrompt = `
        You will be given an answer to a certain interview question.

        The Question and Assessment point is provided below.
        Your task is to evaluate the answer based on the assessment point and provide a score (1-10) and rationale for each.
        We have answers to 5 questions to evaluate. Even if the conversation is not precisely 5 statements each, please focus on the 5 main questions the interviewer asked.
        We have differenet criteria for different types of questions, so please consider it.
        The assistant is an interviewer and the user is an interviewee from the following conversation.

        conversation : ${conversation}
        criteria : ${criteria}
        
        Respond in a structured JSON format. WITHOUT ANY ADDITIONAL WORDS.
        [response format]:
        [
        {{
        "criteria": "criteria 1",
        "score": "score",
        "rationale" : "rationale"
        }},
        {{
        "criteria": "criteria 2",
        "score": "score",
        "rationale" : "rationale"
        }},
        ...
        ]
    `;

    const sendAndSetEvaluation = async () => {
        const respond = await requestChat(
            // system prompt랑 user prompt를 local storage의 real-time 응답으로 대체해야함
            systemPrompt, userPrompt,
        )

        setEvaluation(respond.choices)
    }

    return [evaluation, sendAndSetEvaluation] as const
}