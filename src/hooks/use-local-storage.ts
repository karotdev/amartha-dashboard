export const saveDraft = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.error('localStorage quota exceeded');
    } else {
      console.error('Failed to save draft to localStorage', error);
    }
  }
};

export const loadDraft = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      return null;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    console.error('Failed to load draft from localStorage', error);
    return null;
  }
};

export const clearDraft = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Failed to clear draft from localStorage', error);
  }
};

