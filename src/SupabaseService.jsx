import axios from 'axios';

// API config for train_pemain_bola
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5laHFiYXNvZmVkZXN4bHh3d2tsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4NDAwMzMsImV4cCI6MjA2NjQxNjAzM30.ZZolWXCv0IlJF4ndP3DIPnQzm9k4KhrCNbbhMUqot78";
const BASE_URL = "https://nehqbasofedesxlxwwkl.supabase.co/rest/v1/train_pemain_bola";
const HEADERS = {
    'apikey': API_KEY,
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
};

// GET method (menggunakan axios)
export async function getTrainPemainBola() {
    try {
        const response = await axios.get(BASE_URL, { headers: HEADERS });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

// POST method (menggunakan axios)
export async function postTrainPemainBola(data) {
    try {
        const response = await axios.post(BASE_URL, data, { headers: HEADERS });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

const BASE_URL_FAMOUS = "https://nehqbasofedesxlxwwkl.supabase.co/rest/v1/famous_footballer";

// GET method for famous_footballer (menggunakan axios)
export async function getFamousFootballer() {
    try {
        const response = await axios.get(BASE_URL_FAMOUS, { headers: HEADERS });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}