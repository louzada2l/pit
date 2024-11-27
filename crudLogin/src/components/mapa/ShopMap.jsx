import React, { useEffect, useState } from "react";
import axios from "axios";

const ShopMap = () => {
    const [shops, setShops] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchShops = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/shops/by-user", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("storedToken")}`,
                    },
                });
                setShops(response.data); // Certifique-se de que o backend retorna os dados esperados
            } catch (err) {
                console.error("Erro ao obter shops:", err);
                setError("Não foi possível carregar as lojas. Tente novamente.");
            }
        };

        fetchShops();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {shops.length > 0 ? (
                shops.map((shop) => (
                    <div key={shop._id}>
                        <h3>{shop.name}</h3>
                        <p>{shop.address}</p>
                    </div>
                ))
            ) : (
                <p>Nenhuma loja encontrada.</p>
            )}
        </div>
    );
};

export default ShopMap;
