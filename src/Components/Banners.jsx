import React, { useEffect, useState } from "react";
import axios from "axios";

function Banners() {
  const apiUrl = "https://api.fruteacorp.uz/banner";
  const imageUrl = "https://api.fruteacorp.uz/images";
  const [banners, setBanners] = useState([]);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedLink, setUpdatedLink] = useState("");
  const [updatedImage, setUpdatedImage] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(apiUrl);
        if (response.data.success) setBanners(response.data.data);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };
    fetchBanners();
  }, []);

  const handleUpdate = async () => {
    if (!selectedBanner) return alert("Iltimos, banner tanlang!");

    const formData = new FormData();
    formData.append("title", updatedTitle);
    formData.append("link", updatedLink);
    if (updatedImage) formData.append("image", updatedImage);

    const token = localStorage.getItem("token");

    try {
      await axios.patch(`${apiUrl}/${selectedBanner.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": token ? `Bearer ${token}` : "",
        },
      });
      alert("Banner muvaffaqiyatli yangilandi!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating banner:", error.response?.data || error.message);
      alert("Bannerni yangilashda xatolik yuz berdi.");
    }
  };

  const handleDelete = async () => {
    if (!selectedBanner) return alert("Iltimos, banner tanlang!");

    const token = localStorage.getItem("token");

    if (!window.confirm("Haqiqatan ham ushbu bannerni o'chirmoqchimisiz?")) {
      return;
    }

    try {
      await axios.delete(`${apiUrl}/${selectedBanner.id}`, {
        headers: {
          "Authorization": token ? `Bearer ${token}` : "",
        },
      });
      alert("Banner muvaffaqiyatli o'chirildi!");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting banner:", error.response?.data || error.message);
      alert("Bannerni o‘chirishda xatolik yuz berdi.");
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold text-center mb-4">Banners</h2>
      {selectedBanner && (
        <div className="mt-5 p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Bannerni Yangilash</h3>
          <input type="text" placeholder="Title" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
          <input type="text" placeholder="Link" value={updatedLink} onChange={(e) => setUpdatedLink(e.target.value)} className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
          <input type="file" onChange={(e) => setUpdatedImage(e.target.files[0])} className="w-full p-3 mb-3 border border-gray-300 rounded-md cursor-pointer" />
          <button onClick={handleUpdate} className="w-full py-3 bg-green-500 text-white rounded-md font-semibold hover:bg-green-600 transition">Yangilash</button>
          <button onClick={handleDelete} className="w-full mt-2 py-3 bg-red-500 text-white rounded-md font-semibold hover:bg-red-600 transition">O‘chirish</button>
        </div>
      )}
      <div className="flex flex-wrap gap-5 justify-center mt-5">
        {banners.map((banner) => (
          <div key={banner.id} onClick={() => { setSelectedBanner(banner); setUpdatedTitle(banner.title); setUpdatedLink(banner.link); }} className={`p-4 border rounded-lg shadow-md cursor-pointer transition ${selectedBanner?.id === banner.id ? "bg-gray-100" : "bg-white"}`}>
            <h3 className="font-semibold">{banner.title}</h3>
            <img src={`${imageUrl}/${banner.image}`} alt={banner.title} className="w-52 h-auto rounded-md" />
            <p>
              <a href={banner.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Batafsil</a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Banners;
