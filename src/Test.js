import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Tab, Tabs } from '@material-ui/core'
import {
	Apps,
	Event,
	Equalizer,
	ShoppingBasket,
} from '@material-ui/icons'


function a11yProps(index) {
	return {
		id: `scrollable-force-tab-${index}`,
		'aria-controls': `scrollable-force-tabpanel-${index}`,
	}
}

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
	tabs: {
		display: 'flex',
		justifyContent: 'center',
	},
}))

const NavBarItem = {
	'/schedule': 0,
	'/reports': 1,
	'/utils': 2,
	'/sale-management': 3,
}

const Test = ({ location, history }) => {
	const classes = useStyles()
	const [value, setValue] = React.useState(NavBarItem[location.pathname])

	const handleChange = (newValue, event) => {
		setValue(newValue)
	}

	const navigateTo = pathname => {
		history.push(pathname)
		handleChange(NavBarItem[pathname])
	}

	return (
		<div className={classes.root}>
			<AppBar position='static' color='primary'>
				<Tabs
					value={value}
					onChange={handleChange}
					className={classes.tabs}
					variant='scrollable'
					scrollButtons='on'
					indicatorColor='secondary'
					textColor='inherit'
					aria-label='scrollable force tabs example'
				>
					<Tab
						label='...'
						icon={<Event />}
						{...a11yProps(0)}
						onClick={() => navigateTo('/schedule')}
					/>
					<Tab
						label='...'
						icon={<Equalizer />}
						{...a11yProps(1)}
						onClick={() => navigateTo('/reports')}
					/>
					<Tab
						label='...'
						icon={<Apps />}
						{...a11yProps(2)}
						onClick={() => navigateTo('/utils')}
					/>
					<Tab
						label='...'
						icon={<ShoppingBasket />}
						{...a11yProps(3)}
						onClick={() => navigateTo('/sale-management')}
					/>
				</Tabs>
			</AppBar>
		</div>
	)
}

export default withRouter(Test)