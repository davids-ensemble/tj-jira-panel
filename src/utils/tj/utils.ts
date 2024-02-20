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
  if (localStorage.getItem('tj_selected_tasks')) {
    const selectedTasks = localStorage.getItem('tj_selected_tasks').split(',');
    localStorage.removeItem('tj_selected_tasks');
    localStorage.setItem(
      'tj_selected_tasks_tjiv2',
      JSON.stringify(selectedTasks),
    );
  }
};
