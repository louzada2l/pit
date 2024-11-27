import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const EditClientProfile = () => {
    const [clientData, setClientData] = useState({
        name: "",
        birthDate: "",
        profilePicture: null,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Carregar dados do cliente
    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/user/profile", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("storedToken")}`,
                    },
                });
                setClientData(response.data);
            } catch (err) {
                setError("Erro ao carregar os dados do cliente.");
            }
        };

        fetchClientData();
    }, []);

    // Função para manipular o envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", clientData.name);
        formData.append("birthDate", clientData.birthDate);
        if (clientData.profilePicture) {
            formData.append("profilePicture", clientData.profilePicture);
        }

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.put("http://localhost:5000/api/user/update-profile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("storedToken")}`,
                },
            });

            setSuccess("Perfil atualizado com sucesso!");
            setLoading(false);
            setClientData(response.data);
        } catch (err) {
            setError("Erro ao atualizar perfil.");
            setLoading(false);
        }
    };

    // Função para atualizar dados no estado
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "profilePicture") {
            setClientData({
                ...clientData,
                profilePicture: files[0],
            });
        } else {
            setClientData({
                ...clientData,
                [name]: value,
            });
        }
    };

    return (
        <div className="container">
            <h2>Editar Perfil</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={clientData.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="birthDate">
                    <Form.Label>Data de Nascimento</Form.Label>
                    <Form.Control
                        type="date"
                        name="birthDate"
                        value={clientData.birthDate}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="profilePicture">
                    <Form.Label>Foto de Perfil</Form.Label>
                    <Form.Control
                        type="file"
                        name="profilePicture"
                        onChange={handleChange}
                        accept="image/*"
                    />
                    {clientData.profilePicture && (
                        <div className="mt-3">
                            <img
                                src={URL.createObjectURL(clientData.profilePicture)}
                                alt="Preview"
                                width="100"
                                height="100"
                                className="rounded-circle"
                            />
                        </div>
                    )}
                </Form.Group>

                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? "Carregando..." : "Atualizar Perfil"}
                </Button>
            </Form>
        </div>
    );
};

export default EditClientProfile;
