# 🎬 Aselens - Professional Social Media Downloader

<p align="center">
  <img src="https://img.shields.io/badge/Version-1.0.0-blueviolet?style=for-the-badge" alt="Version">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License">
  <img src="https://img.shields.io/badge/Platform-Cross--Platform-orange?style=for-the-badge" alt="Platform">
  <img src="https://img.shields.io/badge/Docker-Supported-blue?style=for-the-badge&logo=docker" alt="Docker">
</p>

Aselens is a powerful, sleek, and high-performance social media downloader built on top of `yt-dlp`. It provides a premium user experience with advanced animations, multi-language support, and deep customization options for video and audio downloads.

---

## ✨ Key Features

- **🚀 1000+ Platforms Supported**: Download from YouTube, Instagram (Reels), TikTok (No Watermark), X (Twitter), Facebook, Pinterest, LinkedIn, SoundCloud, Twitch, and many more.
- **💎 Premium UI/UX**: Modern dark-themed interface with GSAP & Animate.css powered micro-animations.
- **⚙️ Advanced Download Options**:
  - **Video Quality**: Up to 4K/8K (depending on source).
  - **Audio Extraction**: High-quality MP3, M4A, or Opus with selectable bitrates.
  - **Codecs**: Choose between H.264, H.265 (HEVC), or AV1.
  - **Smart Features**: SponsorBlock integration (skip ads), embedded subtitles, and free-format preference (VP9/WebM).
- **🛠 Admin Dashboard**: Track statistics (visits, downloads), manage AdSense scripts, and configure server settings in real-time.
- **🗑 Automated Cleanup**: Zero-retention policy. Downloaded files are automatically purged after 1 hour (or immediately after download) to ensure privacy and save disk space.
- **🐳 Docker Ready**: Easily deploy anywhere using Docker and Docker Compose.

---

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Core Engine**: `yt-dlp`
- **Frontend**: Vanilla JavaScript (ES6+), CSS3 (Modern Flex/Grid), GSAP, Animate.css
- **Localization**: Multi-language support (TR, EN, ES, RU, AR)
- **Containerization**: Docker, Docker Compose

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) (Must be installed and in your system PATH)
- [FFmpeg](https://ffmpeg.org/) (Required for merging video/audio and format conversion)

### Local Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/aselens-software/social-downloader.git
   cd social-downloader
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure the application**:
   - The server uses `config.json` for settings and `stats.json` for tracking.
   - Default admin password is `admin` (Change this in `config.json`).

4. **Start the server**:
   ```bash
   npm start
   ```
   Server will run at `http://localhost:3169` (or next available port).

### Docker Setup

Run Aselens instantly using Docker:

```bash
docker-compose up -d
```

---

## 🚀 Deployment

### Netlify (Frontend Only)
The project includes a `netlify.toml` file for easy frontend deployment.
- **Publish Directory**: `public`
- **API Proxying**: By default, `/api/*` requests are proxied. Update the `netlify.toml` with your actual backend URL.

### Backend Deployment
Since the backend requires `yt-dlp` and `ffmpeg`, we recommend:
- **Render / Railway / Heroku**: Use a Docker-based deployment (using the included `Dockerfile`).
- **VPS**: Standard Node.js setup with binary dependencies installed.

---

## 🛡 Security & Privacy

Aselens does not store your data. All media downloads are processed on-the-fly or stored temporarily in a private `downloads` folder which is purged regularly. No metadata or user URLs are permanently logged.

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Developed by Aselens Software
</p>
