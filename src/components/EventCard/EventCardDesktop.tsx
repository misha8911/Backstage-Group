import Text, {TextVariant} from "../Text.tsx";
import Button, {ButtonVariant} from "../Buttons/Button.tsx";
import {Link} from "react-router-dom";
import TicketButton from "../Buttons/TicketButton.tsx";
import {useState} from "react";
import VideoPlayer from "../VideoPlayer/VideoPlayer.tsx";
import {Event} from "../../types/event.ts"
import MediaItemPreview from "../PhotoGallery/MediaItemPreview.tsx";
import Slider from "../PhotoGallery/Slider.tsx";
import {getDatesString} from "../../utils/getDatesString.ts";

interface ConcertCardProps {
    item: Event,
    index: number,
    to: string
}
const EventCardDesktop = ({item, index, to}: ConcertCardProps) => {
    const dateString = getDatesString(item.concerts)
    const [indexPhoto, setIndexPhoto] = useState(0)
    const [isOpenSlider, setIsOpenSlider] = useState(false)

    const toggleSlider = (index:number) => {
        setIndexPhoto(index)
        setIsOpenSlider(!isOpenSlider)
    }

    return (
        <div className='flex items-start text-start flex-row gap-5 xl:gap-16'>
            <img className='xl:w-2/5 xl:h-2/5 md:w-1/2 md:h-1/2 shadow-white/10 shadow-sm rounded'
                 alt={item.poster} src={item.poster}/>
            <div className='flex flex-col gap-10'>
                <div>
                    <div className={`${index % 2 === 0 ? 'text-yellow' : 'text-red'}`}>
                        <Text variant={TextVariant.H2}>{item.title}</Text>
                    </div>
                    <div>
                        <Text variant={TextVariant.H3}>{dateString}</Text>
                        <Text variant={TextVariant.H3}>{item.city}, {item.location}</Text>
                    </div>
                </div>
                <Text variant={TextVariant.P}>{item.descriptionShort}</Text>
                {(item.videos && item.videos.length > 0)
                    ? <div className='w-2/3'><VideoPlayer videos={item.videos}/></div>
                    : (item.photos && item.photos.length > 0) &&
                        <div className='flex gap-5'>
                            {item.photos.slice(0, 3).map((value, index) =>
                                <MediaItemPreview key={value} src={value} onClick={toggleSlider}
                                                  isLil={true} index={index}/>)
                            }
                            <Slider mediaItems={item.photos} currentIndex={indexPhoto} setCurrentIndex={setIndexPhoto}
                                    isOpenSlider={isOpenSlider} setIsOpenSlider={setIsOpenSlider}/>
                    </div>
                }
                <div className='flex lg:flex-row flex-col items-center gap-5'>
                    {item.concerts.length > 1
                        ? <Link to={`/events/${to}`}><Button variant={ButtonVariant.white}>Купить билет</Button></Link>
                        : <TicketButton eventId={item.concerts[0].eventId}/>
                    }
                    <Link className='self-center' to={`/events/${to}`}>
                        <Button variant={ButtonVariant.white}>Узнать больше</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EventCardDesktop;