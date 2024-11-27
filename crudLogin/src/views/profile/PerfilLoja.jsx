import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api'; // Para renderizar o Google Map

const ShopProfile = () => {
  const [shop, setShop] = useState(null);
  const [error, setError] = useState('');

  // Função para buscar os dados da loja
  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const token = localStorage.getItem("storedToken");
        const response = await axios.get("http://localhost:5000/api/shops/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.status === 200) {
          setShop(response.data);
        }
      } catch (err) {
        console.error("Erro no fetch: ", err.response ? err.response.data : err);
        setError("Erro ao carregar perfil da loja.");
      }
    };
  
    fetchShopData();
  }, []);
  

  return (
    <div className="container mt-4">
      <h1>Perfil da Loja</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      
      {shop ? (
        <div>
          <h2>{shop.name}</h2>
          <p><strong>Endereço:</strong> {shop.address}</p>
          <p><strong>CEP:</strong> {shop.cep}</p>
          <p><strong>Latitude:</strong> {shop.latitude}</p>
          <p><strong>Longitude:</strong> {shop.longitude}</p>

          <div className="mb-3">
            <strong>Logo da Loja</strong>
            <img src={`http://localhost:5000/uploads/logos/${shop.logo}`} alt="Logo da Loja" width="200" />
          </div>

          <div>
            <strong>Localização no Mapa</strong>
            {shop.latitude && shop.longitude && (
              <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                  mapContainerStyle={{ height: "300px", width: "100%" }}
                  center={{ lat: shop.latitude, lng: shop.longitude }}
                  zoom={15}
                >
                  <Marker position={{ lat: shop.latitude, lng: shop.longitude }} />
                </GoogleMap>
              </LoadScript>
            )}
          </div>
        </div>
      ) : (
        <p>Carregando dados da loja...</p>
      )}
    </div>
  );
};

export default ShopProfile;
