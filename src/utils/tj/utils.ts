/**
 * Checks for an error in the provided DOM document.
 * Throws an error if an error element is found.
 * @param dom - The DOM document to check for errors.
 * @throws {Error} - If an error element is found in the DOM document.
 */
export const checkForError = (dom: Document) => {
  const error = dom.querySelector('serviceError');
  if (error) {
    throw new Error(error.textContent ?? 'Unknown error');
  }
};

/**
 * Migrates the selected tasks from the old format to the new format.
 */
export const migrateV1SelectedTasks = () => {
  if (localStorage.getItem(LOCAL_STORAGE_KEYS.OLD_SELECTED_TASKS)) {
    const selectedTasks = localStorage.getItem(LOCAL_STORAGE_KEYS.OLD_SELECTED_TASKS).split(',');
    localStorage.removeItem(LOCAL_STORAGE_KEYS.OLD_SELECTED_TASKS);
    localStorage.setItem(LOCAL_STORAGE_KEYS.SELECTED_TASKS, JSON.stringify(selectedTasks));
  }
};

export const escapeNonAlphanumericCharacters = (value: string) => {
  // Remove emojis first
  // This regex matches most emoji ranges including:
  // - Emoticons (😀-🙏)
  // - Miscellaneous Symbols and Pictographs (🌀-🗿)
  // - Transport and Map Symbols (🚀-🛿)
  // - Supplemental Symbols and Pictographs (🤐-🧿)
  // - Symbols and Pictographs Extended-A (🩀-🩿)
  // - And other emoji ranges
  const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FAFF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;
  const withoutEmojis = value.replace(emojiRegex, '');

  // Define a regular expression to match non-alphanumeric characters
  const regex = /[^a-zA-Z0-9]/g;

  // Replace non-alphanumeric characters with their HTML entities
  const escapedString = withoutEmojis.replace(regex, function (match) {
    return '&#' + match.charCodeAt(0) + ';';
  });

  return escapedString;
};

export interface Day {
  date: Date;
  dayOfWeek: number;
  label: string;
  iso: string;
}

/**
 * Returns an array of Day objects representing the week days of the current week.
 * @param date - The date you want to get the week days for.
 * @returns An array of Day objects representing the week days.
 */
export const getWeekDays = (date: Date = new Date()): Day[] => {
  const formatter = new Intl.DateTimeFormat('en', { weekday: 'short' });
  const days: Day[] = [];
  const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
  // Calculate the date of the Monday of the current week.
  const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  date.setDate(diff);
  date.setUTCHours(0, 0, 0, 0);
  const monday = new Date(date);
  for (let i = 0; i < 7; i += 1) {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    days.push({
      date: day,
      dayOfWeek: day.getDay(),
      label: formatter.format(day),
      iso: day.toISOString().split('T')[0],
    });
  }
  return days;
};

export const LOCAL_STORAGE_KEYS = {
  USER: 'tj_user',
  OLD_SELECTED_TASKS: 'tj_selected_tasks',
  SELECTED_TASKS: 'tj_selected_tasks_tjiv2',
  DEFAULT_WORK_KIND: 'tj_default_work_kind',
  VERSION: 'tj_version',
  URL: 'tj_url',
  IS_EXPANDED: 'tj_is_expanded',
};

export const DOMAIN_COUNTRIES = {
  'com': 'NA',
  'uk': 'UK',
  'ro': 'RO',
};