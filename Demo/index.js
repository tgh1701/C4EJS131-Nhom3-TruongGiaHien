const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $(".player");
const cd = $(".cd");
const heading = $("header p");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");
const allAudios = document.getElementsByTagName("audio");
const volumeSlider = $("#volume-slider");
const volumeBtn = $(".btn-volume");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  isMuting: false,
  config: {},
  songs: [
    {
      name: "Rude",
      singer: "Magic!",
      path: "https://vmlbox.com/wp-content/uploads/2022/04/MAGIC-Rude-Vmlboxcom.mp3",
      image: "/img/rude.jpeg",
    },
    {
      name: "We Don't Talk Anymore",
      singer: "charlie puth",
      path: "https://musicdownload.cc/files/download/id/241",
      image: "/img/wdta.jpeg",
    },
    {
      name: "How do you like that",
      singer: "BlackP!nk",
      path: "https://musicdownload.cc/files/download/id/1130",
      image:
        "https://upload.wikimedia.org/wikipedia/vi/e/eb/Blackpink_-_How_You_Like_That.png",
    },
    {
      name: "double take",
      singer: "dhruv",
      path: "https://tainhacmienphi.mobi/download-music/141089",
      image: "https://i.scdn.co/image/ab67616d00001e02834f16100678d3e800fb5fb9",
    },
    {
      name: "Attention",
      singer: "Charlie Puth",
      path: "https://data37.chiasenhac.com/downloads/1906/2/1905972-dcc73708/128/Attention%20-%20Charlie%20Puth.mp3",
      image: "https://data.chiasenhac.com/data/cover/86/85553.jpg",
    },
  ],
  setConfig: function (key, value) {
    this.config[key] = value;
  },
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
                        <div class="song ${
                          index === this.currentIndex ? "active" : ""
                        }" data-index="${index}">
                            <div class="thumb"
                                style="background-image: url('${song.image}')">
                            </div>
                            <div class="body">
                                <h3 class="title">${song.name}</h3>
                                <p class="author">${song.singer}</p>
                            </div>
                            <div class="option">
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>
                    `;
    });
    playlist.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    // Handle CD spins / stops
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, // 10 seconds
      iterations: Infinity,
    });
    cdThumbAnimate.pause();

    // Handle when click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // When the song is played
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };

    // When the song is pause
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    // When the song progress changes
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    // Handling when seek
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };

    // When next song
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // When prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
      _this.scrollToActiveSong();
    };

    // Handling on / off random song
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };

    // Single-parallel repeat processing
    repeatBtn.onclick = function (e) {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };

    // Volume
    // volumeSlider.addEventListener("change", function (e) {
    //   allAudios.volumeSlider = volumeSlider.value / 100;
    // });
    // volumeBtn.onclick = function () {
    //   _this.isMuting = true;
    //   player.classList.add("muting");
    // };
    // volumeBtn.onclick = function () {
    //   _this.isMuting = false;
    //   player.classList.remove("muting");
    // };
    // volumeBtn.onclick = function (e) {};
    // volumeSlider.onchange = function (e) {
    //   if (volumeSlider.value < 50) {
    //     volumeBtn.classList.remove("fas fa-volume-up");
    //     volumeBtn.classList.add("fa-solid fa-volume-xmark");
    //   }
    //   if (volumeSlider.value > 50) {
    //     volumeBtn.classList.add("fas fa-volume-up");
    //     volumeBtn.classList.remove("fa-solid fa-volume-xmark");
    //   }
    // };
    // Handle next song when audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };
    // Listen to playlist clicks
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");

      if (songNode || e.target.closest(".option")) {
        // Handle when clicking on the song
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }

        // Handle when clicking on the song option
        if (e.target.closest(".option")) {
        }
      }
    };
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 300);
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
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
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);

    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  start: function () {
    // Assign configuration from config to application
    this.loadConfig();

    // Defines properties for the object
    this.defineProperties();

    // Listening / handling events (DOM events)
    this.handleEvents();

    // Load the first song information into the UI when running the app
    this.loadCurrentSong();

    // Render playlist
    this.render();

    // Display the initial state of the repeat & random button
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  },
};

app.start();
