import { createSelector } from "reselect";

export const genres = state => state.genres.genres
export const genresCount = state => state.genres.genresCount
export const animes = state => state.animes.animes
export const animesLimit = state => state.animes.animesLimit

export const selectedGenres = createSelector(
    [genres, genresCount], (sGenres, sGenresCount) => {
        if(sGenres.length && sGenres.length >= sGenresCount){
            return sGenres
        } 
    }
)

export const selectedAnimes = createSelector(
    [animes, animesLimit], (sAnimes, sAnimesLimit) => {
        if(sAnimes.length && sAnimes.length >= sAnimesLimit){
            return sAnimes
        }
    }
)