# Phase 1: Build the File Scraper

## Objective
Extract all file paths and metadata from the Google Drive public folder using its API.

## Steps
Enable Google Drive API:

Create a project in the Google Cloud Console.
Enable the Google Drive API.
Generate an API key.

Create File Scraper Script

Use gapi, axios, or googleapis package in a Node.js script.
Perform recursive searches in the folder structure using folder IDs.
Store the file name, path, and direct link in the database.

Phase 2: Backend API Development
Objective
Develop a simple backend API to fetch and filter file search results.

Steps
Initialize an Express server:
npm init -y
npm install express sqlite3 cors

Create the server

after that modify the Searchbar.jsx component to use the backend API.

