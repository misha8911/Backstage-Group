import Text, {TextVariant} from "../../../components/Text.tsx";
import TicketButton from "../../../components/Buttons/TicketButton.tsx";
import {useMediaBreakpoint} from "../../../hooks/useMediaBreakpoint.ts";
import defaultPoster from '/public/images/default_poster.png'

interface InformationProps {
    description: string;
    eventId: number;
    poster?: string;
}

const Information = ({description, eventId, poster}: InformationProps) => {
    const md = useMediaBreakpoint('md')
    return (
        <section className='flex flex-col gap-10 xl:gap-[50px]' id='description'>
            <Text className='leading-none flex flex-col xl:flex-row xl:gap-3' variant={TextVariant.H2}>
                <p className='text-light-brown'>ОПИСАНИЕ</p>
                <p>ПРОГРАММЫ</p>
            </Text>
            <div className='xl:flex md:grid grid-cols-2 gap-[108px] xl:gap-[60px]'>
                <div className='flex flex-col gap-10 justify-between'>
                    <Text className='whitespace-pre-wrap' variant={TextVariant.P}>{description}</Text>
                    <TicketButton className='w-[90vw] h-[45px] lg:w-[284px] lg:h-[53px]' eventId={eventId}/>
                </div>
                {md && <img alt={poster === '' ? defaultPoster : poster} className='xl:w-[572px] xl:h-[326px]' src={poster === '' ? defaultPoster : poster} />
                }
            </div>
        </section>
    );
};

export default Information;