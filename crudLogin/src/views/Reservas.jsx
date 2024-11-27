import React, { useEffect, useState } from 'react';

const Reservas = () => {
    const [finalizedReservation, setFinalizedReservation] = useState([]);

    useEffect(() => {
        const reservation = localStorage.getItem("finalizedReservation");
        if (reservation) {
            setFinalizedReservation(JSON.parse(reservation));
        }
    }, []);

    return (
        <div className="container my-4">
            <h2>Minha Reserva Finalizada</h2>
            {finalizedReservation.length > 0 ? (
                <div className="row">
                    {finalizedReservation.map((product) => (
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
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Nenhuma reserva finalizada.</p>
            )}
        </div>
    );
};

export default Reservas;
