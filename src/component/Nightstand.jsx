import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Nightstand.css";

const Nightstand = ({ user }) => {
  const [blocks, setBlocks] = useState([]);
  const [newBlock, setNewBlock] = useState({ title: "", description: "", details: { specs: {} }, images: [] });
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [detailData, setDetailData] = useState({ description: "", images: [], specs: {} });
  const [lightboxImg, setLightboxImg] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const blocksPerPage = 5; // ✅ кількість блоків на сторінці

  useEffect(() => { fetchBlocks(); }, []);

  const fetchBlocks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/wardrobe-blocks");
      setBlocks(res.data);
    } catch (err) { console.error("Помилка завантаження блоків:", err); }
  };

  const handleAddBlock = async () => {
    const formData = new FormData();
    formData.append("title", newBlock.title);
    formData.append("description", newBlock.description);
    formData.append("details", JSON.stringify(newBlock.details));
    newBlock.images.forEach(file => formData.append("images", file));

    try {
      await axios.post("http://localhost:5000/wardrobe-blocks", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${user.token}` },
      });
      setNewBlock({ title: "", description: "", details: { specs: {} }, images: [] });
      fetchBlocks();
    } catch (err) { console.error("Помилка при додаванні блоку:", err); }
  };

  const handleAddDetail = async (blockId) => {
    const formData = new FormData();
    formData.append("description", detailData.description);
    formData.append("specs", JSON.stringify(detailData.specs));
    detailData.images.forEach(file => formData.append("images", file));

    try {
      await axios.put(`http://localhost:5000/wardrobe-blocks/${blockId}/details`, formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${user.token}` },
      });
      setDetailData({ description: "", images: [], specs: {} });
      fetchBlocks();
      setSelectedBlockId(null);
    } catch (err) { console.error("Помилка при додаванні деталей:", err); }
  };

  const handleImageChange = e => setNewBlock(prev => ({ ...prev, images: [...prev.images, ...Array.from(e.target.files)] }));
  const handleDetailImagesChange = e => setDetailData(prev => ({ ...prev, images: [...prev.images, ...Array.from(e.target.files)] }));

  // 🔹 логіка пагінації
  const indexOfLastBlock = currentPage * blocksPerPage;
  const indexOfFirstBlock = indexOfLastBlock - blocksPerPage;
  const currentBlocks = blocks.slice(indexOfFirstBlock, indexOfLastBlock);
  const totalPages = Math.ceil(blocks.length / blocksPerPage);

  return (
    <div className="kitchen-container">
      <h2 className="kitchen-title">Наші роботи</h2>

      {/* Форма додавання блоку */}
      {user?.role === "admin" && (
        <div className="add-block-form">
          <input
            type="text"
            placeholder="Назва блоку"
            value={newBlock.title}
            onChange={e => setNewBlock({ ...newBlock, title: e.target.value })}
          />
          <textarea
            placeholder="Опис"
            value={newBlock.description}
            onChange={e => setNewBlock({ ...newBlock, description: e.target.value })}
          />
          <input type="file" multiple onChange={handleImageChange} />
          <button className="btn-add-block" onClick={handleAddBlock}>Додати блок</button>
        </div>
      )}

      {/* Список блоків */}
      <div className="wardrobe-blocks">
        {currentBlocks.map(block => (
          <div key={block.id} className="kitchen-card">
            <h3>{block.title}</h3>
            <p>{block.description}</p>

            {/* Головне фото блоку */}
            {block.images?.[0] && (
              <img
                src={`http://localhost:5000${block.images[0]}`}
                alt="main-block"
                className="main-block-img"
              />
            )}

            {/* Фото деталей у ряд */}
            {block.details?.images?.length > 0 && (
              <div className="details-images-container">
                {block.details.images.map((img, i) => (
                  <img
                    key={i}
                    src={`http://localhost:5000${img}`}
                    alt={`detail-${i}`}
                    className="detail-img"
                    onClick={() => setLightboxImg(`http://localhost:5000${img}`)}
                  />
                ))}
              </div>
            )}

            {block.details?.description && <p>{block.details.description}</p>}

            {/* CTA блок */}
            <div className="order-info">
              <p>Хочете замовити подібне? Телефонуйте:</p>
              <a href="tel:+380XXXXXXXXX" className="order-phone">📞 +380 (67) 715-32-31</a>
            </div>

            {/* Адмінські кнопки */}
            {user?.role === "admin" && (
              <div className="admin-actions">
                <button onClick={() => setSelectedBlockId(block.id)}>Додати деталь</button>
                <button onClick={async () => {
                  if(window.confirm("Видалити цей блок?")){
                    await axios.delete(`http://localhost:5000/wardrobe-blocks/${block.id}`, {
                      headers: { Authorization: `Bearer ${user.token}` }
                    });
                    fetchBlocks();
                  }
                }}>Видалити блок</button>
              </div>
            )}

            {/* Форма додавання деталей */}
            {user?.role === "admin" && selectedBlockId === block.id && (
              <div className="add-detail-form">
                <textarea
                  placeholder="Опис деталі"
                  value={detailData.description}
                  onChange={e => setDetailData({ ...detailData, description: e.target.value })}
                />
                <input type="file" multiple onChange={handleDetailImagesChange} />
                <button onClick={() => handleAddDetail(block.id)}>Додати деталь</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Пагінація */}
      {totalPages > 1 && (
        <div className="pagination">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Лайтбокс для фото */}
      {lightboxImg && (
        <div className="lightbox" onClick={() => setLightboxImg(null)}>
          <img src={lightboxImg} alt="enlarged" />
        </div>
      )}
    </div>
  );
};

export default Nightstand;
