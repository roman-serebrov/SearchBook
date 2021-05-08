import React, {useEffect, useState} from "react";
import classes from "../../styles/App.module.scss";
import {connect} from "react-redux";

const PAGE_MAX = 10
const PAGE_MAX_START_RANGE = PAGE_MAX -1


const generatePages = (start, max) => {
    if (!start) {
        start+=1
    }
    return  new Array(max > PAGE_MAX ? PAGE_MAX : max).fill(start).map((v, i) => v + i)
}


const Pagination = (props) => {
    const [start, setStart] = useState(1)
    const [currentPage, setCurrentPage] = useState(start)

    const updateStart = (value) => () =>  {
        setCurrentPage(value)

        if (props.pagesCount <= 10) {
            return;
        }

        if (value > props.pagesCount - PAGE_MAX_START_RANGE) {
            setStart(props.pagesCount - PAGE_MAX_START_RANGE)
        } else if(value === start) {
            setStart(value - 1)
        } else {
            setStart(value)
        }
    }


    useEffect(() => props.onPageChanged(currentPage), [currentPage])

    if(!props.isLoading || props.pagesCount === 0) {
        return null;
    }


    return (
        <div className={classes.pagination}>
            {start !== 1  && start !== 0 && (<button onClick={updateStart(1)}>{1}</button>)}
            {generatePages(start, props.pagesCount - start + 1).map((value, index) => {
                return (
                    <button key={value} onClick={updateStart(value)}>
                        {value === currentPage ? <strong>{value}</strong> : value}
                    </button>
                )
            })}
            {props.pagesCount > 10 && currentPage < props.pagesCount - 9 && (<button onClick={updateStart(props.pagesCount)}>{props.pagesCount}</button>)}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        pagesCount: state.app.pagesCount,
        isLoading: state.app.isLoading,
    }
}
export default connect(mapStateToProps)(Pagination)