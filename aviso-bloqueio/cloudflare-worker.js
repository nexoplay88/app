const VIDEO_URL =
  "https://cdn.jsdelivr.net/gh/nexoplay88/app/aviso-bloqueio/AVISO-BLOQUEIO.mp4";

const CHANNELS = [
  "Globo",
  "SBT",
  "Record TV",
  "Band",
  "RedeTV!",
  "TV Cultura",
  "TV Brasil",
  "GloboNews",
  "CNN Brasil",
  "BandNews TV",
  "Record News",
  "Canal Rural",
  "GNT",
  "Multishow",
  "SporTV",
  "SporTV 2",
  "SporTV 3",
  "Premiere",
  "ESPN",
  "ESPN 2",
  "Discovery Channel",
  "Discovery Home & Health",
  "Discovery Science",
  "Animal Planet",
  "National Geographic",
  "History",
  "TLC",
  "Warner Channel",
  "TNT",
  "Cartoon Network",
];

const PLAYLIST = [
  "#EXTM3U",
  ...CHANNELS.flatMap((name) => [
    `#EXTINF:-1 tvg-name="${name}" group-title="Canais",${name}`,
    VIDEO_URL,
  ]),
  "",
].join("\n");

const PLAYLIST_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "no-store",
  "Content-Disposition": 'attachment; filename="lista-canais.m3u"',
  "Content-Type": "application/octet-stream",
};

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    if (url.pathname === "/get.php") {
      if (request.method === "HEAD") {
        return new Response(null, { status: 200, headers: PLAYLIST_HEADERS });
      }

      if (request.method === "GET") {
        return new Response(PLAYLIST, {
          status: 200,
          headers: PLAYLIST_HEADERS,
        });
      }

      return new Response("Method Not Allowed", { status: 405 });
    }

    return new Response(
      "Nexo Play IPTV endpoint ativo. Use /get.php?username=nexoplay88&password=app&type=m3u_plus&output=mpegts",
      {
        status: 200,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      },
    );
  },
};
