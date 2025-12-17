export default function FooterBlock() {
    return (
        <div className="footer-block">
            <h3 className="font-medium title_education">Éducation</h3>
            <div className="w-full space-y-1 font-semibold education">
                <p className={"flex justify-between "}>Gestion restauration collective (BAC+2)<span
                    className={"pr-5"}>2019 IFETH, France</span></p>
                <p className={"flex justify-between "}>Économiste en finance et crédit (Master)<span
                    className={"pr-5"}>2004 Université d&apos;Etat de Russie</span></p>
                <p className={"flex justify-between "}>Bac Pro Cuisinier – Pâtissier<span className={"pr-5"}>1998 Lycée Professionnelle, Russie</span>
                </p>
            </div>
        </div>
    );
}
