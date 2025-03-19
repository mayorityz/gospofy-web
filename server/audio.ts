import REQUEST, { REQUEST_TYPE } from ".";

const AUDIO_ROUTES = {
  UPLOAD: "/audio/upload",
  UPLOAD_PODCAST: "/audio/upload-podcast",
  UPLOAD_SERMON: "/audio/upload-sermon",
  GET_SONGS: "/audio/get-songs",
  GET_PODCASTS: "/audio/get-podcasts",
  GET_SERMONS: "/audio/get-sermons",
  GET_GENRES: "/audio/get-genres",
  DELETE_AUDIO: "/audio/delete",
};

const UPLOAD_AUDIO = async (data: any) => {
  const response = await REQUEST(REQUEST_TYPE.POST, AUDIO_ROUTES.UPLOAD, data);
  return response;
};

const UPLOAD_PODCAST = async (data: any) => {
  const response = await REQUEST(REQUEST_TYPE.POST, AUDIO_ROUTES.UPLOAD_PODCAST, data);
  return response;
};

const UPLOAD_SERMON = async (data: any) => {
  const response = await REQUEST(REQUEST_TYPE.POST, AUDIO_ROUTES.UPLOAD_SERMON, data);
  return response;
};

const GET_SONGS = async () => {
  const response = await REQUEST(REQUEST_TYPE.GET, AUDIO_ROUTES.GET_SONGS);
  return response;
};

const GET_PODCASTS = async () => {
  const response = await REQUEST(REQUEST_TYPE.GET, AUDIO_ROUTES.GET_PODCASTS);
  return response;
};

const GET_SERMONS = async () => {
  const response = await REQUEST(REQUEST_TYPE.GET, AUDIO_ROUTES.GET_SERMONS);
  return response;
};

const GET_GENRES = async () => {
  const response = await REQUEST(REQUEST_TYPE.GET, AUDIO_ROUTES.GET_GENRES);
  return response;
};

const DELETE_AUDIO = async (data: any) => {
  const response = await REQUEST(REQUEST_TYPE.DELETE, AUDIO_ROUTES.DELETE_AUDIO, data);
  return response;
};

export {
  UPLOAD_AUDIO,
  UPLOAD_PODCAST,
  UPLOAD_SERMON,
  GET_SONGS,
  GET_PODCASTS,
  GET_SERMONS,
  GET_GENRES,
  DELETE_AUDIO,
};
