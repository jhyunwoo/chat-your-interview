/**
 * 서버에 요청을 보내는 함수
 *
 * 서버에 요청을 보낸 후 응답을 JSON 형태로 반환
 * @param path - 기본값: /
 * @param init - fetch 설정
 * @constructor
 */
export default async function API(path: string = "/", init: RequestInit) {
  const request = await fetch(`${process.env.API_URL!}${path}`, init);
  return await request.json();
}
