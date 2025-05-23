import Hero from "./sections/Hero/Hero.tsx";
import {SEO} from "../../components/SEO.tsx";
import EventList from "./sections/EventList/EventList.tsx";
import {lazy, Suspense} from "react";
import LoadingSpinner from "../../components/LoadingSpinner.tsx";

const AboutUsSection = lazy(() => import('../EventPage/sections/AboutUsSection'));
const ReviewsSection = lazy(() => import('../EventPage/sections/ReviewsSection'));
const ReportsSection = lazy(() => import('../EventPage/sections/ReportsSection'));


const MainPage = () => {
    return (
        <div className='flex flex-col items-center overflow-hidden'>
            <SEO
                title="Главная страница | Бэкстейдж, афиша, концерт, билеты"
                description={"Билеты на лучшие балетные спектакли и симфонические концерты." +
                    "Классическая музыка, премьеры в Вашем городе"}
                keywords="балет, симфонический оркестр, концерты, классическая музыка, билеты, афиша"
            />
            <Hero/>
            <div className='flex flex-col items-center gap-[100px] xl:gap-40'>
                <Suspense fallback={<LoadingSpinner />}><EventList/></Suspense>
                <Suspense fallback={<LoadingSpinner />}><AboutUsSection/></Suspense>
                <section className='flex flex-col gap-[100px] xl:gap-40' id='reviews'>
                    <Suspense fallback={<LoadingSpinner />}><ReportsSection/></Suspense>
                    <Suspense fallback={<LoadingSpinner />}><ReviewsSection/></Suspense>
                </section>
            </div>
        </div>
    );
};

export default MainPage;