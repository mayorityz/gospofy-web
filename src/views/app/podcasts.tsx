import axios from "axios";
import { useState } from "react";

interface Episode {
  title: string;
  description: string;
  audioFile: File | null;
}

export default function Podcasts() {
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

    try {
      const formData = new FormData();

      // Add podcast details as JSON string
      const podcastMetadata = {
        title: podcastData.title,
        description: podcastData.description,
        genre: podcastData.genre,
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
      }));
      formData.append("episodesMetadata", JSON.stringify(episodesMetadata));

      // Add episode audio files with consistent field names
      episodes.forEach((episode) => {
        if (episode.audioFile) {
          formData.append("episodeAudios", episode.audioFile);
        }
      });

      console.log("Submitting podcast with episodes:", episodes);

      const response = await axios.post(
        "http://localhost:7890/api/media/upload-episode",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload response:", response);

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
    } catch (error) {
      console.error("Error uploading podcast:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Upload New Podcast</h1>

      <form
        className="bg-[#1A1A1A] p-6 rounded-xl border border-gold-900/20"
        onSubmit={handleSubmit}
        encType="multipart/form-data">
        <div className="space-y-6">
          {/* Podcast Details */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gold-900">Podcast Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium text-gray-200">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={podcastData.title}
                  onChange={handlePodcastChange}
                  className="w-full p-2 rounded-md bg-[#252525] border border-gold-900/20 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="genre" className="text-sm font-medium text-gray-200">
                  Genre *
                </label>
                <select
                  id="genre"
                  name="genre"
                  value={podcastData.genre}
                  onChange={handlePodcastChange}
                  className="w-full p-2 rounded-md bg-[#252525] border border-gold-900/20 text-white"
                  required>
                  <option value="">Select genre</option>
                  <option value="Christianity">Christianity</option>
                  <option value="Bible Study">Bible Study</option>
                  <option value="Worship">Worship</option>
                  <option value="Theology">Theology</option>
                  <option value="Testimonies">Testimonies</option>
                  <option value="Sermons">Sermons</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium text-gray-200">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={podcastData.description}
                onChange={handlePodcastChange}
                rows={4}
                className="w-full p-2 rounded-md bg-[#252525] border border-gold-900/20 text-white"
                required></textarea>
            </div>

            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium text-gray-200">
                Cover Image *
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 rounded-md bg-[#252525] border border-gold-900/20 text-white"
                required
              />
              {podcastData.image && (
                <p className="text-sm text-gray-400 mt-1">Selected: {podcastData.image.name}</p>
              )}
            </div>
          </div>

          {/* Episodes */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gold-900">Episodes</h2>

            {episodes.map((episode, index) => (
              <div
                key={index}
                className="p-4 border border-gold-900/20 rounded-lg bg-[#252525] space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-white">Episode {index + 1}</h3>

                  <button
                    type="button"
                    className="bg-red-500/20 text-red-500 px-3 py-1 rounded-md text-sm hover:bg-red-500/30"
                    onClick={(e) => handleRemoveEpisode(e, index)}
                    disabled={episodes.length === 1}>
                    Remove
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-200">Episode Title *</label>
                    <input
                      type="text"
                      value={episode.title}
                      onChange={(e) => handleEpisodeChange(index, "title", e.target.value)}
                      className="w-full p-2 rounded-md bg-[#1A1A1A] border border-gold-900/20 text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-200">Episode Description</label>
                    <textarea
                      value={episode.description}
                      onChange={(e) => handleEpisodeChange(index, "description", e.target.value)}
                      rows={2}
                      className="w-full p-2 rounded-md bg-[#1A1A1A] border border-gold-900/20 text-white"></textarea>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-200">Audio File *</label>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        handleEpisodeChange(index, "audioFile", file);
                      }}
                      className="w-full p-2 rounded-md bg-[#1A1A1A] border border-gold-900/20 text-white"
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
              className="bg-gold-900/20 text-gold-900 px-4 py-2 rounded-md hover:bg-gold-900/30 flex items-center"
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

        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-gold-900 text-white py-3 rounded-md hover:bg-gold-900/90 font-medium">
            Upload Podcast
          </button>
        </div>
      </form>
    </div>
  );
}
