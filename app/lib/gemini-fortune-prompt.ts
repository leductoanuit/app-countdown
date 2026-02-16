/* Vietnamese zodiac animals mapped by birth year % 12 */
const CON_GIAP: Record<number, string> = {
  0: "Thân (Khỉ)",
  1: "Dậu (Gà)",
  2: "Tuất (Chó)",
  3: "Hợi (Lợn)",
  4: "Tý (Chuột)",
  5: "Sửu (Trâu)",
  6: "Dần (Hổ)",
  7: "Mão (Mèo)",
  8: "Thìn (Rồng)",
  9: "Tỵ (Rắn)",
  10: "Ngọ (Ngựa)",
  11: "Mùi (Dê)",
};

/** Calculate Vietnamese zodiac animal from birth year */
export function getConGiap(birthYear: number): string {
  return CON_GIAP[birthYear % 12] ?? "Không xác định";
}

/** Build Gemini prompt for Tết fortune telling */
export function buildFortunePrompt(name: string, birthDate: string) {
  const date = new Date(birthDate);
  const birthYear = date.getFullYear();
  const conGiap = getConGiap(birthYear);
  const age = 2026 - birthYear;

  const systemPrompt = `Bạn là một thầy bói Việt Nam uy tín, chuyên xem bói đầu năm mới Tết Nguyên Đán.
Năm nay là Tết Bính Ngọ 2026 (Năm con Ngựa).
Hãy xem bói tổng quan năm mới cho người dùng dựa trên thông tin họ cung cấp.
Trả lời hoàn toàn bằng tiếng Việt, giọng văn thân thiện, tích cực nhưng vẫn thực tế.
Mỗi mục bói có rating từ 1-5 sao và mô tả 2-3 câu.
Kết hợp yếu tố con giáp, tuổi, và năm Ngọ 2026 trong lời bói.`;

  const userPrompt = `Xem bói tổng quan năm mới Tết 2026 cho:
- Tên: ${name}
- Ngày sinh: ${date.toLocaleDateString("vi-VN")}
- Tuổi con giáp: ${conGiap}
- Tuổi: ${age}

Trả về JSON theo format sau (KHÔNG markdown, CHỈ JSON):
{
  "categories": [
    { "name": "Tài Lộc", "icon": "💰", "rating": <1-5>, "description": "<2-3 câu>" },
    { "name": "Tình Duyên", "icon": "❤️", "rating": <1-5>, "description": "<2-3 câu>" },
    { "name": "Sức Khỏe", "icon": "🏥", "rating": <1-5>, "description": "<2-3 câu>" },
    { "name": "Sự Nghiệp", "icon": "💼", "rating": <1-5>, "description": "<2-3 câu>" }
  ],
  "summary": "<1 câu tổng kết ngắn gọn>"
}`;

  return { systemPrompt, userPrompt };
}
