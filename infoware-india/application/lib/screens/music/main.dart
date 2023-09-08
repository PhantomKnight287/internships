import 'package:application/models/music.dart';
import 'package:application/notifiers/progress.dart';
import 'package:audio_video_progress_bar/audio_video_progress_bar.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:just_audio/just_audio.dart';

List<MusicSource> songs = [
  const MusicSource(
    name: "Falling",
    fileName: "Falling.mp3",
    artwork: "Falling.jpeg",
    artist: "Outlandr, Aleya Mae",
    attribution: '''Song: Outlandr & Aleya Mae - Falling [Arcade Release]
Music provided by NoCopyrightSounds
Free Download/Stream: http://ncs.io/OA_Falling 
Watch: http://ncs.lnk.to/OA_FallingAT/youtube''',
  ),
  const MusicSource(
    name: "Dreamer",
    fileName: "Dreamer.mp3",
    artwork: "Dreamer.jpg",
    artist: "Rival, Alan Walker",
    attribution: '''Song: Alan Walker - Dreamer (Rival Remix) [NCS Release]
Music provided by NoCopyrightSounds
Free Download/Stream: http://ncs.io/rival_dreamer
Watch: http://ncs.lnk.to/rival_dreamerAT/youtube''',
  ),
  const MusicSource(
    name: "If Looks Can Kill",
    fileName: "ILCK.mp3",
    artwork: "ILCK.jpg",
    artist: "Sam Welch, KHEMIS, Coopex",
    attribution: '''Song: Coopex, KHEMIS - If Looks Can Kill [NCS Release]
Music provided by NoCopyrightSounds 
Free Download/Stream: http://ncs.io/IfLooksCanKill
Watch: http://NCS.lnk.to/IfLooksCanKillAT/youtube''',
  )
];

class MusicPlayer extends StatefulWidget {
  const MusicPlayer({super.key});

  @override
  State<MusicPlayer> createState() => _MusicPlayerState();
}

class _MusicPlayerState extends State<MusicPlayer> {
  AudioPlayer a = AudioPlayer();
  final _progress = ProgressNotifier();
  int currentIndex = 0;
  @override
  void initState() {
    super.initState();
    a.setAudioSource(
      ConcatenatingAudioSource(
        children: songs.map((e) => AudioSource.uri(Uri.parse("asset:///assets/sounds/${e.fileName}"))).toList(),
      ),
    );
    if (a.playerState.playing == false) {
      a.play();
    }

    // Not cancelling any of these subscriptions because the song will be running in the background and cancelling these shows wrong data on the screen.
    a.currentIndexStream.listen((event) {
      if (event != null) {
        setState(() {
          currentIndex = event;
        });
      }
    });
    a.positionStream.listen((position) {
      final oldState = _progress.value;
      _progress.value = ProgressBarState(
        current: position,
        buffered: oldState.buffered,
        total: oldState.total,
      );
    });
    a.bufferedPositionStream.listen((bufferedPosition) {
      final oldState = _progress.value;
      _progress.value = ProgressBarState(
        current: oldState.current,
        buffered: bufferedPosition,
        total: oldState.total,
      );
    });
    a.durationStream.listen((totalDuration) {
      final oldState = _progress.value;
      _progress.value = ProgressBarState(
        current: oldState.current,
        buffered: oldState.buffered,
        total: totalDuration ?? Duration.zero,
      );
    });
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final currentSong = songs[currentIndex];
    return Scaffold(
        appBar: AppBar(),
        body: Padding(
          padding: const EdgeInsets.all(10.0),
          child: Column(
            children: [
              Center(
                child: Image.asset("assets/sounds/${currentSong.artwork}", height: 300),
              ),
              const SizedBox(
                height: 20,
              ),
              Text(
                currentSong.name,
                style: GoogleFonts.outfit(fontSize: 20, fontWeight: FontWeight.bold),
                textAlign: TextAlign.center,
              ),
              Text(
                currentSong.artist,
                style: GoogleFonts.outfit(fontSize: 16, fontWeight: FontWeight.w500),
                textAlign: TextAlign.center,
              ),
              const SizedBox(
                height: 40,
              ),
              if (a.audioSource!.sequence.isNotEmpty)
                ValueListenableBuilder<ProgressBarState>(
                  valueListenable: _progress,
                  builder: (_, value, __) {
                    return Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 20),
                      child: ProgressBar(
                        progress: value.current,
                        buffered: value.buffered,
                        total: value.total,
                        onSeek: (value) {
                          a.seek(value);
                        },
                      ),
                    );
                  },
                ),
              const SizedBox(
                height: 10,
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 25),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    IconButton(
                      onPressed: () {
                        if (currentIndex == 0) return;
                        a.seekToPrevious();
                      },
                      icon: const Icon(
                        Icons.skip_previous,
                        size: 45,
                      ),
                    ),
                    IconButton(
                      onPressed: () {
                        if (a.playing == true) {
                          a.pause();
                        } else {
                          a.play();
                        }
                        setState(() {});
                      },
                      icon: Icon(
                        a.playing ? Icons.pause : Icons.play_arrow,
                        size: 45,
                        color: Colors.white,
                      ),
                      style: ButtonStyle(
                        splashFactory: NoSplash.splashFactory,
                        backgroundColor: MaterialStateProperty.all(Colors.black),
                      ),
                    ),
                    IconButton(
                      onPressed: () {
                        if (currentIndex == 2) return;
                        a.seekToNext();
                      },
                      icon: const Icon(
                        Icons.skip_next,
                        size: 45,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(
                height: 20,
              ),
              Text(
                "Attribution",
                style: GoogleFonts.outfit(fontSize: 16, fontWeight: FontWeight.w500),
              ),
              Text(
                currentSong.attribution,
                style: GoogleFonts.outfit(fontSize: 14, fontWeight: FontWeight.w500),
                textAlign: TextAlign.justify,
              ),
            ],
          ),
        ));
  }
}
