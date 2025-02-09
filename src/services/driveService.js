const GOOGLE_DRIVE_FOLDER_ID = '1BFVAY22zT2bLMN0knEZh98gkxFbhXbgw';
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

// Cache for storing all files
let filesCache = null;
let lastFetchTime = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache duration

const getAllFiles = async (folderId, parentPath = '') => {
  let allFiles = [];
  
  try {
    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents and trashed=false&key=${API_KEY}&fields=files(id,name,parents,mimeType)`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch files');
    }

    const data = await response.json();
    
    // Add current folder's files with path information
    allFiles = data.files.map(file => ({
      ...file,
      path: parentPath
    }));

    const subfolders = data.files.filter(file => 
      file.mimeType === 'application/vnd.google-apps.folder'
    );

    const subfolderPromises = subfolders.map(folder => 
      getAllFiles(folder.id, parentPath ? `${parentPath}/${folder.name}` : folder.name)
    );
    const subfolderResults = await Promise.all(subfolderPromises);
    
    subfolderResults.forEach(files => {
      allFiles = [...allFiles, ...files];
    });

    return allFiles;
  } catch (error) {
    console.error('Error fetching files:', error);
    throw error;
  }
};

export const refreshCache = async () => {
  try {
    filesCache = await getAllFiles(GOOGLE_DRIVE_FOLDER_ID);
    lastFetchTime = Date.now();
    return filesCache;
  } catch (error) {
    console.error('Error refreshing cache:', error);
    throw error;
  }
};

export const searchDriveFiles = (query) => {
  try {
    if (!filesCache) {
      throw new Error('Cache not initialized');
    }

    const searchQuery = query.toLowerCase();
    
    const matchingFiles = filesCache.filter(file => {
      const fileName = file.name.toLowerCase();
      return fileName.includes(searchQuery);
    });

    return matchingFiles.map(file => ({
      id: file.id,
      name: file.name,
      path: file.path || '',
      link: file.mimeType === 'application/vnd.google-apps.folder' 
        ? `https://drive.google.com/drive/folders/${file.id}`
        : `https://drive.google.com/file/d/${file.id}/view`
    }));
  } catch (error) {
    console.error('Search error:', error);
    throw new Error('Failed to search files: ' + error.message);
  }
};

// Initialize cache on module load
refreshCache().catch(console.error);
