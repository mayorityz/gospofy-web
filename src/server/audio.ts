import REQUEST, { REQUEST_TYPE } from ".";

const AUDIO_ROUTES = {
  UPLOAD: "/audio/upload",
  UPLOAD_EPISODE: "/media/upload-episode",
  UPLOAD_PODCAST: "/audio/upload-podcast",
  UPLOAD_SERMON: "/audio/upload-sermon",
  GET_SONGS: "/audio/get-songs",
  GET_PODCASTS: "/audio/get-podcasts",
  GET_SERMONS: "/audio/get-sermons",
  GET_GENRES: "/audio/get-genres",
  DELETE_AUDIO: "/audio/delete",
  GET_LIST_AUDIO_CATEGORIES: "/media/audio-categories",
  GET_USERS_UPLOADED_MEDIA: "/media/user-media",
  GET_MEDIA_STATUSES: "/media/media-statuses",
  GET_MEDIA_BY_STATUS: "/media/media-by-admin-status",
};

interface IResponse {
  success: boolean;
  message: string;
}

export interface IMediaStatuses extends IResponse {
  data: string[];
}

export interface IMediaByStatus extends IResponse {
  data: {
    media: {
      _id: string;
      title: string;
      genre: {
        _id: string;
        title: string;
      };
      artist: {
        _id: string;
        name: string;
      };
      image: string;
      description: string;
      type: "sermon" | "album" | "podcast";
      createdAt: Date;
      adminStatus: string;
      noOfEpisodes: number;
    }[];
    total: number;
    page: number;
    limit: number;
  };
}

const GET_MEDIA_STATUSES = async (): Promise<IMediaStatuses> => {
  const response = await REQUEST(REQUEST_TYPE.GET, AUDIO_ROUTES.GET_MEDIA_STATUSES);
  return response;
};

const GET_MEDIA_BY_STATUS = async (
  status: string,
  page: number,
  limit: number
): Promise<IMediaByStatus> => {
  const response = await REQUEST(
    REQUEST_TYPE.GET,
    `${AUDIO_ROUTES.GET_MEDIA_BY_STATUS}?page=${page}&limit=${limit}&status=${status}`
  );
  return response;
};

const UPLOAD_EPISODE = async (data: any) => {
  const response = await REQUEST(REQUEST_TYPE.POST, AUDIO_ROUTES.UPLOAD_EPISODE, data);
  return response;
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

const GET_LIST_AUDIO_CATEGORIES = async () => {
  const response = await REQUEST(REQUEST_TYPE.GET, AUDIO_ROUTES.GET_LIST_AUDIO_CATEGORIES);
  return response;
};

const GET_USERS_UPLOADED_MEDIA = async (type: string, page: number, limit: number) => {
  const response = await REQUEST(
    REQUEST_TYPE.GET,
    `${AUDIO_ROUTES.GET_USERS_UPLOADED_MEDIA}/${type}?page=${page}&limit=${limit}`
  );
  return response;
};

export {
  UPLOAD_EPISODE,
  UPLOAD_AUDIO,
  UPLOAD_PODCAST,
  UPLOAD_SERMON,
  GET_SONGS,
  GET_PODCASTS,
  GET_SERMONS,
  GET_GENRES,
  DELETE_AUDIO,
  GET_LIST_AUDIO_CATEGORIES,
  GET_USERS_UPLOADED_MEDIA,
  GET_MEDIA_STATUSES,
  GET_MEDIA_BY_STATUS,
};
