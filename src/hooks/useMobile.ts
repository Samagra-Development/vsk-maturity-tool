import { useEffect, useState } from "react";

const useMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (window.innerWidth < 769)
            setIsMobile(true);
        else setIsMobile(false);
        const windowSizeHandler = () => {
            if (window.innerWidth < 769)
                setIsMobile(true);
            else
                setIsMobile(false)
        };
        window.addEventListener("resize", windowSizeHandler);

        return () => {
            window.removeEventListener("resize", windowSizeHandler);
        };
    }, []);

    return isMobile;
};

export default useMobile;