const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const PlAYER_STORAGE_KEY = "F8_PLAYER";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

// Add volume control element to the DOM manually or via HTML
const volumeSlider = document.getElementById("volume");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
  playedSongs: [],
  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  songs: [
    {
      name: "Click Pow Get Down",
      singer: "Raftaar x Fortnite",
      path: "https://mp3.vlcmusic.com/download.php?track_id=34737&format=320",
      image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
    },
    {
      name: "Tu Phir Se Aana",
      singer: "Raftaar x Salim Merchant x Karma",
      path: "https://mp3.vlcmusic.com/download.php?track_id=34213&format=320",
      image:
        "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
    },
    {
      name: "Naachne Ka Shaunq",
      singer: "Raftaar x Brobha V",
      path:
        "https://mp3.filmysongs.in/download.php?id=Naachne Ka Shaunq Raftaar Ft Brodha V Mp3 Hindi Song Filmysongs.co.mp3",
      image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
    },
    {
      name: "Mantoiyat",
      singer: "Raftaar x Nawazuddin Siddiqui",
      path: "https://mp3.vlcmusic.com/download.php?track_id=14448&format=320",
      image:
        "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
    },
    {
      name: "Aage Chal",
      singer: "Raftaar",
      path: "https://mp3.vlcmusic.com/download.php?track_id=25791&format=320",
      image:
        "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
    },
    {
      name: "Damn",
      singer: "Raftaar x kr$na",
      path:
        "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
      image:
        "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg"
    },
    {
      name: "Feeling You",
      singer: "Raftaar x Harjas",
      path: "https://mp3.vlcmusic.com/download.php?track_id=27145&format=320",
      image:
        "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
    }
  ],
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      }
    });
  },
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000,
      iterations: Infinity
    });
    cdThumbAnimate.pause();

    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    playBtn.onclick = function () {
      if (_this.isPlaying) audio.pause();
      else audio.play();
    };

    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    let isSeeking = false;
    progress.oninput = function (e) {
      isSeeking = true;
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };
    progress.onchange = function () {
      isSeeking = false;
    };

    audio.ontimeupdate = function () {
      if (audio.duration && !isSeeking) {
        const progressPercent = Math.floor((audio.currentTime / audio.duration) * 100);
        progress.value = progressPercent;
      }
    };

    nextBtn.onclick = function () {
      if (_this.isRandom) _this.playRandomSong();
      else _this.nextSong();
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    prevBtn.onclick = function () {
      if (_this.isRandom) _this.playRandomSong();
      else _this.prevSong();
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    randomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };

    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    audio.onended = function () {
      if (_this.isRepeat) audio.play();
      else nextBtn.click();
    };

    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");
      if (songNode) {
        _this.currentIndex = Number(songNode.dataset.index);
        _this.setConfig("currentIndex", _this.currentIndex);
        _this.loadCurrentSong();
        _this.render();
        audio.play();
      }
    };

    // Volume control
    volumeSlider.oninput = function (e) {
      const value = e.target.value / 100;
      audio.volume = value;
      _this.setConfig("volume", value);
    };
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
        const activeSong = $(".song.active");
        if (activeSong) {
            activeSong.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 200);
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
    this.setConfig("currentIndex", this.currentIndex);
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom ?? false;
    this.isRepeat = this.config.isRepeat ?? false;
    this.currentIndex = this.config.currentIndex ?? 0;
    if (this.config.volume !== undefined) {
      audio.volume = this.config.volume;
      volumeSlider.value = this.config.volume * 100;
    }
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    if (this.playedSongs.length === this.songs.length - 1) {
      this.playedSongs = [];
    }

    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex || this.playedSongs.includes(newIndex));

    this.playedSongs.push(newIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
        <div class="song ${index === this.currentIndex ? "active" : ""}" data-index="${index}">
          <div class="thumb" style="background-image: url('${song.image}')"></div>
          <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
          </div>
          <div class="option"><i class="fas fa-ellipsis-h"></i></div>
        </div>`;
    });
    playlist.innerHTML = htmls.join("");
  },
  start: function () {
    this.loadConfig();
    this.defineProperties();
    this.handleEvents();
    this.loadCurrentSong();
    this.render();
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  }
};

app.start();
