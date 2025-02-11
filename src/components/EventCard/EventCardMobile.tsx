import {useState, MouseEvent} from "react";
import VideoPlayer from "../VideoPlayer/VideoPlayer.tsx";
import {Event} from "../../types/event.ts";
import Text, {TextVariant} from "../Text.tsx";
import TicketButton from "../Buttons/TicketButton.tsx";
import Button, {ButtonVariant} from "../Buttons/Button.tsx";
import {Link} from "react-router-dom";
import Slider from "../PhotoGallery/Slider.tsx";
import MediaItemPreview from "../PhotoGallery/MediaItemPreview.tsx";
import {getDatesString} from "../../utils/getDatesString.ts";

interface ConcertCardProps {
    item: Event,
    index: number,
    to: string
}
const EventCardMobile = ({item, index, to}: ConcertCardProps) => {
    const dateString = getDatesString(item.concerts)
    const [indexPhoto, setIndexPhoto] = useState(0)
    const [isOpenSlider, setIsOpenSlider] = useState(false)

    const toggleSlider = (index:number) => {
        setIndexPhoto(index)
        setIsOpenSlider(!isOpenSlider)
    }

    const handleClick = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation()
    }

    return (
        <div className={`p-1 flex flex-col items-start text-start
        gap-1 justify-between`}>
            <div className={`flex flex-row ${index % 2 === 0 ? 'text-yellow' : 'text-red'}`}>
                <Text variant={TextVariant.H2}>{item.title}</Text>
            </div>
            <Text variant={TextVariant.H3}>{dateString}</Text>
            <div className={`flex flex-col gap-10 transition-all duration-300 ease-out overflow-hidden`}>
                <Text variant={TextVariant.H3}>{item.city}, {item.location}</Text>
                {(item.videos && item.videos.length > 0)
                    ? <VideoPlayer videos={item.videos}/>
                    : <img className='xl:w-1/4 xl:h-1/4 md:w-1/2 md:h-1/2 shadow-white' alt={item.poster} src={item.poster}/>
                }
                {(item.photos && item.photos.length > 0) &&
                    <>
                        <div className='flex flex-col items-center text-gray gap-2'>
                            <MediaItemPreview src={item.photos[0]} onClick={toggleSlider} index={indexPhoto}/>
                            <Text variant={TextVariant.CAPTION}>Нажмите на фото, чтоб открыть галерею</Text>
                        </div>
                        <Slider mediaItems={item.photos} currentIndex={indexPhoto} setCurrentIndex={setIndexPhoto}
                                isOpenSlider={isOpenSlider} setIsOpenSlider={setIsOpenSlider}/>
                    </>
                }
                <Text variant={TextVariant.P}>{item.descriptionShort}</Text>
                <div className='flex lg:flex-row flex-col items-center gap-5'>
                    {item.concerts.length > 1
                        ? <Link to={`/events/${to}`}><Button variant={ButtonVariant.white}>Купить билет</Button></Link>
                        : <TicketButton eventId={item.concerts[0].eventId}/>
                    }
                    <Link className='self-center' onClick={handleClick} to={`/events/${to}`}>
                        <Button variant={ButtonVariant.white}>Узнать больше</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EventCardMobile;