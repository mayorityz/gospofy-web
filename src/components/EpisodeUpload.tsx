import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { UPLOAD_EPISODE, GET_LIST_AUDIO_CATEGORIES } from "@/server/audio";

interface AudioCategory {
  _id: string;
  title: string;
}

interface Episode {
  title: string;
  description: string;
  audioFile: File | null;
  genre: string;
  lyrics: string;
}

export default function EpisodeUpload({ type }: { type: "podcast" | "sermon" | "album" }) {
  const [audioCategories, setAudioCategories] = useState<AudioCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAudioCategories = async () => {
    const response = await GET_LIST_AUDIO_CATEGORIES();
    if (response.success) {
      setAudioCategories(response.data.data);
    }
  };

  useEffect(() => {
    getAudioCategories();
  }, []);

  const [podcastData, setPodcastData] = useState({
    title: "",
    description: "",
    genre: "",
    image: null as File | null,
  });

  const [episodes, setEpisodes] = useState<Episode[]>([
    {
      title: "",
      description: "",
      audioFile: null as File | null,
    },
  ]);

  const handlePodcastChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPodcastData({
      ...podcastData,
      [name]: value,
    });
  };

  const handleAudioCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setPodcastData({
      ...podcastData,
      genre: value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPodcastData({
      ...podcastData,
      image: file,
    });
  };

  const handleEpisodeChange = (
    index: number,
    field: keyof Episode,
    value: string | File | null
  ) => {
    setEpisodes(
      episodes.map((episode, i) => (i === index ? { ...episode, [field]: value } : episode))
    );
  };

  const handleAddEpisode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEpisodes([...episodes, { title: "", description: "", audioFile: null }]);
  };

  const handleRemoveEpisode = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    e.preventDefault();
    setEpisodes(episodes.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();

      // Add podcast details as JSON string
      const podcastMetadata = {
        title: podcastData.title,
        description: podcastData.description,
        genre: podcastData.genre,
        type,
      };
      formData.append("podcastMetadata", JSON.stringify(podcastMetadata));

      // Add podcast cover image
      if (podcastData.image) {
        formData.append("coverArt", podcastData.image);
      }

      // Add episodes metadata
      const episodesMetadata = episodes.map((episode) => ({
        title: episode.title,
        description: episode.description,
        genre: episode.genre,
        lyrics: episode.lyrics,
      }));
      formData.append("episodesMetadata", JSON.stringify(episodesMetadata));

      // Add episode audio files with consistent field names
      episodes.forEach((episode) => {
        if (episode.audioFile) {
          formData.append("episodeAudios", episode.audioFile);
        }
      });

      const response = await UPLOAD_EPISODE(formData);

      if (response.success) {
        toast.success(`${type} uploaded successfully!`);
        // Reset form on success
        setPodcastData({
          title: "",
          description: "",
          genre: "",
          image: null,
        });
        setEpisodes([
          {
            title: "",
            description: "",
            audioFile: null,
          },
        ]);
      } else {
        toast.error(response.message || "Failed to upload. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading podcast:", error);
      toast.error("An error occurred while uploading. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gold-900 text-white hover:bg-gold-900/90 capitalize cursor-pointer">
          <Plus className="w-4 h-4 mr-2" />
          New {type}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-gold-900 font-DM-Sans capitalize">
            Upload New {type}
          </DialogTitle>
          <DialogDescription>Fill in the details for your {type}.</DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="flex-1 overflow-y-auto px-[2px] pb-1">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gold-900 capitalize">{type} Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium text-[#000]">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={podcastData.title}
                    onChange={handlePodcastChange}
                    className="w-full p-2 rounded-md bg-[#fff] border border-gold-900/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="genre" className="text-sm font-medium text-[#000]">
                    Genre *
                  </label>
                  <select
                    id="genre"
                    name="genre"
                    value={podcastData.genre}
                    onChange={handleAudioCategoryChange}
                    className="w-full p-2 rounded-md border border-gold-900/20"
                    required>
                    <option value="">Select genre</option>
                    {audioCategories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-[#000]">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={podcastData.description}
                  onChange={handlePodcastChange}
                  rows={4}
                  className="w-full p-2 rounded-md border border-gold-900/20"
                  required></textarea>
              </div>

              <div className="space-y-2">
                <label htmlFor="image" className="text-sm font-medium text-[#000]">
                  Cover Image *
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 rounded-md border border-gold-900/20"
                  required
                />
                {podcastData.image && (
                  <p className="text-sm text-gray-400 mt-1">Selected: {podcastData.image.name}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gold-900">
                {type === "album" ? "Tracks" : "Episodes"}
              </h2>
              <div className="max-h-[40vh] overflow-y-auto pr-2">
                {episodes.map((episode, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gold-900/20 rounded-lg space-y-4 mb-10">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">
                        {type === "album" ? "Tracks" : "Episodes"} {index + 1}
                      </h3>

                      <button
                        type="button"
                        className="bg-red-500/20 text-red-500 px-3 py-1 rounded-md text-sm hover:bg-red-500/30 cursor-pointer"
                        onClick={(e) => handleRemoveEpisode(e, index)}
                        disabled={episodes.length === 1}>
                        Remove
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#000]">
                          {type === "album" ? "Tracks" : "Episodes"} Title *
                        </label>
                        <input
                          type="text"
                          value={episode.title}
                          onChange={(e) => handleEpisodeChange(index, "title", e.target.value)}
                          className="w-full p-2 rounded-md border border-gold-900/20"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#000]">
                          {type === "album" ? "Tracks" : "Episodes"} Description
                        </label>
                        <textarea
                          value={episode.description}
                          onChange={(e) =>
                            handleEpisodeChange(index, "description", e.target.value)
                          }
                          rows={2}
                          className="w-full p-2 rounded-md border border-gold-900/20"></textarea>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#000]">Genre</label>
                        <select
                          className="w-full p-2 rounded-md border border-gold-900/20"
                          onChange={(e) => handleEpisodeChange(index, "genre", e.target.value)}>
                          <option value="">Select genre</option>
                          {audioCategories.map((category) => (
                            <option key={category._id} value={category._id}>
                              {category.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#000]">Lyrics</label>
                        <textarea
                          className="w-full p-2 rounded-md border border-gold-900/20"
                          onChange={(e) => handleEpisodeChange(index, "lyrics", e.target.value)}
                          rows={4}></textarea>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#000]">Audio File *</label>
                        <input
                          type="file"
                          accept="audio/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            handleEpisodeChange(index, "audioFile", file);
                          }}
                          className="block p-2 rounded-md border border-gold-900/20"
                          required={!episode.audioFile}
                        />
                        {episode.audioFile && (
                          <p className="text-sm text-gray-400 mt-1">
                            Selected: {episode.audioFile.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  className="bg-gold-900/20 text-gold-900 px-4 py-2 rounded-md hover:bg-gold-900/30 flex items-center mt-2 cursor-pointer"
                  onClick={handleAddEpisode}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Add Episode
                </button>
              </div>
            </div>

            {/* Sticky footer buttons */}
            <div className="sticky bottom-0 pt-4">
              <Button
                type="submit"
                className="w-full bg-gold-900 text-white py-3 rounded-md hover:bg-gold-900/90 font-medium font-Montserrat text-lg"
                disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  `Upload ${type}`
                )}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
