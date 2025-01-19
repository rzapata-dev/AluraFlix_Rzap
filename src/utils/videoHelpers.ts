export const getYouTubeEmbedUrl = (url: string): string => {
  const videoId = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&\?]*)/)?.[1];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

export const getYouTubeThumbnail = (url: string): string => {
  const videoId = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&\?]*)/)?.[1];
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};