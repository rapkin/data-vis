import { connect } from 'react-redux'

export const dynamicForm = (Component) =>
    connect((state, props) => ({form: props.name}))(Component)
