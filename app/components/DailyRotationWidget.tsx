const SPOTIFY_PLAYLIST_ID: string = "4zrLscMo5KpJZSOZPQfm9x";

export default function DailyRotationWidget() {
  const hasPlaylist =
    SPOTIFY_PLAYLIST_ID !== "" && !SPOTIFY_PLAYLIST_ID.startsWith("ISI_");

  return (
    <div className="w-full max-w-[470px] rounded-3xl border border-white/[0.08] bg-[#090a11] p-2">
      <div className="px-4 pb-6 pt-6">
        <h2 className="text-[28px] font-bold leading-tight text-white">
          Daily Rotation
        </h2>
        <p className="mt-3 text-sm text-white/55">My Spotify Playlist...</p>
      </div>

      {hasPlaylist ? (
        <iframe
          title="Spotify playlist"
          src={`https://open.spotify.com/embed/playlist/${SPOTIFY_PLAYLIST_ID}?utm_source=generator&theme=0`}
          width="100%"
          height="352"
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          className="block w-full rounded-xl border-0"
        />
      ) : (
        <div className="flex h-[352px] items-center justify-center rounded-xl bg-[#121212] text-sm text-white/50">
          ID playlist Spotify belum diisi
        </div>
      )}
    </div>
  );
}
