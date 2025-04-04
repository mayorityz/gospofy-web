import { useState, useEffect } from "react";
import { GET_USERS_UPLOADED_MEDIA } from "@/server/audio";

export type MediaType = "song" | "podcast" | "sermon" | "album";

export interface BaseMedia {
  _id: string;
  title: string;
  createdAt: Date;
  description: string;
  image: string;
  status: "pending" | "approved" | "rejected" | "suspended";
  genre: {
    _id: string;
    title: string;
  };
}

export interface Song extends BaseMedia {
  duration: string;
  likes: number;
  adminFeedback?: string;
  rejectionReason?: string;
}

export interface Podcast extends BaseMedia {
  episodes: number;
  coverArt?: string;
}

export interface Sermon extends BaseMedia {
  preacher: string;
  theme: string;
  duration: string;
  episodeCount?: number;
}

export type Media = Song | Podcast | Sermon;

interface UseMediaOptions {
  type: MediaType;
  statusFilter?: string;
  page?: number;
  limit?: number;
}

interface UseMediaResult<T extends Media> {
  data: T[];
  isLoading: boolean;
  error: Error | null;
  stats: {
    total: number;
    approved: number;
    pending: number;
    totalPlays: number;
    monthlyPlays: number;
    averageApprovalTime: string;
  };
}

export function useMedia<T extends Media>({
  type,
  statusFilter = "all",
  page = 1,
  limit = 10,
}: UseMediaOptions): UseMediaResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    totalPlays: 0,
    monthlyPlays: 0,
    averageApprovalTime: "0 days",
  });

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch media data
        const response = await GET_USERS_UPLOADED_MEDIA(type, page, limit);
        if (response.success) {
          setData(response.data);
          setStats(
            response.stats || {
              total: 0,
              approved: 0,
              pending: 0,
              totalPlays: 0,
              monthlyPlays: 0,
              averageApprovalTime: "0 days",
            }
          );
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch media"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedia();
  }, [type, statusFilter, page, limit]);

  return { data, isLoading, error, stats };
}
