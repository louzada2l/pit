// src/components/ProductCard.jsx
import React from "react";
import Style from "./ProductCard.module.css"

const ProductCard = ({ product, onSelect }) => {
    return (
        <div className="product-card card p-3">
            <div className="product-imagem text-center mb-3">
                {product.imageUrl ? (
                    <img src={`http://localhost:5000/uploads/${product.imageUrl}`} alt={product.name} className="img-fluid" />
                ) : (
                    <p>Imagem não disponível</p>
                )}
            </div>
            <h5 className={Style.titleCard}>{product.name}</h5>
            <p className={Style.descricaoCard}>{product.description}</p>
            <p className={Style.valorCard}>R$<span>{product.price}</span></p>
            <button 
                onClick={() => onSelect(product._id)} 
                className="btn btn-outline-primary mt-2"
            >
                Selecionar
            </button>
        </div>
    );
};

export default ProductCard;