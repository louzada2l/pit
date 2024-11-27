import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ReservePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const [reservedProducts, setReservedProducts] = useState(
        location.state?.selectedProducts || []
    );

    const handleDelete = (productId) => {
        const updatedProducts = reservedProducts.filter(product => product._id !== productId);
        setReservedProducts(updatedProducts);
    };

    const handleFinalize = () => {
        if (reservedProducts.length === 0) {
            alert("Nenhum produto reservado para finalizar.");
            return;
        }

        localStorage.setItem("finalizedReservation", JSON.stringify(reservedProducts));
        alert("Reserva finalizada com sucesso!");

        navigate('/reservas');
    };

    return (
        <div className="container my-4">
            <h2>Produtos Reservados</h2>
            {reservedProducts.length > 0 ? (
                <div className="row">
                    {reservedProducts.map((product) => (
                        <div className="col-md-4" key={product._id}>
                            <div className="card">
                                <img 
                                    src={`http://localhost:5000/uploads/${product.imageUrl}`} 
                                    alt={product.name} 
                                    className="card-img-top"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">R${product.price}</p>
                                    <button 
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        Remover
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Nenhum produto reservado.</p>
            )}
            {reservedProducts.length > 0 && (
                <button 
                    className="btn btn-success mt-4"
                    onClick={handleFinalize}
                >
                    Finalizar Reserva
                </button>
            )}
        </div>
    );
};

export default ReservePage;
