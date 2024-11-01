import React from "react";
import "../cv/style.css"
import "../cv/cube.css"
import "../cv/animations.css"
import LinkPrint from "@/components/link-print";


export default function Cv() {
    return (

        <div className="page">
            <div className="header-block">
                <div className="scene">
                    <div className="cube">
                        <div className="cube-part front">1</div>
                        <div className="cube-part back">2</div>
                        <div className="cube-part left">3</div>
                        <div className="cube-part right">4</div>
                        <div className="cube-part bottom">5</div>
                        <div className="cube-part top">6</div>
                    </div>
                </div>
                <div className={"name-wrapper"}>
                    <h1 className={"name name-gredient"}>
                        Ivan Topychkanov
                    </h1>
                </div>
                <div className={"profil"}>
                    <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-sky-300 to-yellow-100 bg-clip-text text-transparent">Profil
                        professionnel:</h2>
                    <p> Actualement en reconversion professionnelle <br/>
                        Je suis en recherche d'un stage Bac +4 <br/>
                        <span className={"font-bold"}>"Développeur d'application Javascript React"</span><br/>
                        et par la suite <br/>
                        "Développeur Full-Stack Bac +5 Java et Angular"
                    </p>
                </div>
            </div>

            <div className="sidebar">
                <div className="competences">
                    <fieldset className="competences-acquises">
                        <legend className="title-comp">Compétences acquises</legend>
                        <ul className="list-comp">
                            <li>La Base
                                <ul>
                                    <li>Java</li>
                                    <li>Spring</li>
                                    <li>Kotlin</li>
                                </ul>
                            </li>
                            <li>HTML</li>
                            <li>CSS</li>
                            <li>Java Script</li>
                            <li>Type Script</li>
                            <li>React</li>
                            <li>JQuery</li>
                            <li>GIT, GitHub</li>
                        </ul>
                    </fieldset>
                </div>
                <fieldset className="contacts-border">
                    <legend>Contacts</legend>
                    <address className="contacts">
                        <div>
                            <a
                                className="link-contacts email"
                                href="mailto:topychkanov@hotmail.fr"
                            ><span className="material-symbols-outlined">Mail</span>
                                Topychkanov@hotmail.fr</a>
                        </div>
                        <div>
                            <a className="link-contacts"
                               href="https://www.facebook.com/profile.php?id=100009857316527&sk=about"
                               target="_blank"
                            ><span className="material-symbols-outlined">Contacts</span>Facebook</a>
                        </div>
                        <div className="pulse">
                            <a className="link-contacts" href="tel:+33638687255"
                            ><span className="material-symbols-outlined">
                            phone</span> +33638687255</a>
                        </div>
                        <div>
                            <a className="link-contacts" href="#" download="CV Ivan Topychkanov"
                            ><span className="material-symbols-outlined">Download</span>Download CV</a
                            >
                        </div>
                        <div>
                            <LinkPrint/>
                        </div>
                    </address>
                </fieldset>
                <fieldset className={"langues h-28 w-24 text-xl"}>
                    <legend className={"text-center"}>Languages</legend>
                    <ul>
                        <p>English - good level</p>
                        <p>Russian - native</p>
                        <p>French - fluent</p>
                    </ul>
                </fieldset>
                <div className="hobbies">
                    <h4>Hobbies</h4>
                    <ul>
                        <li>IT industrie et technologies</li>
                        <li>Cuisine du monde</li>
                        <li>Online Holdem poker</li>
                        <li>l'exploration du monde</li>
                        <li>Développement personnel</li>
                        <li>Sport et restauration</li>
                    </ul>
                </div>
            </div>


            <div className="experiences overflow-hidden">
                <h3>Expérience professionnelle</h3>
                <div className=" item ">
                    <div className="card">
                        <div className="card-front">
                            <h4>Actuellement en reconversion professionnelle vers Bac +4 <br/>
                                <span className="metier">Développeur d'application <br/>
                            Full-Stack</span></h4>
                            <h4>2024-actuelle</h4>
                        </div>
                        <div className="card-back">
                            <div className="exp-h4">
                                <h4>Cuisinier</h4>
                                <h4>2009-2024</h4>
                            </div>
                            <ul className="exp-list">
                                <li>Préparations culinaires</li>
                                <li>Gestion de stock</li>
                                <li>Gestion des commandes</li>
                                <li>Management de l'équipe</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className=" item">
                    <div className="card">
                        <div className="card-front">
                            <div className="exp-h4">
                                <h4>Assistant stock manager</h4>
                                <h4>2004-2007</h4>
                            </div>
                            <ul className="exp-list">
                                <li>Management de l'équipe</li>
                                <li>Analyse et prévision des ventes</li>
                                <li>Gestion des commandes</li>
                                <li>Gestion de base de données</li>
                            </ul>
                        </div>
                        <div className="card-back"><p>Domaine - transport et logistique <br/>
                            <br/><b>Lieu de travail - Saint-Pétersbourg, Russie</b></p></div>
                    </div>
                </div>
                <div className=" item">
                    <div className="card">
                        <div className="card-front">
                            <div className="exp-h4">
                                <h4>Déclarant en douane maritime</h4>
                                <h4>2000-2003</h4>
                            </div>
                            <ul className="exp-list">
                                <li>Création et suivi des dossiers des clients</li>
                                <li>Classification des codes de douane</li>
                                <li>Elaboration de déclaration et dédouanement</li>
                            </ul>
                        </div>
                        <div className="card-back"><p>Domaine - transport et logistique, douane <br/>
                            <br/><b>Lieu de travail - Saint-Pétersbourg, Russie</b></p></div>
                    </div>
                </div>
                <div className="item">
                    <div className="card">
                        <div className="card-front">
                            <div className="exp-h4">
                                <h4>Technicien de maintenance informatique <br/>
                                    et assembleur d'ordinateurs</h4>
                                <h4>1998-1999</h4>
                            </div>
                            <ul className="exp-list">
                                <li>Assemblage d'ordinateur</li>
                                <li>Maintenance de système d'exploitation (Windows, Linux, MacOs)</li>
                                <li>Maintenance de système BIOS</li>
                            </ul>
                        </div>
                        <div className="card-back"><p> Domaine - informatique <br/>
                            <br/><b>Lieu de travail - Saint-Pétersbourg, Russie</b>
                        </p></div>
                    </div>
                </div>
                <div className=" item ">
                    <div className="card">
                        <div className="card-front">

                        </div>
                        <div className="card-back">

                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-block">
                <h3 className="title_education">Éducation</h3>
                <div className=" font-light h-2.5 education">
                    Gestion restauration collective (BAC+2) 2019 IFETH, France <br/>
                    Économiste en finance et crédit (Master) 2004 Université d’Etat de Russie <br/>
                    Bac Pro Cuisinier – Pâtissier 1998 Lycée Professionnelle, Russie
                </div>
            </div>

        </div>

    )
}
