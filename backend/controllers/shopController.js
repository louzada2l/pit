const axios = require("axios");
const Shop = require("../models/Shop");

const registerShop = async (req, res) => {
    const { name, address } = req.body;

    // Validação de entrada
    if (!name || !address || !req.file) {
        return res.status(400).json({ message: "Nome, endereço e logo são obrigatórios." });
    }

    try {
        // Criação da nova loja
        const newShop = new Shop({
            name,
            address,
            logo: req.file.path,
        });

        await newShop.save();
        res.status(201).json(newShop);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao registrar loja. Tente novamente." });
    }
};

const getShops = async (req, res) => {
    try {
        const shops = await Shop.find(); 
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;

        // Validação se a chave da API está configurada
        if (!apiKey) {
            return res.status(500).json({ message: "A chave da API do Google Maps não está configurada." });
        }

        const shopsWithCoords = await Promise.all(
            shops.map(async (shop) => {
                if (!shop.latitude || !shop.longitude) {
                    try {
                        // Fazendo a requisição para obter as coordenadas do Google Maps
                        const response = await axios.get(
                            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(shop.address)}&key=${apiKey}`
                        );

                        const location = response.data.results[0]?.geometry.location;

                        if (location) {
                            shop.latitude = location.lat;
                            shop.longitude = location.lng;
                            await shop.save();
                        } else {
                            console.warn(`Não foi possível encontrar coordenadas para a loja: ${shop.name}`);
                        }
                    } catch (error) {
                        console.error(`Erro ao obter coordenadas para ${shop.name}:`, error);
                    }
                }
                return shop;
            })
        );

        return res.status(200).json(shopsWithCoords);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Erro ao obter lojas. Tente novamente." });
    }
};

module.exports = {
    registerShop,
    getShops,
};
