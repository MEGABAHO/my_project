export default function Langues() {
    return (
        <fieldset className={"langues-modern h-fit w-full"}>
            <legend className={"langues-legend text-center"}>Languages</legend>
            <ul className={"langues-list"}>
                <li className={"language-item"}>
                    <div className={"language-flag"}>🇬🇧</div>
                    <div className={"language-content"}>
                        <span className={"language-name"}>English</span>
                        <span className={"language-level"}>Good level</span>
                    </div>
                </li>
                <li className={"language-item"}>
                    <div className={"language-flag"}>🇷🇺</div>
                    <div className={"language-content"}>
                        <span className={"language-name"}>Russian</span>
                        <span className={"language-level"}>Native</span>
                    </div>
                </li>
                <li className={"language-item"}>
                    <div className={"language-flag"}>🇫🇷</div>
                    <div className={"language-content"}>
                        <span className={"language-name"}>French</span>
                        <span className={"language-level"}>Fluent</span>
                    </div>
                </li>
            </ul>
        </fieldset>
    );
}
