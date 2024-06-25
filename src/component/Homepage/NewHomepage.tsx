// src/component/Homepage/NewHomepage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '../../Api/api';
import Game from '../Game/Game';

const NewHomepage: React.FC = () => {
    const navigate = useNavigate();
    const { data: cards, error } = useApi<any>('cards/football');

    const handleThemeSelect = async (theme: string) => {
        navigate(`/game/${theme}`);
    };

    return (
        <div className="theme-button-container">
            <h1>Choisissez un thème </h1>
            <ol>
                <li className="slide-wrapper">
                    <div className="cartes">
                        <img className="photo"
                             src="https://media.ouest-france.fr/v1/pictures/6954ca776eaa28f543f0e9bad7705b2c-22379797.jpg?width=1260&client_id=eds&sign=eca59f7cad666a5d661f704ecdc34f1eb52e4d01f3c65760fa631b290467f7b8"/>
                        <div className="content">
                            <h2>Football</h2>
                            <p>Trouvez toutes les paires sur le thème football</p>
                            <button className="theme1-button" onClick={() => {
                                handleThemeSelect('Theme1');
                            }}>Commençez
                            </button>
                        </div>
                    </div>
                </li>

                <li className="slide-wrapper">
                    <div className="cartes">
                        <img className="photo"
                             src="https://imgr.gameblog.fr/img/news/436165_64be6a5c80cb0.webp?imgeng=/cmpr_10/w_1320/m_letterbox&ver=1"/>
                        <div className="content">
                            <h2>Anime</h2>
                            <p>Trouvez toutes les paires sur le thème animé</p>
                            <button className="theme2-button" onClick={() => {
                                handleThemeSelect('Theme2');
                            }}>Commençez
                            </button>
                        </div>
                    </div>
                </li>

                <li className="slide-wrapper">
                    <div className="cartes">
                        <img className="photo"
                             src="https://blz-contentstack-images.akamaized.net/v3/assets/bltf408a0557f4e4998/bltff4d6ec7afd2e49a/63f695ff583a5b674fbcde69/CODVG_Reveal_Ultimate_Keyart_Textless-Bnet-Launcher_Content_UI_(Phoenix)-1920x1080_01a_FINAL.jpg?imwidth=1088&imdensity=1"/>
                        <div className="content">
                            <h2>Jeux vidéo</h2>
                            <p>Trouvez toutes les paires sur le thème des jeux vidéo</p>
                            <button className="theme3-button" onClick={() => {
                                handleThemeSelect('Theme3');
                            }}>Commençez
                            </button>
                        </div>
                    </div>
                </li>

            </ol>

            {cards.map((card: any, index: number) => (
    <div key={index} className="cards">
        <img src={card.imageUrl} alt={`Cards ${index}`} />
    </div>
))}
        </div>
    );
};

export default NewHomepage;
