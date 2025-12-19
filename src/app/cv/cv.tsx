"use client"
import React, { useRef } from "react";
import "../cv/style.css"
import "../cv/cube.css"
import "../cv/animations.css"
import Cube from "./cv-components/Cube";
import Name from "./cv-components/Name";
import Profil from "./cv-components/Profil";
import Competences from "./cv-components/Competences";
import Contacts from "./cv-components/Contacts";
import Langues from "./cv-components/Langues";
import Hobbies from "./cv-components/Hobbies";
import ExperienceCard1 from "./cv-components/ExperienceCard1";
import ExperienceCard2 from "./cv-components/ExperienceCard2";
import ExperienceCard3 from "./cv-components/ExperienceCard3";
import ExperienceCard4 from "./cv-components/ExperienceCard4";
import FooterBlock from "./cv-components/FooterBlock";


export default function Cv() {
    const printRef = useRef<HTMLDivElement>(null);

    return (

        <div className="page w-[1000px]" id={"print-zone"} ref={printRef}>
            <div className="header-block">
                <Cube/>
                <Name/>
                <Profil/>
            </div>

            <div className="sidebar">
                <Competences/>
                <Contacts printRef={printRef}/>
                <Langues/>
                <Hobbies/>
            </div>

            <div className="experiences overflow-hidden">
                <h3>Expérience professionnelle</h3>
                <ExperienceCard1/>
                <ExperienceCard2/>
                <ExperienceCard3/>
                <ExperienceCard4/>
            </div>
            <FooterBlock/>
        </div>

    )
}
