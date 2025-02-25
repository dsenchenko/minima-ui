import axios from 'axios';

// ToDo: fix env vars
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const uploadFiles = async (userId, files) => {
    if (!userId) {
        console.error("❌ Error: user_id is missing");
        return { error: "User ID is required" };
    }

    const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    const validFiles = files.filter((file) => allowedTypes.includes(file.type));
    if (validFiles.length === 0) {
        console.warn('⚠️ No valid files selected! Only PDF, DOC, and Excel are allowed.');
        return { error: 'Invalid file type. Allowed: PDF, DOC, Excel.' };
    }

    try {
        const formData = new FormData();
        validFiles.forEach((file) => formData.append('files', file));

        const requestUrl = `${API_BASE_URL}upload_files/?user_id=${encodeURIComponent(userId)}`;

        const response = await axios.post(requestUrl, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        console.log('✅ File upload response:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error uploading files:', error.response?.data || error.message);
        return { error: error.response?.data?.detail || 'Upload failed' };
    }
};

// ✅ New function to get list of uploaded files
export const getUploadedFiles = async (userId) => {
    if (!userId) {
        console.error("❌ Error: user_id is missing");
        return { error: "User ID is required" };
    }

    try {
        const requestUrl = `${API_BASE_URL}get_files/${encodeURIComponent(userId)}`;
        const response = await axios.get(requestUrl);

        console.log("📂 Retrieved uploaded files:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching uploaded files:", error.response?.data || error.message);
        return { error: error.response?.data?.detail || "Failed to fetch files" };
    }
};