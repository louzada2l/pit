import React from 'react'
import Style from './Footer.module.css'
import Instagram from '../instagram/Instagram'

const Footer = () => {
  return (
    <>
        <footer className='bg-black pt-5'>
            <div className="container d-flex">
                <div className='fot col-3'>
                    <div className='logo'>
                        <h2 className='text-white'>BhNext</h2>
                        <p className='text-white'>Startup desenvolvida a fim de ajudar na busca de produtos especificos perto de você</p>
                    </div>
                </div>
                <div className="col-4">
                    <div className={Style.fotList}>
                        <h2 className={Style.titleFot}>Navegação</h2>
                        <ul className='list-unstyled'>
                            <li><a href="/">Início</a></li>
                            <li><a href="">Quem somos</a></li>
                            <li><a href="">Produtos</a></li>
                            <li><a href="">Planos</a></li>
                            <li><a href="">Benefícios</a></li>
                        </ul>
                    </div>
                </div>
                
                <div className='col-4'>
                    <div className={Style.fotList}>
                        <h2 className={Style.titleFot}>Contato</h2>
                        <ul className='list-unstyled'>
                            <li><a href="/contato" className='text-white'>Fale com a gente pelo e-mail</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    </>
  )
}

export default Footer