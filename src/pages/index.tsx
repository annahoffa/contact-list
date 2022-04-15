import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Container from '../components/Container'
import { UserList } from '../components/UserList'
import SearchBar from '../components/SearchBar'
import React, { useContext } from 'react'
import { UsersContext } from '../providers/UsersProvider'

const Home: NextPage = () => {
  const usersContext = useContext(UsersContext)

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='A simple list of contacts' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container>
        <SearchBar
          value={usersContext.searchedValue}
          handleChange={usersContext.handleSetSearchedValue}
        />
        <UserList />
      </Container>
    </div>
  )
}

export default Home
