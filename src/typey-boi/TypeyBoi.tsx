import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { TypeyBoi } from 'containers/TypeyBoi'
import { Provider } from 'react-redux'
import { store } from 'store/typey-boi'
import './styles.scss'

ReactDOM.render(
  <Provider store={store}>
    <TypeyBoi />
  </Provider>,
  document.getElementById('root')
)
