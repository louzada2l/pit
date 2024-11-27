import React, { useState, useEffect } from 'react';
import ReservePage from './ReservePage';

const ParentReservationComponent = () => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [isSubscribed, setIsSubscribed] = useState(false);

    // Carregar produtos do carrinho e status de assinatura ao iniciar
    useEffect(() => {
        // Recupera produtos do carrinho do localStorage
        const cartProducts = JSON.parse(localStorage.getItem('cartProducts') || '[]');
        setSelectedProducts(cartProducts);

        // Verifica se o cartão já foi cadastrado
        const savedSubscription = localStorage.getItem('userSubscription');
        if (savedSubscription) {
            setIsSubscribed(true);
        }
    }, []);

    const handleSubscriptionComplete = (subscriptionData) => {
        // Salva dados da assinatura no localStorage
        localStorage.setItem('userSubscription', JSON.stringify(subscriptionData));
        setIsSubscribed(true);
    };

    const handleReservationComplete = (reservedProducts) => {
        // Salva reserva finalizada
        localStorage.setItem("finalizedReservation", JSON.stringify(reservedProducts));
        
        // Limpa carrinho após finalizar reserva
        localStorage.removeItem('cartProducts');
        setSelectedProducts([]);

        // Aqui você pode adicionar lógica de navegação ou mostrar mensagem de sucesso
        alert("Reserva finalizada com sucesso!");
    };

    return (
        <ReservePage 
            initialProducts={selectedProducts}
            isPreSubscribed={isSubscribed}
            onSubscriptionComplete={handleSubscriptionComplete}
            onReservationComplete={handleReservationComplete}
        />
    );
};

export default ParentReservationComponent;