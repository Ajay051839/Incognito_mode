import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import {connect} from 'react-redux'
import { setMovies } from '../../actions/movie'
import axios from 'axios'
import Movies from './Movies'

const ChatWatchlist = ({setMovies}) => {

    const {id} = useParams();

    useEffect(() => {
        async function call() {
            try{
                const res = await axios.get(`/api/watchlist/chat/${id}`);
                console.log(res);
                setMovies(res.data);
            } catch(err){
                console.log(err.message);
            }
        } call();
    })

  return (
    <div>
        <Movies />
    </div>
  )
}

ChatWatchlist.propTypes = {}

export default connect(null, {setMovies})(ChatWatchlist)