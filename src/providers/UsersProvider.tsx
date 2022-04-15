import React, { createContext, Dispatch, Reducer, useCallback, useReducer, useState } from 'react'
import usersService from '../api-client/userService'
import User from '../@types/user'
import userService from '../api-client/userService'
import { filterByFirstAndLastName } from '../utils/filteringUtils'
import { sortUsersByLastName } from '../utils/sortingUtils'

type Action = { type: 'checked'; id: number; checked: boolean } | { type: 'set'; users: User[] }
type UserReducer = { users: User[]; checkedMap: Map<number, boolean> }

interface IUsersContext {
  state: UserReducer
  dispatch: Dispatch<Action> | null
  setChecked: React.MouseEventHandler<HTMLDivElement>
  searchedValue: string
  setSearchedValue: React.Dispatch<React.SetStateAction<string>>
  handleSetSearchedValue: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const initialUserState: IUsersContext = {
  state: { users: [], checkedMap: new Map<number, boolean>() },
  dispatch: null,
  setChecked: () => undefined,
  searchedValue: '',
  setSearchedValue: () => undefined,
  handleSetSearchedValue: () => undefined
}

export const UsersContext = createContext<IUsersContext>(initialUserState)

const reducer: Reducer<UserReducer, Action> = (state, action) => {
  const getChecked = (id: number): boolean => {
    return state.checkedMap.get(id) ?? false
  }

  switch (action.type) {
    case 'checked': {
      state.checkedMap.set(action.id, !action.checked)
      console.log(state.users.filter((user) => getChecked(user.id)).map((user) => user.id))
      return { ...state, checkedMap: new Map<number, boolean>(state.checkedMap.entries()) }
    }
    case 'set': {
      return { ...state, users: action.users.sort(sortUsersByLastName) }
    }
  }
}

const UsersProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(reducer, initialUserState.state)
  const [searchedValue, setSearchedValue] = useState('')

  const getUsersQuery = usersService.useGetUsersQuery({
    onSuccess: ({ data }: Awaited<ReturnType<typeof userService.getUsers>>) => {
      dispatch({ type: 'set', users: data })
    }
  })

  const setChecked = useCallback<React.MouseEventHandler<HTMLDivElement>>((e) => {
    const id = Number(e.currentTarget?.getAttribute('data-id'))
    const checked = e.currentTarget?.getAttribute('data-checked') === 'true'
    dispatch({ type: 'checked', id, checked })
  }, [])

  const handleSetSearchedValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchedValue = e.target.value
    dispatch({
      type: 'set',
      users: [...filterByFirstAndLastName(getUsersQuery.data?.data ?? [], searchedValue)]
    })
    setSearchedValue(searchedValue)
  }

  return (
    <UsersContext.Provider
      value={{
        state,
        dispatch,
        setChecked,
        searchedValue,
        setSearchedValue,
        handleSetSearchedValue
      }}
    >
      {props.children}
    </UsersContext.Provider>
  )
}

export default UsersProvider
