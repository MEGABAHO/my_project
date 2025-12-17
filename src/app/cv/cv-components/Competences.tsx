export default function Competences() {
    return (
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
    );
}
