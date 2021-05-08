import React, {useState} from "react";
import classes from "./modal.css";
import default_cover from "../images/default-cover.png";

function ModalWindow({active, setActive, description, cover}) {
    if (Object.keys(description).length === 0 && cover === '') {
        return null;
    }
    console.log(description, cover)
    return (
        <div className={active ? "modal_overlay active" : "modal_overlay"} onClick={() => setActive(false)}>
            <div className={active ? "modal_content active" : "modal_content"} onClick={e => e.stopPropagation()}>
                <div className={"modal_info_book"}>
                    <div className={"modal_header"}>
                        <img className={classes.img} src={cover ? `http://covers.openlibrary.org/b/id/${cover}-M.jpg` : default_cover} alt="search_book"/>
                        <h2>TITLE</h2>
                        <span onClick={() => setActive(false)} className="modal_close" data-close="true">&times;</span>
                    </div>
                    <div className={"modal_description"}>
                        <p>{description.value}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalWindow