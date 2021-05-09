import ReactMarkdown from "react-markdown";
import classes from "./modal.module.scss";
import Cover from "../Components/Cover/Cover";
import {connect} from "react-redux";
import {setModal} from "../redux/actionType";
import {useCallback} from "react";

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

const Description = ({data, title}) => {
    const description = data?.value || 'Нет описания'
    title = capitalize(title)
    return (
        <div className={classes.modal_description}>
            <h2>{title}</h2>
            <ReactMarkdown>{description}</ReactMarkdown>
        </div>
    )
}
function ModalWindow({active, closeModal, description, cover, title}) {
    const preventClick = useCallback(e => e.stopPropagation(), [])
    return (
        <div className={active ? `${classes.modal_overlay} ${classes.active}` : `${classes.modal_overlay}`} onClick={closeModal}>
            <div className={active ? `${classes.modal_content} ${active}` : `${classes.modal_content}`} onClick={preventClick}>
                <div className={classes.modal_info_book}>
                    <div className={classes.modal_header}>
                        <Cover id={cover} size={'L'}/>
                        <span onClick={closeModal} className={classes.modal_close} data-close="true">&times;</span>
                    </div>
                    <Description data={description} title={title}/>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = state => ({
    active: state.app.isModalActive,
    description: state.app.description,
    cover: state.app.cover,
    title: state.app.titleBook
})
const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch(setModal(false))
})
export default connect(mapStateToProps, mapDispatchToProps)(ModalWindow)