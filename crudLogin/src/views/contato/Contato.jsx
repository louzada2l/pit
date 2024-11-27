import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { FaUser, FaEnvelope, FaCommentAlt } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

function Contato() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        mensagem: '',
        avaliacao: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const serviceId = 'service_yuz6dtu';
        const templateId = 'template_z5r5rci';
        const publicKey = '9TpRS-31x5DKCZYQo';

        const templateParams = {
            from_name: formData.nome,
            from_email: formData.email,
            message: formData.mensagem,
            rating: formData.avaliacao
        };

        emailjs
            .send(serviceId, templateId, templateParams, publicKey)
            .then((response) => {
                console.log('Email enviado com sucesso!', response.status, response.text);
                alert('Obrigado pelo seu feedback!');
                setFormData({ nome: '', email: '', mensagem: '', avaliacao: '' });
            })
            .catch((error) => {
                console.error('Erro ao enviar email:', error);
                alert('Desculpe, houve um erro ao enviar o feedback.');
            });
    };

    return (
        <div className="container py-5">
            <h1 className="text-center mb-4">Envie seu Feedback</h1>
            <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="nome" className="form-label">
                        <FaUser className="me-2" /> Nome Completo
                    </label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        className="form-control"
                        value={formData.nome}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="email" className="form-label">
                        <FaEnvelope className="me-2" /> Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="col-12">
                    <label htmlFor="mensagem" className="form-label">
                        <FaCommentAlt className="me-2" /> Mensagem
                    </label>
                    <textarea
                        id="mensagem"
                        name="mensagem"
                        rows="4"
                        className="form-control"
                        value={formData.mensagem}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>
                <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary px-4">
                        Enviar Feedback
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Contato;
