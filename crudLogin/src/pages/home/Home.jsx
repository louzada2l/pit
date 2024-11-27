import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ProductCard from "../../components/card/ProductCard";
import InstagramEmbed from '../../components/instagram/Instagram';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Footer from "../../components/footer/Footer";
import Sobre from "../../components/sobre/Sobre";
import Shopmap from "../../components/mapa/ShopMap";

const Home = () => {
    const { userName, userRole, isLoading: authLoading } = useContext(AuthContext); // Obtém as informações do usuário
    const [products, setProducts] = useState([]); // Estado para armazenar os produtos
    const [selectedProducts, setSelectedProducts] = useState([]); // Produtos selecionados
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const [error, setError] = useState(null); // Estado de erro
    const [searchTerm, setSearchTerm] = useState(""); // Estado do termo de busca
    const [shopId, setShopId] = useState(null); // Estado para armazenar o shopId
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("storedToken");

        if (!token) {
            navigate("/login");
            return;
        }

        // Faz a requisição para obter os produtos
        axios
            .get("http://localhost:5000/api/products", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Erro ao carregar produtos:", error.response?.data || error.message);
                if (error.response && error.response.status === 401) {
                    setError("Token inválido ou expirado. Por favor, faça login novamente.");
                    localStorage.removeItem("storedToken");
                    setTimeout(() => {
                        navigate("/login");
                    }, 2000);
                } else {
                    setError(error.response?.data?.message || "Erro ao carregar os produtos.");
                }
            })
            .finally(() => {
                setLoading(false);
            });

        // Recuperar o shopId de algum lugar, por exemplo, do contexto ou de uma requisição para a API
        if (userRole === "admin") {
            // Exemplo de como obter shopId (supondo que o shopId seja associado ao userRole)
            axios.get(`http://localhost:5000/api/shops/by-user/${userName}`) // Adapte conforme sua API
                .then(response => {
                    setShopId(response.data.shopId);
                })
                .catch(error => {
                    console.error("Erro ao obter shopId:", error);
                    setError("Erro ao carregar informações da loja.");
                });
        }
    }, [navigate, userName, userRole]);

    useEffect(() => {
        localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
    }, [selectedProducts]);

    const handleSelectProduct = (product) => {
        setSelectedProducts((prevSelected) =>
            prevSelected.some((p) => p._id === product._id)
                ? prevSelected.filter((p) => p._id !== product._id)
                : [...prevSelected, product]
        );
    };

    const handleReserve = () => {
        navigate("/reserve", { state: { selectedProducts } });
    };

    const filteredProducts = products.filter((product) => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Shopmap shopId={shopId} /> {/* Passando o shopId para o componente Shopmap */}
            <div className="container">
                <Sobre />

                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar produtos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {loading ? (
                    <p>Carregando produtos...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <>
                        <div className="row">
                            {filteredProducts.map((product) => (
                                <div className="col-md-3" key={product._id}>
                                    <ProductCard
                                        product={product}
                                        isSelected={selectedProducts.some((p) => p._id === product._id)}
                                        onSelect={() => handleSelectProduct(product)}
                                    />
                                </div>
                            ))}
                        </div>
                        {selectedProducts.length > 0 && (
                            <button onClick={handleReserve}>
                                Reservar Produtos
                            </button>
                        )}
                    </>
                )}
                <InstagramEmbed />
            </div>
            <Footer />
        </>
    );
};

export default Home;
