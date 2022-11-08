import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import {connect} from 'react-redux'
import { setMovies } from '../../actions/movie';
import Movies from './Movies';

const GroupWatchlist = ({setMovies}) => {

    const {name} = useParams();

    useEffect(() => {
        async function call(){
        try{
            const res = await axios.get(`/api/watchlist/group/${name}`);
            console.log(res.data)
            setMovies(res.data.movies)
        } catch(err){
            console.log(err.message);
        }
    } call();
    }, [])
   return (
    <div>
        <Movies />
    </div>
  )
}

GroupWatchlist.propTypes = {}

export default connect(null, {setMovies})(GroupWatchlist)