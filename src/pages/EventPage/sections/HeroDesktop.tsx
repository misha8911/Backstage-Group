import VideoPlayer from "../../../components/VideoPlayer/VideoPlayer.tsx";
import {Event} from '../../../types/event.ts'
import Text, {TextVariant} from "../../../components/Text.tsx";
import TicketButton from "../../../components/Buttons/TicketButton.tsx";
import {getDate} from "../../../utils/getDate.ts";
import CountdownTimer from "../components/CountdownTimer.tsx";
import videoPosterDesktop from '../../../assets/video_poster_desktop.png'
import {useMediaBreakpoint} from "../../../hooks/useMediaBreakpoint.ts";
import {getDuration} from "../../../utils/getDuration.ts";
import {memo, useMemo} from "react";

interface HeroProps {
    item: Event
}

const HeroDesktop = memo(({item}: HeroProps) => {
    const datetime = getDate(item.date)
    const title = useMemo(() => item.title.toUpperCase(), [item.title]);
    const posterSrc = item.poster || videoPosterDesktop;
    const hasVideo = item.video && item.video.length > 0;
    const xl = useMediaBreakpoint('xl')

    return (
        <section id='hero' className='flex flex-col h-full gap-[30px]'>
            <div className='h-[436px] relative'>
                <div className='h-11 w-11 bg-darkgray rounded-full absolute top-[15px] right-6 z-10 flex justify-center items-center text-center'>
                    <Text variant={TextVariant.P}>{item.age}+</Text>
                </div>
                <div className='w-full h-full flex items-center justify-center overflow-hidden'>
                    {!hasVideo
                        ? <img
                            className='h-full w-full object-cover object-top'
                            alt={posterSrc}
                            src={posterSrc}
                            loading="eager"
                            fetchPriority="high"  />
                        : <VideoPlayer buttonType='mute' key={item.video} video={item.video} className='w-full object-cover' />}
                </div>
            </div>

            <div className='flex w-full h-[286px] gap-[108px] items-end space-between'>
                <div className='flex flex-col h-full justify-between'>
                    <div className='flex flex-col gap-5'>
                        <Text className='leading-none' variant={TextVariant.H1}>{title}</Text>
                        <Text variant={TextVariant.P}>{item.descriptionShort}</Text>
                    </div>
                    <div className='flex gap-2.5 items-end'>
                        <TicketButton className='w-[284px] h-[53px]' eventId={item.eventId}/>
                        {xl &&
                            <div className='flex flex-col gap-4'>
                                <Text variant={TextVariant.P}>До концерта осталось:</Text>
                                <CountdownTimer dateString={item.date} />
                            </div>
                        }

                    </div>
                </div>

                <div className='flex w-[284px] h-full justify-between pt-5 flex-col'>
                    <div className='flex leading-none h-[52px] gap-[13px]'>
                        <p className='font-display font-medium text-[52px] lining-nums'>{datetime.day}</p>
                        <div className=' '>
                            <p className='font-display font-medium text-[28px] tracking-[0.07em]'>{datetime.time}</p>
                            <p className='font-display font-medium text-[24px] tracking-[0.07em]'>{datetime.monthStr}</p>
                        </div>

                    </div>
                    <div>
                        <Text variant={TextVariant.B}>г. {item.city}</Text>
                        <Text variant={TextVariant.P}>{item.location}</Text>
                    </div>
                    <div>
                        <Text variant={TextVariant.B}>{getDuration(item.duration)}</Text>
                        <Text variant={TextVariant.P}>Продолжительность концерта</Text>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default HeroDesktop;