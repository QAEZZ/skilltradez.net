const playPauseButton = document.getElementById('play-pause');
const logo = document.getElementById('logo');

function toggleMusic() {

    if (playPauseButton.classList.contains('fa-play')) {
        playPauseButton.classList.remove('fa-play');
        playPauseButton.classList.add('fa-pause');

        if (playPauseButton.classList.contains('first-run')) {
            playPauseButton.classList.remove('first-run');

            playSong('Holy Mob - Arcade Glamour (ft. Inteus).mp3');
        }

        audio.play();

    } else {
        playPauseButton.classList.remove('fa-pause');
        playPauseButton.classList.add('fa-play');

        audio.pause();
    }
}

function playSong(fileName) {
    let song = `media/audio/${fileName}`;

    audio = new Audio(song);
    audio.id = 'song-player';
    audio.crossOrigin = 'anonymous';
    audio.volume = 0.2;

    let audio_ctx = new (window.AudioContext || window.webkitAudioContext)();
    let audio_src = audio_ctx.createMediaElementSource(audio);
    let audio_analyser = audio_ctx.createAnalyser();

    audio.play();

    audio_src.connect(audio_analyser);
    audio_src.connect(audio_ctx.destination);
    audio_analyser.fftSize = 2048;

    let buffer_length = audio_analyser.frequencyBinCount;
    let data_array = new Uint8Array(buffer_length);

    audio_analyser.getByteTimeDomainData(data_array);

    audio.addEventListener('ended', function (e) {
        audio.play();
    });

    function anim_frame() {
        requestAnimationFrame(anim_frame);
        audio_analyser.getByteFrequencyData(data_array);

        let freq = data_array[3]*.003;
        let glowFreq = data_array[3]*.002;

        logo.setAttribute('style', `transform: scale(${1+freq}); filter: drop-shadow(0 0 ${(glowFreq)}rem #fff);`)
    }
    anim_frame();
}