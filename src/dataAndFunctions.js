const createSongs = (id, title, artist, album) => ({ id, title, artist, album });

let songs = [];

songs.push(createSongs(1, "My Way", "JMSN", "JMSN"));
songs.push(createSongs(2, "Never Know", "6LACK", "Free 6LACK"));
songs.push(createSongs(3, "Little Bit", "Lykki Li", "Youth Novels"));
songs.push(createSongs(4, "Lovely", "Brent Faiyaz", "A.M. Paradox"));
songs.push(createSongs(5, "Never Be Like You (feat. kai)", "Flume", "Skin"));

// ARRAY RANDOMIZER:
const shuffleSongs = (songs) => {
    let remainingSet = songs.length;
    let remainingSingle;
    let temp;

    // while there remain elements to shuffle:
    while (remainingSet) {

        // pick a remaining element:
        remainingSingle = Math.floor(Math.random() * remainingSet--);

        // and swap it with the current element:
        temp = songs[remainingSet];
        songs[remainingSet] = songs[remainingSingle];
        songs[remainingSingle] = temp;
    }

    return songs;
};

// TIME FORMATTER:
const formatTime = (time) => {
    let min = Math.floor(time / 60);

    if (min < 10) {
        min = `0` + min;
    }

    let sec = Math.floor(time % 60);

    if (sec < 10) {
        sec = `0` + sec;
    }

    return `${min}:${sec}`;
};

export { songs, shuffleSongs, formatTime };