import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'
const Header = (props) => {
  // const onClick = () => {
  //   console.log('Click!')
  // }

  const location = useLocation()
  return (
    <header className='header'>
        {/* <h1 style={{color: 'red', backgroundColor: 'black'}}>Hello {props.title}</h1> */}
        {/* <h1>{{title}}</h1> */}
        {/* <h1 style={headingStyle}>Hello {props.title}</h1> */}
        <h1 >{props.title}</h1>
        {location.pathname === '/' && (
        <Button
          color={props.showAdd ? 'red' : 'green'}
          text={props.showAdd ? 'Close' : 'Add'}
          onClick={props.onAdd}
        />
      )}
       {/* {location.pathname==='/' && <Button color={props.showAdd ? 'Red' : 'green'} text={props.showAdd ? 'Close' : 'ADD'} onClick={props.onAdd}/>} */}
        
    </header>
  )
}
Header.defaultProps = {
  title: 'Task Tracker',
}
// const headingStyle = {
//   color: 'orange',
//   backgroundColor: 'black',
// }
Header.propTypes = {
  title: PropTypes.string.isRequired,
}
export default Header