
interface BurgerButtonProps {
    isOpen: boolean
    toggleMenu?: () => void;
}

const BurgerButton = ({isOpen, toggleMenu }: BurgerButtonProps)  => {
    const SpanClassName = ' block w-7 h-[3px] bg-white transition-all duration-400 ease-out'

    return (
        <button
            id='menu-button'
            aria-expanded="false"
            aria-controls="menu-container-id"
            aria-label="Открыть меню"
            onClick={toggleMenu}
            className={`flex flex-col justify-center items-center lg:hidden ${!isOpen && 'gap-[5.5px]'}`}>
            <span className={`${SpanClassName} ${isOpen && 'rotate-45 translate-y-[3px]'}`}/>
            <span className={`${SpanClassName} ${isOpen && 'opacity-0'}`}/>
            <span className={`${SpanClassName} ${isOpen && '-rotate-45 -translate-y-[3px]'}`}/>
        </button>
    );
};

export default BurgerButton;