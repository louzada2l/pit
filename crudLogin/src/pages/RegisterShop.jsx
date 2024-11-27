import React, { useState } from "react";
import axios from "axios";
import Map from "../components/mapa/ShopMap"; // Importando o componente Map

const RegisterShop = () => {
  const [name, setName] = useState(""); // Nome da loja
  const [cep, setCep] = useState(""); // CEP
  const [address, setAddress] = useState(""); // Endereço retornado pelo CEP
  const [number, setNumber] = useState(""); // Número da loja
  const [logo, setLogo] = useState(null); // Logo da loja
  const [latitude, setLatitude] = useState(null); // Latitude da localização
  const [longitude, setLongitude] = useState(null); // Longitude da localização
  const [error, setError] = useState(""); // Mensagens de erro
  const [success, setSuccess] = useState(""); // Mensagens de sucesso

  const handleCepChange = async (e) => {
    const inputCep = e.target.value.replace(/\D/g, "");
    setCep(inputCep);
  
    if (inputCep.length === 8) {
      try {
        console.log("Buscando CEP...");
        const response = await axios.get(`https://viacep.com.br/ws/${inputCep}/json/`);
        console.log("Resposta do ViaCEP:", response.data);
  
        if (response.data.erro) {
          setError("CEP inválido.");
          setAddress("");
          return;
        }
  
        const { logradouro, bairro, localidade, uf } = response.data;
  
        // Validação para restringir endereço a Belo Horizonte - MG
        if (localidade.toLowerCase() !== "belo horizonte" || uf.toLowerCase() !== "mg") {
          setError("Endereço inválido. Só atendemos Belo Horizonte - MG.");
          setAddress("");
          return;
        }
  
        setError(""); // Remove mensagens de erro anteriores
        setAddress(`${logradouro}, ${bairro}`);
  
        // Obtendo coordenadas do endereço via Google Maps
        console.log("Buscando coordenadas...");
        const geoResponse = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${logradouro}, ${bairro}, Belo Horizonte, MG&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
        );
        console.log("Resposta do Google Maps:", geoResponse.data);
  
        if (geoResponse.data.status === "OK") {
          const { lat, lng } = geoResponse.data.results[0].geometry.location;
          setLatitude(lat);
          setLongitude(lng);
        } else {
          setError("Não foi possível obter as coordenadas do endereço.");
        }
      } catch (err) {
        console.error("Erro ao buscar CEP:", err);
        setError("Erro ao buscar CEP. Verifique a conexão.");
      }
    } else if (inputCep.length < 8) {
      setAddress("");
      setError("");
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!address || !number || !latitude || !longitude) {
      setError("Todos os campos devem ser preenchidos.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("cep", cep);
      formData.append("address", `${address}, ${number}`);
      formData.append("logo", logo);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);

      const token = localStorage.getItem("storedToken");
      const response = await axios.post("http://localhost:5000/api/shops/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setSuccess("Loja cadastrada com sucesso!");
        setName("");
        setCep("");
        setAddress("");
        setNumber("");
        setLogo(null);
        setLatitude(null);
        setLongitude(null);
      }
    } catch (err) {
      console.error("Erro ao registrar loja:", err);
      setError("Erro ao registrar a loja. Tente novamente.");
    }
  };

  return (
    <div className="container mt-4">
      <h1>Registrar Loja</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nome da Loja</label>
          <input type="text" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cep" className="form-label">CEP</label>
          <input type="text" id="cep" className="form-control" value={cep} onChange={handleCepChange} maxLength="8" placeholder="Digite o CEP (somente números)" required />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Endereço</label>
          <input type="text" id="address" className="form-control" value={address} disabled required />
        </div>
        <div className="mb-3">
          <label htmlFor="number" className="form-label">Número</label>
          <input type="text" id="number" className="form-control" value={number} onChange={(e) => setNumber(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="logo" className="form-label">Logo</label>
          <input type="file" id="logo" className="form-control" onChange={(e) => setLogo(e.target.files[0])} required />
        </div>

        {latitude && longitude && <Map latitude={latitude} longitude={longitude} />}

        <button type="submit" className="btn btn-primary">Registrar Loja</button>
      </form>
    </div>
  );
};

export default RegisterShop;
