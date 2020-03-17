// useEffect: HTTP requests

// http://localhost:3000/isolated/exercise/15

import React from 'react'
import fetchPokemon from '../fetch-pokemon'

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null), the error state (null), and the
  // loading state (false).
  const [pokemon, setPokemon] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  React.useEffect(() => {
    if(!pokemonName) return
    setLoading(true)
    setError(null)
    setPokemon(null)
    fetchPokemon(pokemonName).then(
      pokemon => {
        setLoading(false)
        setError(null)
        setPokemon(pokemon)
      },
      error => {
        setLoading(false)
        setError(error)
        setPokemon(null)
      }
    )
  }, [pokemonName])
  // 🐨 before calling `fetchPokemon`, make sure to update the loading state
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemon => { /* update all the state here */},
  //     error => {/* update all the state here */},
  //   )

  return (
    <div
      style={{
        height: 300,
        width: 300,
        overflow: 'scroll',
        backgroundColor: '#eee',
        borderRadius: 4,
        padding: 10,
      }}
    >
      { loading ? ("...") : error ? ("ERROR!") : pokemonName ? (<pre>{JSON.stringify(pokemon || "unknown", null, 2)}</pre>) : "submit a pokemon"}
    </div>
  )
}

function InvisibleButton(props) {
  return (
    <button
      type="button"
      style={{
        border: 'none',
        padding: 'inherit',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        cursor: 'pointer',
        fontWeight: 'inherit',
      }}
      {...props}
    />
  )
}

function Usage() {
  const [{submittedPokemon, pokemonName}, setState] = React.useReducer(
    (state, action) => ({...state, ...action}),
    {submittedPokemon: '', pokemonName: ''},
  )

  function handleChange(e) {
    setState({pokemonName: e.target.value})
  }

  function handleSubmit(e) {
    e.preventDefault()
    setState({submittedPokemon: pokemonName.toLowerCase()})
  }

  function handleSelect(pokemonName) {
    setState({pokemonName, submittedPokemon: pokemonName})
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <label htmlFor="pokemonName-input">Pokemon Name</label>
        <small>
          Try{' '}
          <InvisibleButton onClick={() => handleSelect('pikachu')}>
            "pikachu"
          </InvisibleButton>
          {', '}
          <InvisibleButton onClick={() => handleSelect('charizard')}>
            "charizard"
          </InvisibleButton>
          {', or '}
          <InvisibleButton onClick={() => handleSelect('mew')}>
            "mew"
          </InvisibleButton>
        </small>
        <div>
          <input
            id="pokemonName-input"
            name="pokemonName"
            value={pokemonName}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </div>
      </form>
      <hr />
      <div style={{display: 'flex'}}>
        <div style={{marginLeft: 10}} data-testid="pokemon-display">
          <PokemonInfo pokemonName={submittedPokemon} />
        </div>
      </div>
    </div>
  )
}

export default Usage

/* eslint no-unused-vars:0 */
