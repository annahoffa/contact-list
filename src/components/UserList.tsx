import { css } from '@emotion/css'
import { FixedSizeList, ListChildComponentProps } from 'react-window'
import { useContext } from 'react'
import { Avatar, Box, Checkbox, Typography } from '@mui/material'
import { UsersContext } from '../providers/UsersProvider'
import { useMeasure } from 'react-use'

const RenderRow = ({ index, style }: ListChildComponentProps) => {
  const usersContext = useContext(UsersContext)
  const user = usersContext.state.users[index]
  if (!user) {
    return null
  }

  return (
    <div key={user.id} style={style}>
      <Box
        component='div'
        sx={{
          boxShadow: 0,
          borderRadius: 2
        }}
      >
        <div
          className={css`
            background-color: #cecece;
            padding: 10px;
            align-items: center;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
          `}
          onClick={usersContext.setChecked}
          data-id={String(user.id)}
          data-checked={String(usersContext.state.checkedMap.get(user.id) ?? false)}
        >
          <Avatar alt={`${user.first_name} ${user.last_name}`} src={user.avatar} />
          <Typography>
            {user.first_name} {user.last_name}
          </Typography>
          <Checkbox checked={usersContext.state.checkedMap.get(user.id) ?? false} disableRipple />
        </div>
      </Box>
    </div>
  )
}

export const UserList = () => {
  const usersContext = useContext(UsersContext)
  const [ref, { width }] = useMeasure<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={css`
        & > * {
          margin-top: 10px;
        }
      `}
    >
      <FixedSizeList
        height={500}
        width={width}
        itemSize={70}
        itemCount={usersContext.state.users.length}
        overscanCount={5}
      >
        {RenderRow}
      </FixedSizeList>
    </div>
  )
}
