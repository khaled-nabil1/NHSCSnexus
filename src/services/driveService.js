const GOOGLE_DRIVE_FOLDER_ID = '1BFVAY22zT2bLMN0knEZh98gkxFbhXbgw';
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export const searchDriveFiles = async (query) => {
  try {
    // First, get all files in the main folder and its subfolders
    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files?q='${GOOGLE_DRIVE_FOLDER_ID}' in parents and trashed=false&key=${API_KEY}&fields=files(id,name,parents,mimeType)`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch files');
    }

    const data = await response.json();
    
    // Filter files based on search query
    const matchingFiles = data.files.filter(file => 
      file.name.toLowerCase().includes(query.toLowerCase())
    );

    // Format the results
    const files = matchingFiles.map(file => ({
      id: file.id,
      name: file.name,
      // Determine if it's in S1 or S2 based on name/path (you might need to adjust this logic)
      section: file.name.toLowerCase().includes('s1') ? 'S1' : 'S2',
      link: file.mimeType === 'application/vnd.google-apps.folder' 
        ? `https://drive.google.com/drive/folders/${file.id}`
        : `https://drive.google.com/file/d/${file.id}/view`
    }));

    return files;
  } catch (error) {
    console.error('Search error:', error);
    throw new Error('Failed to search files: ' + error.message);
  }
};
