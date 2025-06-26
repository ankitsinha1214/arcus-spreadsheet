// import { useTranslation } from "react-i18next";
import type { FunctionComponent } from "../common/types";
import { Link } from "@tanstack/react-router";

export const Home = (): FunctionComponent => {
	// const { t, i18n } = useTranslation();

	// const onTranslateButtonClick = async (): Promise<void> => {
	// 	if (i18n.resolvedLanguage === "en") {
	// 		await i18n.changeLanguage("es");
	// 	} else {
	// 		await i18n.changeLanguage("en");
	// 	}
	// };

	return (
		<div className="bg-blue-300 font-bold w-screen h-screen flex flex-col justify-center items-center">
			<p className="text-white text-6xl">Welcome Home</p>
			<Link to="/dashboard">Go to Dashboard</Link>
			{/* <p className="text-white text-6xl">{t("home.greeting")}</p> */}
			{/* <button
				className="hover:cursor-pointer"
				type="submit"
				onClick={onTranslateButtonClick}
			>
				translate
			</button> */}
		</div>
	);
};
