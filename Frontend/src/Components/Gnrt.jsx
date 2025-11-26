import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import ProfileDropdown from "./ProfileDropdown";
import { BACKEND_URL } from "../config";
import logo1 from "../assets/logo1.png";

const API_BASE_URL = `${BACKEND_URL}`;

function Gnrt() {
  const location = useLocation();
  const navigate = useNavigate();

  // FIXED: token added here
  const { user, isAuthenticated, token } = useSelector((state) => state.auth);

  const prefilledPrompt = location.state?.prompt || "";
  const [prompt, setPrompt] = useState(prefilledPrompt);
  const [style, setStyle] = useState("Photorealistic");
  const [size, setSize] = useState("512");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState("");

  const handleGenerate = async (e) => {
    e?.preventDefault();
    setError("");

    if (!isAuthenticated) {
      toast.error("You must be logged in to generate images.");
      navigate("/login?compact=true");
      return;
    }

    if (!prompt || prompt.trim().length < 3) {
      toast.error("Please enter a prompt (at least 3 characters).");
      return;
    }

    try {
      setLoading(true);

      const basePrompt = prompt.trim();
      const finalPrompt = `${basePrompt}, style: ${style}, size: ${size}`;

      // FIXED: Add Authorization header if token exists
      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(`${API_BASE_URL}/api/image/generate`, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify({
          prompt: finalPrompt,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error("Image generation failed. Please try again.");
        console.error("Image generation error:", data);
        setError(
          data?.error ||
            data?.details?.error?.message ||
            "Something went wrong"
        );
        return;
      }

      toast.success("Image generated successfully!");

      if (!data?.imageUrl) {
        console.error("No imageUrl in response:", data);
        toast.error("No image returned from server.");
        return;
      }

      const item = {
        id: Date.now(),
        prompt: basePrompt,
        style,
        size: parseInt(size, 10),
        url: data.imageUrl,
        model: data.model,
        createdAt: new Date().toISOString(),
      };

      setImages((prev) => [item, ...prev]);
      setSelected(item);
    } catch (err) {
      console.error("Request failed:", err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (image) => {
    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `imagen-${image.id}.png`;
      document.body.appendChild(a);
      a.click();

      a.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error while downloading image:", error);
      toast.error("Failed to download image.");
    }
  };

  const handleCopyPrompt = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Prompt copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy prompt");
    }
  };

  const sidebarItems = [
    {
      to: "/",
      label: "Home",
      icon: (
        <svg
          className="w-5 h-5 inline-block mr-2"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V11.5z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },
    {
      to: "/prompt",
      label: "Prompt",
      icon: (
        <svg className="w-5 h-5 inline-block mr-2" viewBox="0 0 24 24">
          <path
            d="M12 3v18M3 12h18"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },
    {
      to: "/gallery",
      label: "Gallery",
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      ),
    },
    {
      to: "/about",
      label: "About",
      icon: (
        <svg className="w-5 h-5 inline-block mr-2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
          <path
            d="M12 16v-4M12 8h.01"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* TOP BAR */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-6">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo1}
            alt="Logo"
            className="w-28 h-10 sm:w-32 sm:h-12 ml-2 sm:ml-8 object-contain"
          />
        </Link>

        <div className="p-2 sm:p-4">
          <div className="flex items-center">
            {isAuthenticated ? (
              <ProfileDropdown user={user} />
            ) : (
              <Link
                to="/login"
                className="ml-2 sm:ml-4 px-4 sm:px-6 py-2 sm:py-2.5 bg-linear-to-r from-cyan-500 to-purple-600 text-white rounded-lg font-semibold hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 text-sm sm:text-base"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="border-b border-gray-600"></div>

      {/* LAYOUT */}
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-35 bg-linear-to-b from-black to-gray-950 border-r border-gray-600 min-h-screen hidden lg:block">
          <div className="p-6">
            <nav className="flex flex-col gap-1">
              {sidebarItems.map((it) => (
                <Link
                  key={it.to}
                  to={it.to}
                  className="flex items-center px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  <span>{it.icon}</span>
                  <span>{it.label}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-6 border-t border-gray-800 pt-4">
              <h3 className="text-xs text-gray-400 uppercase mb-2">
                Collections
              </h3>
              <ul className="text-sm text-gray-300 space-y-2">
                <Link to="/gallery">
                  <li className="px-3 py-2 rounded-md hover:bg-gray-800 cursor-pointer">
                    Favorites
                  </li>
                </Link>
                <Link to="/gallery">
                  <li className="px-3 py-2 rounded-md hover:bg-gray-800 cursor-pointer">
                    Recent
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <div className="flex-1 flex justify-center min-h-screen bg-linear-to-b from-black to-gray-950 text-white py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto w-full">
            <header className="mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                Generate Image
              </h1>
            </header>

            <div className="grid gap-5 lg:grid-cols-3">
              {/* LEFT FORM */}
              <form
                className="lg:col-span-1 bg-gray-900 p-4 sm:p-6 rounded-lg shadow"
                onSubmit={handleGenerate}
              >
                <label className="block text-sm font-medium text-gray-300">
                  Prompt*
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={5}
                  placeholder="A serene landscape..."
                  className="mt-2 w-full bg-gray-900 text-white rounded-md p-3 border border-gray-600"
                />

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Style*
                    </label>
                    <select
                      value={style}
                      onChange={(e) => setStyle(e.target.value)}
                      className="mt-2 w-full bg-gray-700 text-white rounded-md p-2 border border-gray-600"
                    >
                      <option>Photorealistic</option>
                      <option>Illustration</option>
                      <option>Ghibli</option>
                      <option>Oil Painting</option>
                      <option>Sketch</option>
                      <option>Fantasy</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Size
                    </label>
                    <select
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      className="mt-2 w-full bg-gray-700 text-white rounded-md p-2 border border-gray-600"
                    >
                      <option value="256">Portrait</option>
                      <option value="512">Square</option>
                      <option value="768">Landscape</option>
                    </select>
                  </div>
                </div>

                {error && <p className="text-red-400 mt-3">{error}</p>}

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-4 py-2 rounded-md font-semibold ${
                      loading
                        ? "bg-gray-600"
                        : "bg-linear-to-r from-cyan-600 to-purple-600 shadow-lg hover:brightness-125"
                    }`}
                  >
                    {loading ? "Generating..." : "Generate"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPrompt("");
                      setError("");
                    }}
                    className="px-3 py-2 rounded-md bg-gray-700 border border-gray-600"
                  >
                    Clear
                  </button>
                </div>
              </form>

              {/* PREVIEW */}
              <div className="lg:col-span-2 mt-5 lg:mt-0">
                <div className="bg-gray-900 p-4 sm:p-6 rounded-lg shadow min-h-[360px] flex flex-col">
                  <div className="flex flex-col sm:flex-row justify-between">
                    <h2 className="text-lg font-semibold">Preview</h2>
                    <div className="text-xs text-gray-400">
                      {selected ? new Date(selected.createdAt).toLocaleString() : ""}
                    </div>
                  </div>

                  <div className="mt-4 flex-1 flex items-center justify-center border-2 border-dashed border-gray-700 rounded-md overflow-hidden bg-gray-900">
                    {selected ? (
                      <div className="w-full flex flex-col items-center p-4">
                        <img
                          src={selected.url}
                          alt={selected.prompt}
                          className="max-w-full max-h-[520px] object-contain rounded"
                        />

                        <div className="w-full flex justify-between mt-3">
                          <div className="text-sm text-gray-300">{selected.prompt}</div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleCopyPrompt(selected.prompt)}
                              className="px-3 py-1 bg-gray-700 rounded text-sm"
                            >
                              Copy
                            </button>
                            <button
                              onClick={() => handleDownload(selected)}
                              className="px-3 py-1 bg-linear-to-r from-cyan-600 to-purple-600 rounded text-sm"
                            >
                              Download
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-500">No image yet — generate one.</div>
                    )}
                  </div>

                  {/* HISTORY */}
                  <div className="mt-6">
                    <h3 className="text-sm text-gray-300 mb-3">History</h3>

                    {images.length === 0 ? (
                      <div className="text-gray-500 text-sm">
                        No generated images yet.
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {images.map((img) => (
                          <button
                            key={img.id}
                            onClick={() => setSelected(img)}
                            className={`rounded overflow-hidden border ${
                              selected?.id === img.id
                                ? "ring-2 ring-purple-500"
                                : "border-gray-700"
                            }`}
                          >
                            <img
                              src={img.url}
                              alt={img.prompt}
                              className="w-full h-20 sm:h-24 object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* END CENTER */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Gnrt;
