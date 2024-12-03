"use client"

import useLocalStorage from "@/lib/hooks/uselocalstorage";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import requestChat from "@/lib/api";

export default function EvaluationButton() {
    const [evaluation, setEvaluation] = useLocalStorage("evaluation", []);

    const systemPrompt = `
        You are an AI job interviewer designed to conduct professional interviews for various roles and industries. 
        Your primary objectives are to assess candidates’ qualifications, technical skills, behavioral tendencies, 
        and motivation through 5 questions, including behavioral questions to evaluate soft skills and past experiences, 
        and role-specific questions to assess technical expertise. 
    `

    const question = `
        What was your position? Please explain how you have been working as a engineer, and a project that made you better technically.
    `

    const answer = `
        I worked as a software engineer at google for 2 years.
        The project I did was shole event management service project.
        I worked at a fashion e-commerce platform for women in 40s and 50s.
        There were recommendation biz team and MD team.
        The recommendation team was in charge of handling discounts and sales events on the platform.
        The gathered products from MDs whereas the products were collected from Sellers negotiated with each one of them. 
        The problem here was that it takes too much of operating resources from negotiating products with Sellers to the Recommendation Team organizing events.
        This project was to automate the original operating lifecycle which took too much of time and human resources.
        It was considered to automate gathering, collecting, negotiating, selcting.. etc.
        The hardest part was making a selecting service which was to select around 200-300,000 from over 500,000 products.
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
        
        question : ${question}
        answer : ${answer}
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

    const handleClick = async (e) => {
        const respond = await requestChat(
            // system prompt랑 user prompt를 local storage의 real-time 응답으로 대체해야함
            systemPrompt, userPrompt,
        )

        setEvaluation(respond.choices)
    }

    return (
        <button type={"button"} onClick={handleClick}>
            <CheckBadgeIcon className={"size-3"} />
        </button>
    )
}