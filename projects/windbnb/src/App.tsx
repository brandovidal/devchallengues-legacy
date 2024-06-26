import { useMemo, useRef, useState } from 'react'

import INITIAL_STAYS from './data/stays.json'

import './App.css'
const COUNTRY = 'Finland'

interface ToogleElement {
  element: React.RefObject<HTMLElement | HTMLDivElement>
  show: boolean
}

function toogleElement ({ element, show = true }: ToogleElement) {
  if (element.current == null) return

  element.current.classList.add('hidden')
  if (show) {
    element.current.classList.remove('hidden')
  }
}

function App () {
  // get data
  const country = COUNTRY
  const locations = useMemo(
    () => [...new Set(INITIAL_STAYS.map(stay => stay.city))],
    []
  )

  const filterRef = useRef<HTMLElement>(null)
  const locationRef = useRef<HTMLDivElement>(null)
  const guestRef = useRef<HTMLDivElement>(null)

  const [adults, setAdults] = useState(0)
  const [children, setChildren] = useState(0)

  const [location, setLocation] = useState('')
  const [guests, setGuests] = useState(0)
  const [stayList, setStayList] = useState(INITIAL_STAYS)

  function addAdultsHandle () {
    setAdults(adults + 1)
    setGuests(guests + 1)
  }
  function substractAdultsHandle () {
    if (adults === 0) return
    setAdults(adults - 1)
    setGuests(guests - 1)
  }

  function addChildrenHandle () {
    setChildren(children + 1)
    setGuests(guests + 1)
  }
  function substractChildrenHandle () {
    if (children === 0) return
    setChildren(children - 1)
    setGuests(guests - 1)
  }

  const showFilterClickHandle = () => {
    toogleElement({ element: filterRef, show: true })
  }
  const showLocationHandle = () => {
    toogleElement({ element: locationRef, show: true })
    toogleElement({ element: guestRef, show: false })
  }
  const showGuestHandle = () => {
    toogleElement({ element: guestRef, show: true })
    toogleElement({ element: locationRef, show: false })
  }

  const selectLocationHandle = (location: string) => () => {
    setLocation(location)
  }

  const searchClickHandle = () => {
    toogleElement({ element: filterRef, show: true })
  }
  const closeClickHandle = () => {
    toogleElement({ element: filterRef, show: false })
  }

  const searchFiltersClickHandle = () => {
    const filteredStayList = INITIAL_STAYS.filter(
      stay => stay.city === location && stay.maxGuests >= guests
    )
    console.log({ INITIAL_STAYS, filteredStayList, location, guests })

    const newStaysList =
      filteredStayList.length === 0 ? INITIAL_STAYS : filteredStayList
    setStayList(newStaysList)

    closeClickHandle()
  }

  return (
    <>
      <header className='header'>
        <h1>
          <img src='/logo.svg' alt='windbnb' />
        </h1>

        <aside>
          <section
            className='card search-content'
            onClick={showFilterClickHandle}
          >
            <div className='item'>
              <p className='location'>Helsinki, Finland</p>
            </div>
            <div className='item'>
              <p className='guest'>Add guests</p>
            </div>
            <div className='item'>
              <button
                className='btn-transparent'
                title='Search'
                onClick={searchClickHandle}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='icon-search'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  fill='none'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0' />
                  <path d='M21 21l-6 -6' />
                </svg>
              </button>
            </div>
          </section>
        </aside>

        <section ref={filterRef} className='filter-container hidden'>
          <div className='item heading-item'>
            <h3>Edit your search</h3>
            <button
              className='btn-transparent'
              title='Close'
              onClick={closeClickHandle}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='icon-close'
                width='44'
                height='44'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='#2c3e50'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M18 6l-12 12' />
                <path d='M6 6l12 12' />
              </svg>
            </button>
          </div>
          <div className='item filter-item'>
            <div className='card filter'>
              <div className='item' onClick={showLocationHandle}>
                <label>location</label>
                <p className='location'>
                  {location ? `${location}, ${country}` : 'Add Location'}
                </p>
              </div>
              <div className='item' onClick={showGuestHandle}>
                <label>guest</label>
                <p className='guest'>
                  {guests ? `${guests} guests` : 'Add guests'}
                </p>
              </div>
            </div>
          </div>
          <div className='item search-item'>
            <button
              className='btn-primary'
              title='Search'
              onClick={searchFiltersClickHandle}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='icon-searc primary'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                stroke='currentColor'
                fill='none'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                <path d='M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0' />
                <path d='M21 21l-6 -6' />
              </svg>
              <span>Search</span>
            </button>
          </div>
          <div ref={locationRef} className='item location-item'>
            <section className='location-container'>
              {locations.map((location, index) => (
                <div
                  className='item'
                  key={index}
                  onClick={selectLocationHandle(location)}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='icon-map'
                    width='44'
                    height='44'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='#2c3e50'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                    <path
                      d='M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z'
                      strokeWidth='0'
                      fill='currentColor'
                    />
                  </svg>
                  <p className='value'>
                    {location}, {country}
                  </p>
                </div>
              ))}
            </section>
          </div>
          <div ref={guestRef} className='item guest-item hidden'>
            <section className='guest-container'>
              <div className='item'>
                <label>Adults</label>
                <p>Ages 13 or above</p>
                <div className='counter-container'>
                  <button
                    className='btn-outline'
                    onClick={substractAdultsHandle}
                  >
                    -
                  </button>
                  <p className='counter'>{adults}</p>
                  <button className='btn-outline' onClick={addAdultsHandle}>
                    +
                  </button>
                </div>
              </div>
              <div className='item'>
                <label>Children</label>
                <p>Ages 2-12</p>
                <div className='counter-container'>
                  <button
                    className='btn-outline'
                    onClick={substractChildrenHandle}
                  >
                    -
                  </button>
                  <p className='counter'>{children}</p>
                  <button className='btn-outline' onClick={addChildrenHandle}>
                    +
                  </button>
                </div>
              </div>
            </section>
          </div>
        </section>
      </header>

      <main>
        <div className='heading'>
          <h2 className='title'>Stays in Finland</h2>
          <p className='stays'>{stayList.length}+ stays</p>
        </div>
        <section className='stay-container'>
          {stayList.map((stay, index) => (
            <div key={index} className='item'>
              <img src={stay.photo} alt={stay.title} className='image' />
              <article>
                <div className='tag'>
                  {stay.superHost && (
                    <label className='badge'>Super host</label>
                  )}
                  <p className='description'>
                    {stay.type}
                    {stay.beds && (
                      <span>{` . ${stay.beds} ${
                        stay.beds === 1 ? 'bed' : ' beds'
                      }`}
                      </span>
                    )}
                  </p>
                </div>
                <div className='rating'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='icon-star'
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='none'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                    <path
                      d='M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z'
                      strokeWidth='0'
                      fill='currentColor'
                    />
                  </svg>
                  <span>{stay.rating}</span>
                </div>
              </article>
              <h5 className='title'>{stay.title}</h5>
            </div>
          ))}
        </section>
      </main>

      <footer>
        <p>
          created by
          <a
            href='https://linktr.ee/brandovidal'
            target='_blank'
            rel='noreferrer'
          >
            @brandovidal
          </a>
          - devChallenges.io
        </p>
      </footer>
    </>
  )
}

export default App
