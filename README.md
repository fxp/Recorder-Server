# Recorder Server

Simple Node.js service that accepts meeting recordings and exposes placeholder APIs.

## Endpoints
- `POST /meetings` – create a new meeting and receive its `meeting_id`.
- `POST /meetings/{id}/upload` – upload an audio/video file for processing.
- `GET /meetings/{id}/transcript` – fetch the transcript (stub implementation).
- `GET /meetings/{id}/keyframes` – fetch extracted keyframes (stub implementation).

A basic playground page is available at the root to create a meeting and upload a file.

## Running
```bash
npm install
npm start
npm test
```
