# 🎵 Spotify Clone - Lofify

A modern, responsive Spotify clone built with HTML, CSS, and JavaScript. Features a beautiful UI with dynamic music player functionality.

## ✨ Features

- **🎵 Dynamic Music Player** - Play, pause, next, previous controls
- **📁 Folder-based Playlists** - Organize music by artists/folders
- **🎛️ Volume Control** - Mute/unmute with volume slider
- **⏱️ Progress Bar** - Seek through songs with visual progress
- **📱 Responsive Design** - Works on desktop, tablet, and mobile
- **🎨 Custom UI** - Beautiful Spotify-inspired interface
- **🔄 Dynamic Cards** - Auto-generates cards for each music folder
- **📂 Custom Metadata** - Support for info.json and cover images per folder

## 🚀 Live Demo

[Add your live demo link here]

## 🛠️ Technologies Used

- **HTML5** - Structure and semantics
- **CSS3** - Styling and responsive design
- **JavaScript (ES6+)** - Dynamic functionality
- **Local Server** - For serving music files

## 📦 Installation & Setup

### Prerequisites
- A local web server (like Live Server in VS Code)
- Music files organized in folders

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/spotify-clone.git
   cd spotify-clone
   ```

2. **Organize your music**
   ```
   songs/
   ├── artist1/
   │   ├── song1.mp3
   │   ├── song2.mp3
   │   ├── cover.jpeg
   │   └── info.json
   ├── artist2/
   │   ├── song1.mp3
   │   ├── cover.jpeg
   │   └── info.json
   └── ...
   ```

3. **Create info.json for each folder** (optional)
   ```json
   {
     "title": "Artist Name",
     "description": "Artist description or album info"
   }
   ```

4. **Start local server**
   - Use VS Code Live Server extension, or
   - Use Python: `python -m http.server 3000`, or
   - Use Node.js: `npx serve .`

5. **Open in browser**
   - Navigate to `http://localhost:3000`

## 🎵 How to Use

1. **Browse Music**: Click on any artist card to load their songs
2. **Play Music**: Click on any song in the library to start playing
3. **Control Playback**: Use play/pause, next, previous buttons
4. **Adjust Volume**: Use the volume slider or mute button
5. **Seek Through Songs**: Click on the progress bar to jump to different parts

## 📁 Project Structure

```
spotify-clone/
├── index.html          # Main HTML file
├── style.css           # Main stylesheet
├── utility.css         # Utility classes
├── script.js           # JavaScript functionality
├── image/              # SVG icons and images
│   ├── play.svg
│   ├── pause.svg
│   ├── volume.svg
│   └── ...
├── songs/              # Music folders
│   ├── artist1/
│   ├── artist2/
│   └── ...
└── README.md           # This file
```

## 🎨 Customization

### Adding New Artists/Folders
1. Create a new folder in `songs/`
2. Add MP3 files to the folder
3. Optionally add `cover.jpeg` and `info.json`
4. Refresh the page - cards will auto-generate

### Styling
- Modify `style.css` for visual changes
- Update colors in CSS variables
- Customize animations and transitions

## 📱 Responsive Design

- **Desktop**: Full layout with sidebar and main content
- **Tablet**: Responsive cards and controls
- **Mobile**: Hamburger menu and mobile-optimized controls

## 🔧 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Spotify's beautiful design
- Icons from various sources
- Music player functionality built from scratch

## 📞 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - email@example.com

Project Link: [https://github.com/yourusername/spotify-clone](https://github.com/yourusername/spotify-clone)

---

⭐ If you like this project, please give it a star! 