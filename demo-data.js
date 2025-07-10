// Demo data for testing the deployed version
const demoFolders = [
    {
        name: "sm",
        title: "Seedhe Maut",
        description: "No filters, just fire — Seedhe Maut at their finest",
        songs: [
            "Anaadi.mp3",
            "Hola Amigo.mp3",
            "Kaanch Ke Ghar.mp3",
            "Khatta Flow.mp3",
            "Marne Ke Baad Bhi.mp3",
            "Nanchaku.mp3",
            "Teen Dost.mp3"
        ]
    },
    {
        name: "arijit",
        title: "Arijit Singh",
        description: "The voice of love and emotions",
        songs: [
            "Tum Hi Ho.mp3",
            "Chahun Main Ya Naa.mp3",
            "Raabta.mp3",
            "Gerua.mp3"
        ]
    },
    {
        name: "lofi",
        title: "Lo-Fi Beats",
        description: "Relaxing beats to study and chill",
        songs: [
            "Chill Vibes.mp3",
            "Study Session.mp3",
            "Night Drive.mp3",
            "Coffee Shop.mp3"
        ]
    }
];

// Function to get demo folders
function getDemoFolders() {
    return demoFolders;
}

// Function to get demo songs for a folder
function getDemoSongs(folderName) {
    const folder = demoFolders.find(f => f.name === folderName);
    return folder ? folder.songs.map(song => `${folderName}/${song}`) : [];
}

// Function to get demo folder info
function getDemoFolderInfo(folderName) {
    const folder = demoFolders.find(f => f.name === folderName);
    if (folder) {
        return {
            title: folder.title,
            description: folder.description
        };
    }
    return {
        title: folderName.charAt(0).toUpperCase() + folderName.slice(1),
        description: `Explore the best of ${folderName}`
    };
} 