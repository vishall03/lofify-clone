console.log("lets write javascript");
let currentSong = new Audio();
let currentIndex = 0;
let allSongs = [];

async function getSongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/");
    let response = await a.text();

    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");

    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1]);
        }
    }
    return songs;
}

const playMusic = (track, index) => {
    currentSong.src = "/songs/" + track;
    currentSong.play();
    play.src = "image/pause.svg";
    
    // Remove folder name and %20, then decode the song name for display
    const songName = track.split('/').pop(); // Get only the song name (last part after /)
    const displayName = songName.replaceAll("%20", " ");
    document.querySelector(".songinfo").innerHTML = displayName;
    currentIndex = index;

    // Reset time
    document.getElementById("currentTime").textContent = "00:00";
    document.getElementById("remainingTime").textContent = "00:00";
};

async function main() {
    allSongs = await getSongs();

let songUL = document.querySelector(".songList ul");
songUL.innerHTML = ""; // Clear previous content
for (let i = 0; i < allSongs.length; i++) {
    const song = allSongs[i];
    songUL.innerHTML += `
        <li data-index="${i}">
            <img src="music.svg" alt="">
            <div class="info">
                <div>${song.replaceAll("%20", " ")}</div>
                <div>Sidhe Maut</div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img src="play.svg" alt="">
            </div>
        </li>`;
}
   // Attach click events to all songs
Array.from(songUL.getElementsByTagName("li")).forEach((e) => {
    e.addEventListener("click", () => {
        const index = parseInt(e.getAttribute("data-index"));
        playMusic(allSongs[index], index);
    });
});

    // Play/Pause toggle
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "image/pause.svg";
        } else {
            currentSong.pause();
            play.src = "image/play.svg";
        }
    });

    // ✅ Time update
    currentSong.addEventListener("timeupdate", () => {
        let current = currentSong.currentTime;
        let duration = currentSong.duration;

        if (!isNaN(duration)) {
            let progress = (current / duration) * 100;
            document.querySelector(".progress").style.width = `${progress}%`;
            document.querySelector(".circle").style.left = `${progress}%`;

            document.getElementById("currentTime").textContent = formatTime(current);
            document.getElementById("remainingTime").textContent = formatTime(duration - current);
        }
    });

    // ✅ Seekbar click-to-seek
    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let seekbar = e.currentTarget;
        let rect = seekbar.getBoundingClientRect();
        let offsetX = e.clientX - rect.left;
        let width = rect.width;
        let percentage = offsetX / width;
        let duration = currentSong.duration;

        if (!isNaN(duration)) {
            currentSong.currentTime = percentage * duration;
        }
    });

    // ✅ Next song
    document.getElementById("next").addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % allSongs.length;
        playMusic(allSongs[currentIndex], currentIndex);
    });

    // ✅ Previous song
    document.getElementById("previous").addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + allSongs.length) % allSongs.length;
        playMusic(allSongs[currentIndex], currentIndex);
    });

    // ✅ Volume Controls
    const volumeSlider = document.getElementById("volumeSlider");
    const volumeIcon = document.getElementById("volumeIcon");
    const muteIcon = document.getElementById("muteIcon");
    let previousVolume = 100;
    let isMuted = false;

    // Set initial volume
    currentSong.volume = 1;

    // Function to update volume display
    function updateVolumeDisplay(volume) {
        if (volume === 0) {
            volumeIcon.style.display = "none";
            muteIcon.style.display = "block";
        } else {
            volumeIcon.style.display = "block";
            muteIcon.style.display = "none";
        }
        
        // Update volume slider fill
        const percentage = volume * 100;
        volumeSlider.style.background = `linear-gradient(to right, black 0%, black ${percentage}%, white ${percentage}%, white 100%)`;
    }

    // Initialize display
    updateVolumeDisplay(1);

    // Volume slider functionality
    volumeSlider.addEventListener("input", (e) => {
        const volume = e.target.value / 100;
        currentSong.volume = volume;
        
        updateVolumeDisplay(volume);
        
        // Update previous volume for unmute functionality
        if (volume > 0) {
            previousVolume = volume * 100;
        }
    });

    // Volume icon click - toggle mute/unmute
    volumeIcon.addEventListener("click", () => {
        if (currentSong.volume > 0) {
            // Mute
            previousVolume = currentSong.volume * 100;
            currentSong.volume = 0;
            volumeSlider.value = 0;
            updateVolumeDisplay(0);
            isMuted = true;
        } else {
            // Unmute
            currentSong.volume = previousVolume / 100;
            volumeSlider.value = previousVolume;
            updateVolumeDisplay(previousVolume / 100);
            isMuted = false;
        }
    });

    // Mute icon click - toggle mute/unmute
    muteIcon.addEventListener("click", () => {
        if (currentSong.volume > 0) {
            // Mute
            previousVolume = currentSong.volume * 100;
            currentSong.volume = 0;
            volumeSlider.value = 0;
            updateVolumeDisplay(0);
            isMuted = true;
        } else {
            // Unmute
            currentSong.volume = previousVolume / 100;
            volumeSlider.value = previousVolume;
            updateVolumeDisplay(previousVolume / 100);
            isMuted = false;
        }
    });
}

