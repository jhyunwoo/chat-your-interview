/**
 * 서버에 요청을 보내는 함수
 *
 * 서버에 요청을 보낸 후 응답을 JSON 형태로 반환
 * @param path - 기본값: /
 * @param init - fetch 설정
 * @constructor
 */
export default async function requestChat(
    systemPrompt: string,
    userPrompt: string,
) {
    const request = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}`, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`, 
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt }
                ],
            }),
        }
    )
    return await request.json()
}
