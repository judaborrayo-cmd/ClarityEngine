const SESSION_KEY = 'ce_assessment_popup_session_views';
const SESSION_LIMIT = 2;

// Reserve an appearance before opening. Fail closed if session storage is blocked,
// so navigation or reloads cannot repeatedly show an uncounted invitation.
export function reserveAssessmentPopupView(storage: Pick<Storage, 'getItem' | 'setItem'>): boolean {
  try {
    const raw = storage.getItem(SESSION_KEY);
    const count = raw === null ? 0 : Number(raw);
    if (!Number.isInteger(count) || count < 0 || count >= SESSION_LIMIT) return false;
    storage.setItem(SESSION_KEY, String(count + 1));
    return true;
  } catch {
    return false;
  }
}