// Format seconds into MM:SS
function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

// Fetch songs from sm folder
async function getSmSongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/sm/");
    let response = await a.text();

    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");

    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push("sm/" + element.href.split("/songs/sm/")[1]);
        }
    }
    return songs;
}

// Load sm songs into playlist
async function loadSmSongs() {
    allSongs = await getSmSongs();

    let songUL = document.querySelector(".songList ul");
    songUL.innerHTML = ""; // Clear previous content
    for (let i = 0; i < allSongs.length; i++) {
        const song = allSongs[i];
        // Remove "sm/" prefix from display name
        const displayName = song.replace("sm/", "").replaceAll("%20", " ");
        songUL.innerHTML += `
            <li data-index="${i}">
                <img src="music.svg" alt="">
                <div class="info">
                    <div>${displayName}</div>
                    <div>Sidhe Maut</div>
                </div>
                <div class="playnow">
                    <span>Play Now</span>
                    <img src="play.svg" alt="">
                </div>
            </li>`;
    }
    // Attach click events to all songs
    Array.from(songUL.getElementsByTagName("li")).forEach((e) => {
        e.addEventListener("click", () => {
            const index = parseInt(e.getAttribute("data-index"));
            playMusic(allSongs[index], index);
        });
    });
}

// Get all folders from songs directory
async function getFolders() {
    try {
        console.log("Fetching folders from server...");
        let a = await fetch("http://127.0.0.1:3000/songs/");
        console.log("Server response status:", a.status);
        
        if (!a.ok) {
            throw new Error(`HTTP error! status: ${a.status}`);
        }
        
        let response = await a.text();
        console.log("Server response:", response.substring(0, 200) + "...");

        // Parse the HTML response to find folder links
        let folders = [];
        
        // Use regex to find folder links in the HTML
        const folderRegex = /href="([^"]*\/)"[^>]*>([^<]*)<\/a>/g;
        let match;
        
        while ((match = folderRegex.exec(response)) !== null) {
            const href = match[1];
            const text = match[2].trim();
            
            console.log("Found link:", href, "Text:", text);
            
            // Check if this is a folder (ends with /) and is not the parent directory
            if (href.endsWith("/") && 
                !href.includes("..") && 
                !href.startsWith("/") && 
                text !== "Parent Directory") {
                
                // Extract folder name from href - clean up the path
                let folderName = href.replace("/", "");
                
                // Remove any path prefixes like \songs\ or songs\
                folderName = folderName.replace(/^[\\\/]?songs[\\\/]/, "");
                folderName = folderName.replace(/^[\\\/]/, "");
                
                if (folderName && folderName !== "") {
                    folders.push(folderName);
                    console.log("Added folder:", folderName);
                }
            }
        }
        
        console.log("Final folders list:", folders);
        return folders;
    } catch (error) {
        console.error("Error fetching folders:", error);
        return [];
    }
}

// Get folder info from info.json
async function getFolderInfo(folderName) {
    try {
        // Encode the folder name for URL
        const encodedFolderName = encodeURIComponent(folderName);
        let response = await fetch(`http://127.0.0.1:3000/songs/${encodedFolderName}/info.json`);
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.log(`No info.json found for ${folderName}`);
    }
    
    // Default info if no info.json exists
    const displayName = folderName.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    return {
        title: displayName,
        description: `Explore the best of ${displayName}`
    };
}

