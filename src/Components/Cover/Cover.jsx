import React, { useState, useCallback, useMemo, useEffect } from "react";
import default_cover from "../../images/default-cover.png";
import Loader from "../Loader/loader";

const Cover = React.memo(({ id, className, size = 'M', width, height, alt = 'search_book' }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const handleOnLoad = useCallback(() => {
        setIsLoaded(true)
    }, []);
    const style = useMemo(() => !isLoaded ? {visibility: 'hidden'} : undefined, [isLoaded, id]);

    useEffect(() => {
        setIsLoaded(false)
    }, [id])

    return (
        <img
            {...{width, height, alt, className, style}}
            src={id ? `http://covers.openlibrary.org/b/id/${id}-${size}.jpg` : default_cover}
            onLoad={handleOnLoad}
        />
    );
});

export default Cover;