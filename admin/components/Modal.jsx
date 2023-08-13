const { Fragment, useState, useEffect } = require("react");
const { Transition } = require("@headlessui/react");

const Modal = ({
    title = "",
    content = "",
    buttons = [],
    classes = "",
    onDiscard = "",
    onConfirm = "",
    nowOpen = false,
    children,
}) => {
    let [isOpen, setIsOpen] = useState(nowOpen);

    useEffect(() => {
        setIsOpen(isOpen);
        if (!isOpen) {
            document.documentElement.style.overflow = "auto";
        } else {
            document.documentElement.style.overflow = "hidden";
        }
    }, [isOpen]);

    const HandleChange = () => {
        setIsOpen(!isOpen);

    }
    return <>
        <div onClick={() => HandleChange()}>
            {children}
        </div>

        <Transition show={isOpen}>
            <Transition.Child
                as={Fragment}
                enter="transition-all duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-all duration-200"
                leaveTo="opacity-0"
                leaveFrom="opacity-100"
            >
                <div style={{ zIndex: '1' }} onClick={() => HandleChange()} className="w-full h-full left-0 top-0 bg-black/50 fixed" />
            </Transition.Child>
            <Transition.Child
                as={Fragment}
                enter="transition-all duration-200"
                enterFrom="opacity-0 scale-75"
                enterTo="opacity-100 scale-100"
                leave="transition-all duration-200"
                leaveTo="opacity-0 scale-75"
                leaveFrom="opacity-100 scale-100"
            >
                <div style={{ zIndex: '2' }} className="flex justify-center items-center h-full w-full fixed left-0 top-0">
                    <div className={`max-w-[28rem] w-full ${classes ? classes : 'p-4 bg-white rounded-lg'}`}>
                        <div className="w-full flex justify-between items-center mb-6">
                            <p className="font-medium text-lg">{title}</p>
                            <div onClick={() => HandleChange()} className="w-8 h-8 flex justify-center items-center rounded-lg transition-all duration-200 cursor-pointer hover:bg-zinc-500/20">
                                <svg width="24px" height="24px" viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                    <path className="clr-i-outline clr-i-outline-path-1" d="M19.41,18l8.29-8.29a1,1,0,0,0-1.41-1.41L18,16.59,9.71,8.29A1,1,0,0,0,8.29,9.71L16.59,18,8.29,26.29a1,1,0,1,0,1.41,1.41L18,19.41l8.29,8.29a1,1,0,0,0,1.41-1.41Z" />
                                    <rect x={0} y={0} width={36} height={36} fillOpacity={0} />
                                </svg>
                            </div>
                        </div>
                        <p className="text-md">{content}</p>
                        <div className="mt-6 flex justify-end items-center gap-2">
                            {buttons.map((button, index) => (
                                <button
                                    onClick={() => {
                                        if (button.role === "discard") {
                                            onDiscard();
                                        }
                                        if (button.role === "confirm") {
                                            onConfirm();
                                        }
                                        if (button.role === "custom") {
                                            button.onClick();
                                        }
                                        if (button.toClose) {
                                            setIsOpen(false);
                                        }
                                    }}
                                    key={index}
                                    className={button.classes}
                                >
                                    {button.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </Transition.Child>
        </Transition>
    </>
}

Modal.displayName = 'Modal';

export default Modal