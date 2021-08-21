import "./SongInfo.css";

function SongInfo() {
    return (
        <div className="SongInfo">
            <audio src="songs/My Way.mp3"></audio>

            <div className="imageContainer">
                <img id="cover" src="coverArt/JMSN.jpg" alt="cover art" />
            </div>

            <div className="musicInfo">
                <h2 id="title">My Way</h2>

                <div className="artistAlbum">
                    <p id="artist">JMSN</p>
                    <span>-</span>
                    <p id="album">JMSN</p>
                </div>
            </div>

            <div className="seekBarContainer">
                <input type="range" id="seekBar" value="0" />
                <div>
                    <p class="currentTime">00:00</p>
                    <p class="duration">02:34</p>
                </div>
            </div>
        </div>
    );
}

export default SongInfo;