// Get songs from specific folder
async function getSongsFromFolder(folderName) {
    try {
        // Encode the folder name for URL
        const encodedFolderName = encodeURIComponent(folderName);
        let a = await fetch(`http://127.0.0.1:3000/songs/${encodedFolderName}/`);
        let response = await a.text();

        let div = document.createElement("div");
        div.innerHTML = response;
        let as = div.getElementsByTagName("a");

        let songs = [];
        for (let index = 0; index < as.length; index++) {
            const element = as[index];
            if (element.href.endsWith(".mp3")) {
                // Extract the song name from the URL
                const songUrl = element.href;
                const songName = songUrl.split('/').pop(); // Get the last part of the URL
                songs.push(`${folderName}/${songName}`);
            }
        }
        return songs;
    } catch (error) {
        console.error(`Error fetching songs from folder ${folderName}:`, error);
        return [];
    }
}

// Load songs from specific folder into playlist
async function loadSongsFromFolder(folderName) {
    allSongs = await getSongsFromFolder(folderName);

    let songUL = document.querySelector(".songList ul");
    songUL.innerHTML = ""; // Clear previous content
    for (let i = 0; i < allSongs.length; i++) {
        const song = allSongs[i];
        // Remove folder prefix from display name
        const displayName = song.replace(`${folderName}/`, "").replaceAll("%20", " ");
        songUL.innerHTML += `
            <li data-index="${i}">
                <img src="image/music.svg" alt="">
                <div class="info">
                    <div>${displayName}</div>
                    <div>${folderName}</div>
                </div>
                <div class="playnow">
                    <span>Play Now</span>
                    <img src="image/play.svg" alt="">
                </div>
            </li>`;
    }
    // Attach click events to all songs
    Array.from(songUL.getElementsByTagName("li")).forEach((e) => {
        e.addEventListener("click", () => {
            const index = parseInt(e.getAttribute("data-index"));
            playMusic(allSongs[index], index);
        });
    });
}

// Create cards for all folders
async function createFolderCards() {
    try {
        console.log("Starting to create folder cards...");
        let folders = await getFolders();
        console.log("Found folders:", folders);
        
        // Fallback to known folders if server fetch fails
        if (folders.length === 0) {
            folders = ['sm', 'talha anjum', 'lofi', 'krsna', 'karan aujla', 'diljit', 'bollywood', 'arijit'];
            console.log("Using fallback folders:", folders);
        }
        
        const cardsContainer = document.querySelector('.cardContainer');
        console.log("Cards container found:", cardsContainer);
        
        if (cardsContainer) {
            cardsContainer.innerHTML = ""; // Clear existing cards
            
            // Create cards for each folder with custom info
            for (const folder of folders) {
                console.log("Processing folder:", folder);
                const folderInfo = await getFolderInfo(folder);
                console.log("Folder info:", folderInfo);
                
                const card = document.createElement('div');
                card.className = 'card';
                card.setAttribute('data-folder', folder);
                
                // Use custom image if available, otherwise use default
                const encodedFolderName = encodeURIComponent(folder);
                const imageSrc = `songs/${encodedFolderName}/cover.jpeg`;
                
                card.innerHTML = `
                    <div class="play">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white"
                            viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="12" fill="#1DB954" />
                            <polygon points="9,7 9,17 17,12" fill="white" />
                        </svg>
                    </div>
                    <img src="${imageSrc}" alt="${folderInfo.title}" onerror="this.src='https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/radio/artist/2oBG74gAocPMFv6Ij9ykdo/en'">
                    <h2>${folderInfo.title}</h2>
                    <p>${folderInfo.description}</p>
                `;
                
                // Add click event to load songs from this folder
                card.addEventListener('click', () => {
                    loadSongsFromFolder(folder);
                });
                
                cardsContainer.appendChild(card);
                console.log("Added card for:", folder);
            }
        } else {
            console.error("Card container not found!");
        }
    } catch (error) {
        console.error("Error creating folder cards:", error);
    }
}

//Add an event listner for hamburger
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const leftSidebar = document.querySelector('.left');
    const closeBtn = document.querySelector('.close');

    hamburger.addEventListener('click', function() {
        leftSidebar.style.left = '0';
    });

    closeBtn.addEventListener('click', function() {
        leftSidebar.style.left = '-120%';
    });

    // Create cards for all folders
    createFolderCards();
});

main();
