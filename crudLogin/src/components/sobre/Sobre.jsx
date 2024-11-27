import React from 'react'
import Style from './Sobre.module.css'

const Sobre = () => {
  return (
    <>
        <div className='d-flex pb-5'>
            <div className="col-md-8 align-items-center d-grid">
                <h3 className={Style.titleSobre}>Sobre nós</h3>
                <p>A BHNext nasceu com o propósito de conectar pessoas a produtos e experiências locais de maneira prática, inovadora e acessível. Fundada no ambiente visionário do Cotemig, um dos principais centros de tecnologia e inovação de Minas Gerais, nossa empresa combina expertise tecnológica com uma paixão por promover o que há de melhor na cultura e no mercado local.
                    <br /><br /> Somos especialistas em criar uma ponte entre consumidores e fornecedores locais, oferecendo uma plataforma intuitiva e confiável para reservas e aquisições de produtos regionais. Nosso compromisso é impulsionar o comércio local, valorizar os empreendedores da nossa comunidade e proporcionar aos nossos clientes experiências autênticas e de qualidade.
                </p>
            </div>
            <div className="col-md-4"><img width="100%" src="https://compraramilsaude.com.br/wp-content/uploads/2023/06/img-Amil-dental.webp" alt="" /></div>
        </div>
    </>
  )
}

export default Sobre