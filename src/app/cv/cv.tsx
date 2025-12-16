"use client"
import React from "react";
import "../cv/style.css"
import "../cv/cube.css"
import "../cv/animations.css"
import LinkPrint from "@/components/link-print";
import {EnvelopeOpenIcon, LinkedInLogoIcon, BellIcon, DownloadIcon, CopyIcon} from '@radix-ui/react-icons';
import Cube from "./cv-components/Cube";
import Name from "./cv-components/Name";
import Profil from "./cv-components/Profil";


export default function Cv() {
    return (

        <div className="page w-[1000px]" id={"print-zone"}>
            <div className="header-block">
                <Cube />
                <Name />
                <Profil />
            </div>

            <div className="sidebar">
                <div className="competences">
                    <fieldset className="competences-acquises">
                        <legend className="title-comp">Compétences acquises</legend>
                        <ul className="list-comp ">
                            <li>La Base
                                <ul className={" flex justify-center gap-3 mt-0 pt-0"}>
                                    <li>Java</li>
                                    <li>Spring</li>
                                    <li>Kotlin</li>
                                </ul>
                            </li>
                            <fieldset className={"comp-avance border-2"}>
                                <legend className={"text-center font-semibold"}>Avancé</legend>
                                <li className={"text-xl"}>HTML, CSS</li>
                                <li className={'text-xl font-semibold'}>JavaScript TypeScript</li>
                                <li className={"text-xl"}>Prisma, Node.js Zustand</li>
                                <li className={"text-xl font-bold"}>React Next.js Tailwind</li>
                                <li>JQuery Vanilla-JS Vite-React</li>
                                <li className={"text-xl"}><span className={"font-semibold"}>Redux </span>GIT GitHub</li>
                            </fieldset>
                        </ul>
                    </fieldset>
                </div>
                <fieldset className="contacts-border">
                    <legend>Contacts</legend>
                    <address className="contacts">
                        <div className={"flex  items-center gap-2"}>
                            <EnvelopeOpenIcon/>
                            <a
                                className="link-contacts email"
                                href="mailto:topychkanov@hotmail.fr"
                            >Topychkanov@hotmail.fr</a>
                        </div>
                        <div className={"LinkedIn flex  items-center gap-2"}>
                            <LinkedInLogoIcon/>
                            <a className={"link-contacts text-xl"}
                               href="https://www.linkedin.com/in/ivan-topychkanov/"
                               target="_blank"
                            >LinkedIn</a>
                        </div>
                        <div className="flex bg-zinc-200 rounded-3xl items-center gap-2">
                            <BellIcon/>
                            <a className="link-contacts" href="tel:+33638687255"
                            >(+33) 06 38 68 72 55</a>
                        </div>
                        <div className="Download flex  items-center gap-2">
                            <DownloadIcon/>
                            <button 
                                className="link-contacts text-xl cursor-pointer" 
                                onClick={() => window.print()}
                            >Download CV (Print to PDF)</button>
                        </div>
                        <div className="Print flex  items-center gap-2">
                            <CopyIcon/>
                            <LinkPrint/>
                        </div>
                    </address>
                </fieldset>
                <fieldset className={"langues h-fit w-full text-xl"}>
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
                        <li>Online Hold&apos;em poker</li>
                        <li>l&apos;exploration du monde</li>
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
                                <span className="metier">Développeur d&apos;application <br/>
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
                                <li>Management de l&apos;équipe</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className=" item">
                    <div className="card">
                        <div className="card-front">
                            <div className="exp-h4">
                                <h4 className={"font-semibold"}>Assistant stock manager</h4>
                                <h4>2004-2007</h4>
                            </div>
                            <ul className="exp-list">
                                <li>Management de l&apos;équipe</li>
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
                                <h4 className={"font-semibold"}>Déclarant en douane maritime</h4>
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
                                <h4 className={"font-semibold"}>Technicien de maintenance informatique <br/>
                                    et assembleur d&apos;ordinateurs</h4>
                                <h4>1998-1999</h4>
                            </div>
                            <ul className="exp-list">
                                <li>Assemblage d&apos;ordinateur</li>
                                <li>Maintenance de système d&apos;exploitation (Windows, Linux, MacOs)</li>
                                <li>Maintenance de système BIOS</li>
                            </ul>
                        </div>
                        <div className="card-back"><p> Domaine - informatique <br/>
                            <br/><b>Lieu de travail - Saint-Pétersbourg, Russie</b>
                        </p></div>
                    </div>
                </div>

            </div>

            <div className="footer-block">
                <h3 className="font-medium title_education">Éducation</h3>
                <div className="w-full space-y-1 font-semibold education">
                    <p className={"flex justify-between "}>Gestion restauration collective (BAC+2)<span
                        className={"pr-5"}>2019 IFETH, France</span></p>
                    <p className={"flex justify-between "}>Économiste en finance et crédit (Master)<span
                        className={"pr-5"}>2004 Université d’Etat de Russie</span></p>
                    <p className={"flex justify-between "}>Bac Pro Cuisinier – Pâtissier<span className={"pr-5"}>1998 Lycée Professionnelle, Russie</span>
                    </p>
                </div>
            </div>

        </div>

    )
}
